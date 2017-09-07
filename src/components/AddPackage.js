import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class AddPackage extends Component {

  handleChange(e) {
    let files = e.target.files;
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

  constructor() {
    super()
    this.state = { files: [] }
  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Selected files</h2>
          <div>
            {
              this.state.files.map(f => <span key={f.name}>{f.name} - {f.size} bytes</span>)
            }
          </div>
        </aside>
      </section>
    );
  }
}

export default AddPackage;