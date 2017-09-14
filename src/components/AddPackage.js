import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Clipboard from 'clipboard';

import { combineSelectedPackages } from '../CombinePackagesLogic';

new Clipboard('.btn');

class AddPackage extends Component {

  constructor() {
    super()
    this.state = { 
      files: [],
      packageXML: ''
    }
  }

  onDrop(files) {
    if (files.length > 0) {
      let combinePackageButton = document.getElementById('combineButton');
      combinePackageButton.style.display = 'inline';
    }
    this.setState({
      files
    });
  }

  combinePackages() {
    let combinePromise = combineSelectedPackages(this.state.files);
    combinePromise.then(result => {
      this.setState({
        packageXML: result
      });
    });
  }

  fileDownload(data, filename, mime) {
    let blob = new Blob([data], {type: mime || 'application/octet-stream'});
    
    // IE workaround
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, filename);
    } else {
      let blobURL = window.URL.createObjectURL(blob);
      let tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', filename);
      
      // Safari thinks _blank anchor are pop ups. We only want to set _blank
      // target if the browser does not support the HTML5 download attribute.
      if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_blank');
      }
      
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }
  }

  render() {
    var dropzoneStyle = {
      width: 400+'px',
      height: 200+'px',
      borderWidth: 2+'px', 
      borderColor: '#666666', 
      borderStyle: 'dashed', 
      borderRadius: 5+'px'
    };
    var formatPackage = {
      whiteSpace: 'pre-wrap',
      textAlign: 'left',
      margin: 'auto',
      width: 60+'%',
      backgroundColor: '#d3d3d3'
    };
    var buttonStyle = {
      backgroundColor: '#2F4F4F',
      borderRadius:5 + 'px',
      border: 1 + 'px solid #566963',
      display: 'inline-block',
      cursor: 'pointer',
      color: '#ffffff',
      fontSize: 15+'px',
      fontWeight: 'bold',
      height:50+'px',
      textDecoration: 'none',
      textShadow: 0+'px'+-1+'px'+0+'px #2b665e',
      margin: 10 + 'px'
    }

    let combinedPackage = this.state.packageXML;

    if (!combinedPackage) {
      return (
        <section>
          <div className="dropzone">
            <Dropzone onDrop={this.onDrop.bind(this)} accept=".xml" style={dropzoneStyle}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>
          <aside>
            <h2>Selected files</h2>
            <div>
              {
                this.state.files.map(f => <span key={f.name}>{f.name} - {f.size} bytes<br/><br/></span>)
              }
            </div>
          </aside>
          <div id='combineButton' style={{display:'none'}}>
            <input type="button" value="Combine Packages" onClick={this.combinePackages.bind(this)} style={buttonStyle}/>
          </div>
        </section>
      );
    }
    return (
      <div>
        <button className="btn" data-clipboard-text={combinedPackage} style={buttonStyle}>
          Copy package.xml to clipboard
        </button>
        <button onClick={() => this.fileDownload(combinedPackage, 'package.xml')} style={buttonStyle}>Download Combined Package</button>
        <button onClick={() => this.setState({packageXML:'',files:[]})} style={buttonStyle}>Create New Combined Package</button>
        <br/><br/><br/>
        <h3>Combined Package:</h3>
        <br/><br/>
        <div style={formatPackage}>
          <span>{combinedPackage}</span>
        </div>
      </div>
    );
  }
}

export default AddPackage;