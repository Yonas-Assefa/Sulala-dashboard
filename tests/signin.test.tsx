import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

const Page = () => {
  return <h1>Home</h1>;
};

test("Page", () => {
  render(<Page />);
  expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeDefined();
});
