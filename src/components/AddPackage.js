import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import { combineSelectedPackages } from '../CombinePackagesLogic';

class AddPackage extends Component {

  constructor() {
    super()
    this.state = { files: [] }
  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  handleChange() {
    let files = this.state.files;
    let fileList;
    for (let i = 0; i <= files.length-1; i++) {
      //let reader = new FileReader();
      let file = files[i];
      console.log(file.name);
      fileList += file.name + '\n';
    }
    let fileSpan = document.getElementById('fileList');
    fileSpan.innerHTML = 'asuh';
  }

  combinePackages() {
    combineSelectedPackages(this.state.files);
  }

  render() {
    var dropzoneStyle = {
      width: 400+'px',
      height: 200+'px',
      borderWidth: 2+'px', 
      borderColor: '#666666', 
      borderStyle: 'dashed', 
      borderRadius: 5+'px'
    }

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
          <input type='button' value='Combine Packages' onClick={this.combinePackages.bind(this)}/>
        </div>
      </section>
    );
  }
}

export default AddPackage;