import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useState } from "react";

const SmokeComponent = () => {
  const [count, setCount] = useState(1);

  return (
    <button onClick={() => setCount((value) => value + 1)}>
      count:{count}
    </button>
  );
};

describe("render smoke", () => {
  it("renders a component that uses React hooks", () => {
    render(<SmokeComponent />);

    expect(screen.getByRole("button", { name: "count:1" })).toBeInTheDocument();
  });
});
