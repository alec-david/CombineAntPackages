import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import * as styles from '../utils/styles';

class DropArea extends Component {
  render() {
    return (
      <div className="dropzone">
        <Dropzone
          onDrop={this.props.onDrop}
          accept=".xml"
          style={styles.dropzoneStyle}>
          <p>
            Try dropping some files here, or click to select files to upload.
          </p>
        </Dropzone>
      </div>
    );
  }
}

export default DropArea;
