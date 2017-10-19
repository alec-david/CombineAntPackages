let xml2js = require('xml2js');

let map = new Map();

export function combineSelectedPackages(packages) {
  return new Promise((resolve, reject) => {
    let packageXML = iterateOverPackagesPromise(packages);
    packageXML
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
}

function iterateOverPackagesPromise(files) {
  return new Promise((resolve, reject) => {
    var promises = [];
    files.forEach(file => {
      if (file.size) {
        promises.push(readFileAndAddToMap(file));
      }
    });

    Promise.all(promises).then(() => {
      filterOldFlowVersions();
      let packageXML = generatePackageXmlPromise();
      packageXML
        .then(result => {
          resolve(packageXML);
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}

function readFileAndAddToMap(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = e => {
      parseXML(e.target.result);
      resolve();
    };

    reader.onerror = error => {
      reject(error);
    };

    reader.readAsText(file);
  });
}

function parseXML(file) {
  let parser = new xml2js.Parser();
  parser.parseString(file, (err, result) => {
    if (err) {
      console.log('Error parsing xml file: ' + err);
      return;
    }
    iterateOverXMLObjects(result);
  });
}

function iterateOverXMLObjects(data) {
  if (!data.Package || !data.Package.types) {
    return;
  }
  let objArr = data.Package.types;
  if (objArr) {
    objArr.forEach(type => {
      setMapValues(type);
    });
  }
}

function setMapValues(type) {
  let name = type.name[0];
  let members = type.members;
  if (map.get(name)) {
    let existingMembers = addMemberToExistingType(name, members);
    map.set(name, existingMembers);
  } else {
    map.set(name, members);
  }
}

function addMemberToExistingType(name, members) {
  let existingMembers = map.get(name);
  members.forEach(member => {
    if (!(existingMembers.indexOf(member) > -1)) {
      existingMembers.push(member);
    }
  });
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
    let currentFlow = flow.substr(0, flow.indexOf('-'));
    let versionNumber = parseInt(flow.substr(flow.indexOf('-') + 1), 10);
    if (!flowMap.has(currentFlow) || flowMap.get(currentFlow) < versionNumber) {
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

function generatePackageXmlPromise() {
  return new Promise((resolve, reject) => {
    let packageXML =
      '<?xml version="1.0" encoding="UTF-8"?>\n<Package xmlns="http://soap.sforce.com/2006/04/metadata">\n';
    map.forEach((val, key) => {
      packageXML += '\t<types>\n';
      val.forEach(member => {
        packageXML += '\t\t<members>' + member + '</members>\n';
      });
      packageXML += '\t\t<name>' + key + '</name>\n';
      packageXML += '\t</types>\n';
    });
    packageXML += '\t<version>40.0</version>\n</Package>';
    resolve(packageXML);
  });
}
