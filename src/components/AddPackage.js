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
      textAlign: 'left'
    };

    let combinedPackage = this.state.packageXML;

    if (!combinedPackage) {
      return (
        <section>
          <div className="dropzone">
            <Dropzone onDrop={this.onDrop.bind(this)} style={dropzoneStyle}>
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
          <div>
            <input type="button" value="Combine Packages" onClick={this.combinePackages.bind(this)}/>
          </div>
        </section>
      );
    }
    return (
      <div>
        <h3>Combined Package:</h3>
        <button className="btn" data-clipboard-text={combinedPackage}>
          Copy package.xml to clipboard
        </button>
        <button onClick={() => this.fileDownload(combinedPackage, 'package.xml')}>Download Combined Package</button>
        <br/><br/>
        <div style={formatPackage}>
          <span>{combinedPackage}</span>
        </div>
      </div>
    );
  }
}

export default AddPackage;