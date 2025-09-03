import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

vi.mock("../Pages/ProductList", () => ({
  default: () => <div>Mock Product List</div>,
}));

vi.mock("../Pages/ProductDetail", () => ({
  default: () => <div>Mock Product Detail</div>,
}));

describe("App Routing", () => {
  it("renders ProductList on default route (/)", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Mock Product List")).toBeInTheDocument();
  });

  it("renders ProductDetail on /products/:id route", () => {
    render(
      <MemoryRouter initialEntries={["/products/123"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Mock Product Detail")).toBeInTheDocument();
  });
});
