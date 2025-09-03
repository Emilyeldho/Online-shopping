import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProductList from "../Pages/ProductList";

vi.mock("../Hooks/useFetch", () => ({
  default: vi.fn(),
}));
vi.mock("../Hooks/useDebounce", () => ({
  default: vi.fn(),
}));

import useFetch from "../Hooks/useFetch";
import useDebounce from "../Hooks/useDebounce";

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("ProductList Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useDebounce.mockImplementation((val) => val);
  });

  it("renders loading state", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    renderWithRouter(<ProductList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error state", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: { message: "Network Error" },
    });

    renderWithRouter(<ProductList />);
    expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
  });

  it("renders empty state", () => {
    useFetch.mockReturnValue({
      data: { products: [], total: 0 },
      loading: false,
      error: null,
    });

    renderWithRouter(<ProductList />);
    expect(screen.getByText(/No products found/i)).toBeInTheDocument();
  });

  it("renders products in grid view", async () => {
    useFetch.mockReturnValue({
      data: {
        products: [
          {
            id: 1,
            title: "Test Product",
            thumbnail: "test.jpg",
            brand: "Test Brand",
            category: "Category",
            description: "A nice product",
            price: 100,
            rating: 4.5,
          },
        ],
        total: 1,
      },
      loading: false,
      error: null,
    });

    renderWithRouter(<ProductList />);
    expect(await screen.findByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(/Test Brand • Category/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100/)).toBeInTheDocument();
  });

  it("switches to list view", async () => {
    useFetch.mockReturnValue({
      data: {
        products: [
          {
            id: 2,
            title: "List Product",
            thumbnail: "list.jpg",
            brand: "BrandX",
            category: "CategoryY",
            description: "List description",
            price: 200,
            rating: 4.2,
          },
        ],
        total: 1,
      },
      loading: false,
      error: null,
    });

    renderWithRouter(<ProductList />);

    // Switch to list view
    const listViewBtn = screen.getByTitle("List View");
    fireEvent.click(listViewBtn);

    expect(await screen.findByText("List Product")).toBeInTheDocument();
    expect(screen.getByText(/BrandX • CategoryY/)).toBeInTheDocument();
  });

  it("search updates state", async () => {
    useFetch.mockReturnValue({
      data: {
        products: [
          {
            id: 3,
            title: "Phone",
            thumbnail: "phone.jpg",
            brand: "BrandZ",
            category: "Mobiles",
            description: "Cool phone",
            price: 300,
            rating: 4.8,
          },
        ],
        total: 1,
      },
      loading: false,
      error: null,
    });

    renderWithRouter(<ProductList />);
    const input = screen.getByPlaceholderText(/Search products/i);
    fireEvent.change(input, { target: { value: "phone" } });
    await waitFor(() => expect(input).toHaveValue("phone"));
  });
});
