//let fs = require('fs');
import fs from 'fs';
let xml2js = require('xml2js');

let packagesDirectory = __dirname + '/packages';

let map = new Map();

export function combineSelectedPackages(packages) {
  return iterateOverPackages(packages);
}

function readFileAndAddToMap(file){
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = ((e) => {
      testParseXML(e.target.result);
      resolve();
    });

    reader.onerror = ((error) =>{
      reject(error);
    });

    reader.readAsText(file);
  });
}

function iterateOverPackages(files) {
  //create an array to hold your promises
  var promises = [];
  files.forEach(file => {
    promises.push(readFileAndAddToMap(file));
  });

  //use reduce to create a chain in the order of the promise array
  promises.reduce((cur, next) => {
    return cur.then(next);
  }, Promise.resolve()).then(() => {
    //all files read and executed!
    filterOldFlowVersions();
    let packageXML = generatePackageXml();
    return packageXML;
  }).catch((error) => {
    //handle potential error
    console.error(error);
  });
}

function testRead(fileName) {
  let reader = new FileReader();
  reader.onload = ((e) => {
    testParseXML(e.target.result);
  });
  reader.readAsText(fileName);
}

function testParseXML(file) {
  let parser = new xml2js.Parser();
  parser.parseString(file, (err, result) => {
    if (err) {
      console.log('Error parsing xml file: ' + err);
      return;
    }
    iterateOverXMLObjects(result);
  });
}

function readXML(fileName) {
  let parser = new xml2js.Parser();
  let data = fs.readFileSync(fileName);
  parser.parseString(data, (err, result) => {
    if (err) {
      console.log('Error parsing xml file: ' + err);
      return;
    }
    iterateOverXMLObjects(result);
  });
}

function iterateOverXMLObjects(data) {
  let objArr = data.Package.types;
  objArr.forEach(type => {
    setMapValues(type);
  });
}

function setMapValues(type) {
  let name = type.name[0];
  let members = type.members;
  if (map.get(name)) {
    let existingMembers = addMemberToExistingType(name, members);
    map.set(name, existingMembers);
  } else {
    map.set(name,members);
  }
}

function addMemberToExistingType(name, members) {
  let existingMembers = map.get(name);
  members.forEach(member => {
    if (!(existingMembers.indexOf(member) > -1)) {
      existingMembers.push(member);
    }
  })
  return existingMembers;
}

function filterOldFlowVersions() {
  let flows = map.get('Flow');
  if (!flows || flows.length < 2) {
    return;
  }
  let flowMap = generateFilteredFlowMap(flows);
  let updatedFlows = generateFilteredFlowArray(flowMap);
  map.set('Flow', updatedFlows);
}

function generateFilteredFlowMap(flows) {
  let flowMap = new Map();
  flows.forEach(flow => {
    let currentFlow = flow.substr(0,flow.indexOf('-'));
    let versionNumber = parseInt(flow.substr(flow.indexOf('-')+1));
    if (!flowMap.has(currentFlow) || (flowMap.get(currentFlow) < versionNumber)) {
      flowMap.set(currentFlow, versionNumber);
    }
  });
  return flowMap;
}

function generateFilteredFlowArray(flowMap) {
  let updatedFlows = [];
  for (var [key, value] of flowMap) {
    updatedFlows.push(key + '-' + value);
  }
  return updatedFlows;
}

function generatePackageXml() {
  let packageXML = '<?xml version="1.0" encoding="UTF-8"?>\n<Package xmlns="http://soap.sforce.com/2006/04/metadata">\n';
  map.forEach((val,key) => {
    packageXML += '\t<types>\n';
    val.forEach(member => {
      packageXML += '\t\t<members>' + member + '</members>\n';
    });
    packageXML += '\t\t<name>' + key + '</name>\n';
    packageXML += '\t</types>\n';
  });
  packageXML += '\t<version>40.0</version>\n</Package>'
  return packageXML;
}