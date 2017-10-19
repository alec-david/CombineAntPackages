import React, { Component } from 'react';
import { combineSelectedPackages } from '../utils/CombinePackagesLogic';

import AddPackages from './AddPackages';
import CombinedPackages from './CombinedPackages';

class PackageContainer extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      package: ''
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

  getAddedFiles(files) {
    return this.state.files.map(f => (
      <span key={f.name}>
        {f.name} - {f.size} bytes
        <br />
        <br />
      </span>
    ));
  }

  combinePackages() {
    let combinePromise = combineSelectedPackages(this.state.files);
    combinePromise.then(result => {
      this.setState({
        package: result
      });
    });
  }

  fileDownload() {
    const data = this.state.package;
    const filename = 'package.xml';
    let blob = new Blob([data], { type: 'application/octet-stream' });

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

  createNewPackage() {
    this.setState({
      package: '',
      files: []
    });
  }

  render() {
    const combinedPackage = this.state.package;
    const addedFiles = this.getAddedFiles(this.state.files);

    if (!combinedPackage) {
      return (
        <AddPackages
          files={[addedFiles]}
          onDrop={this.onDrop.bind(this)}
          combinePackages={this.combinePackages.bind(this)}
          setRef={buttonDiv => {
            this.combineButton = buttonDiv;
          }}
        />
      );
    }
    return (
      <CombinedPackages
        newPackage={this.createNewPackage.bind(this)}
        combinedPackage={combinedPackage}
        fileDownload={this.fileDownload.bind(this)}
      />
    );
  }
}

export default PackageContainer;
