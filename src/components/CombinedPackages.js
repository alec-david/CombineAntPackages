import React, { Component } from 'react';
import Clipboard from 'clipboard';
import Textarea from 'react-textarea-autosize';
import * as styles from '../utils/styles';

new Clipboard('.btn');

class CombinedPackage extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.newPackage} style={styles.redButtonStyle}>
          Create New Combined Package
        </button>
        <br />
        <br />
        <br />
        <h3>Combined Package:</h3>
        <button
          className="btn"
          data-clipboard-text={this.props.combinedPackage}
          style={styles.blueButtonStyle}>
          Copy package.xml to clipboard
        </button>
        <button
          onClick={() => this.props.fileDownload()}
          style={styles.blueButtonStyle}>
          Download Combined Package
        </button>
        <br />
        <br />
        <div style={styles.formatPackage}>
          <Textarea
            name="packageTextArea"
            value={this.props.combinedPackage}
            style={styles.textAreaStyle}
            spellCheck="false"
          />
        </div>
      </div>
    );
  }
}

export default CombinedPackage;
