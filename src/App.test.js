// import { render, screen } from "@testing-library/react";
// import App from "./App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
const add = (a, b) => a + b;
test("Should add two numbers", () => {
  const result = add(3, 4);
  expect(result).toBe(7);
});
