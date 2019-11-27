import React from "react";
import { shallow } from "enzyme";

import Home from "./Home";

jest.mock("layouts/header/Header", () => "Header");

describe("home page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("render", () => {
    describe("snapshot", () => {
      it("default", () => {
        const wrapper = shallow(<Home />);
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
