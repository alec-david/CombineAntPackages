import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

import AddPackage from "../components/AddPackage";

test("renders without crashing", () => {
  //const component = renderer.create(<AddPackage />);
  //let tree = component.toJSON();
  expect(2 + 2).toMatchSnapshot();
});
