import React from 'react';
import ReactDOM from 'react-dom';

import { mount } from 'enzyme';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AddAndCombinePackages from '../components/AddAndCombinePackages';

describe('Creating the component does not fail', () => {
  const wrapper = shallow(<AddAndCombinePackages />);

  it('should match its empty snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Calling components function', () => {
  const wrapperDropOneFile = mount(<AddAndCombinePackages />);
  wrapperDropOneFile.instance().onDrop([generateFile(1)]);
  wrapperDropOneFile.update();
  it('1 file added -> should render button to combine files', () => {
    expect(toJson(wrapperDropOneFile)).toMatchSnapshot();
  });

  const wrapperDropMultipleFiles = mount(<AddAndCombinePackages />);
  wrapperDropMultipleFiles
    .instance()
    .onDrop([generateFile(1), generateFile(2)]);
  it('2 files added -> should render button to combine files', () => {
    expect(toJson(wrapperDropMultipleFiles)).toMatchSnapshot();
  });

  const wrapperDropZeroFiles = mount(<AddAndCombinePackages />);
  wrapperDropZeroFiles.instance().onDrop([]);
  it('0 files added -> should not render button to combine files', () => {
    expect(toJson(wrapperDropZeroFiles)).toMatchSnapshot();
  });
});

describe('Manually setting files state', () => {
  const wrapperUnchanged = shallow(<AddAndCombinePackages />);
  wrapperUnchanged.setState({ files: [] });
  it('files unchanged', () => {
    expect(wrapperUnchanged).toMatchSnapshot();
  });

  const wrapperOneFile = shallow(<AddAndCombinePackages />);
  wrapperOneFile.setState({ files: [generateFile(1)] });
  it('Setting 1 file', () => {
    expect(wrapperOneFile).toMatchSnapshot();
  });

  const wrapperMultipleFiles = shallow(<AddAndCombinePackages />);
  wrapperMultipleFiles.setState({ files: [generateFile(1), generateFile(2)] });
  it('Setting multiple files', () => {
    expect(wrapperMultipleFiles).toMatchSnapshot();
  });
});

describe('Test setting packageXML state, should update the component view', () => {
  const wrapperUnchanged = shallow(<AddAndCombinePackages />);
  wrapperUnchanged.setState({ packageXML: '' });
  it('PackageXML Unchanged', () => {
    expect(wrapperUnchanged).toMatchSnapshot();
  });

  const wrapperSetPackageXML = shallow(<AddAndCombinePackages />);
  wrapperSetPackageXML.setState({ packageXML: 'test' });
  it('Set packageXML to test value', () => {
    expect(wrapperSetPackageXML).toMatchSnapshot();
  });
});

function generateFile(num) {
  const fileObj = {
    lastModified: 1504619161306,
    lastModifiedDate: new Date(1504619161306),
    name: 'package' + num + '.xml',
    preview: 'asuh',
    size: 123456,
    type: 'text/xml',
    webkitRelativePath: '',
    key: num
  };
  return fileObj;
}
