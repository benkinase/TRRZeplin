import React from "react";
// Using the custom render function
import { render } from "./test-utils";
import { App } from "./App";
//import { RootState } from "./redux/Reducer";

describe("App Test Suite", () => {
  it("Renders the store connected app with initialState", () => {
    const { container } = render(<App />, {
      initialState: { contacts: { data: {}, loading: false, error: "" } },
    });
    expect(container).toBeInTheDocument();
  });
});
