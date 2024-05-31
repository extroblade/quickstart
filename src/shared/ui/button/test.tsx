import { render, screen } from "@testing-library/react";

import { Button } from "./component";

const children = "test";

describe("Button", () => {
  it("should render", () => {
    render(<Button>{children}</Button>);

    const component = screen.getByRole("button");

    expect(component).toBeInTheDocument();
  });
});
