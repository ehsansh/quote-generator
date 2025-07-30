import { render, act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import "@testing-library/jest-dom";

// Helper function for mock fetch responses
const createMockResponse = <T,>(data: T) =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data),
    } as Response);

beforeEach(() => {
    global.fetch = jest.fn(() =>
        createMockResponse({
            id: 1,
            quote: "Test quote",
            author: "Test Author",
        })
    );
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe("App", () => {
    it("renders loading state initially", () => {
        render(<App />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it("renders a quote after loading", async () => {
        await act(async () => {
            render(<App />);
        });

        expect(screen.getByText(/test quote/i)).toBeInTheDocument();
        expect(screen.getByText(/test author/i)).toBeInTheDocument();
    });

    it("fetches a new quote when button is clicked", async () => {
        // Initial render
        await act(async () => {
            render(<App />);
        });
        await screen.findByText(/test quote/i);

        // Mock second response
        global.fetch = jest.fn(() =>
            createMockResponse({
                id: 2,
                quote: "Another quote",
                author: "Another Author",
            })
        );

        await act(async () => {
            await userEvent.click(
                screen.getByRole("button", { name: /get new quote/i })
            );
        });

        // Verify new quote appears
        expect(await screen.findByText(/another quote/i)).toBeInTheDocument();
        expect(screen.getByText(/another author/i)).toBeInTheDocument();
    });
});
