import React, { Component } from 'react';
import * as styles from '../utils/styles';

class AddedFiles extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>Selected files</h2>
          <div>{this.props.files}</div>
        </div>
        <input
          type="button"
          value="Combine Packages"
          onClick={this.props.combinePackages}
          style={styles.blueButtonStyle}
        />
      </div>
    );
  }
}

export default AddedFiles;
