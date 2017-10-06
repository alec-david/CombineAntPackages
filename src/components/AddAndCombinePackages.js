import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Clipboard from 'clipboard';
import Textarea from 'react-textarea-autosize';

import * as styles from '../utils/styles';
import { combineSelectedPackages } from '../utils/CombinePackagesLogic';

new Clipboard('.btn');

class AddPackage extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      packageXML: ''
    };
  }

  onDrop(files) {
    if (files.length > 0) {
      let combinePackageButton = this.combineButton;
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
    let blob = new Blob([data], { type: mime || 'application/octet-stream' });

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
    let combinedPackage = this.state.packageXML;

    if (!combinedPackage) {
      return (
        <section>
          <div className="dropzone">
            <Dropzone
              onDrop={this.onDrop.bind(this)}
              accept=".xml"
              style={styles.dropzoneStyle}>
              <p>
                Try dropping some files here, or click to select files to
                upload.
              </p>
            </Dropzone>
          </div>
          <div
            id="combineButton"
            ref={buttonDiv => {
              this.combineButton = buttonDiv;
            }}
            style={{ display: 'none' }}>
            <aside>
              <h2>Selected files</h2>
              <div>
                {this.state.files.map(f => (
                  <span key={f.name}>
                    {f.name} - {f.size} bytes
                    <br />
                    <br />
                  </span>
                ))}
              </div>
            </aside>
            <input
              type="button"
              value="Combine Packages"
              onClick={this.combinePackages.bind(this)}
              style={styles.buttonStyle}
            />
          </div>
        </section>
      );
    }
    return (
      <div>
        <button
          className="btn"
          data-clipboard-text={combinedPackage}
          style={styles.buttonStyle}>
          Copy package.xml to clipboard
        </button>
        <button
          onClick={() => this.fileDownload(combinedPackage, 'package.xml')}
          style={styles.buttonStyle}>
          Download Combined Package
        </button>
        <button
          onClick={() => this.setState({ packageXML: '', files: [] })}
          style={styles.buttonStyle}>
          Create New Combined Package
        </button>
        <br />
        <br />
        <br />
        <h3>Combined Package:</h3>
        <br />
        <br />
        <div style={styles.formatPackage}>
          <Textarea
            name="packageTextArea"
            value={combinedPackage}
            style={styles.textAreaStyle}
            spellcheck="false"
          />
        </div>
      </div>
    );
  }
}

export default AddPackage;
