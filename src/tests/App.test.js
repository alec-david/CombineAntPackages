import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import App from "../App";

describe("Component: App", () => {
  it("should match its empty snapshot", () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});
