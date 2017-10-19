import React, { Component } from 'react';

import DropArea from './DropArea';
import AddedFiles from './AddedFiles';

class AddPackage extends Component {
  render() {
    return (
      <div>
        <DropArea onDrop={this.props.onDrop} />
        <div
          id="combineButton"
          ref={this.props.setRef}
          style={{ display: 'none' }}>
          <AddedFiles
            files={this.props.files}
            combinePackages={this.props.combinePackages}
          />
        </div>
      </div>
    );
  }
}

export default AddPackage;
