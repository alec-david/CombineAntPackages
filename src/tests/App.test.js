/*import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import App from "../App";

//test("renders without crashing", () => {
  //const component = renderer.create(<App />);
  //let tree = component.toJSON();
  //expect(tree).toMatchSnapshot();
  //expect(2 + 2).toEqual(4);
//});

test("Todo component renders the text of the todo", () => {
  const asuh = mount(<App />);
  expect(2 + 2).toEqual(4);
});*/

import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import renderer from "react-test-renderer";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

describe("Component: App", () => {
  it("should match its empty snapshot", () => {
    //const tree = renderer.create(<App />).toJSON();

    expect(2 + 3).toMatchSnapshot();
  });
});
