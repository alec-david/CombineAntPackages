import React from "react";
import ReactDOM from "react-dom";

import { mount } from "enzyme";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import AddAndCombinePackages from "../components/AddAndCombinePackages";

describe("Creating the component does not fail", () => {
  const wrapper = shallow(<AddAndCombinePackages />);

  it("should match its empty snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Calling the components functions shallow render", () => {
  const wrapper = shallow(<AddAndCombinePackages />);

  wrapper.instance().onDrop([]);
  it("should not render button to combine files", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Calling components function", () => {
  const wrapper = mount(<AddAndCombinePackages />);

  wrapper.instance().onDrop([generateFile(1)]);
  wrapper.update();
  it("1 file added -> should render button to combine files", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  wrapper.instance().onDrop([generateFile(1), generateFile(2)]);
  it("2 files added -> should render button to combine files", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  wrapper.instance().onDrop([]);
  it("0 files added -> should not render button to combine files", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

function generateFile(num) {
  const fileObj = {
    lastModified: 1504619161306,
    lastModifiedDate: new Date(1504619161306),
    name: "package" + num + ".xml",
    preview: "asuh",
    size: 123456,
    type: "text/xml",
    webkitRelativePath: "",
    key: num
  };
  return fileObj;
}
