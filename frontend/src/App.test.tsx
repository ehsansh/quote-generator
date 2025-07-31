import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import '@testing-library/jest-dom';

// Helper function for mock fetch responses
const createMockResponse = <T,>(data: T) =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data),
    } as Response);

// Define global.fetch as a mock function before all tests.
// This is necessary because jest.spyOn requires the property to exist.
beforeAll(() => {
    globalThis.fetch = jest.fn();
});

beforeEach(() => {
    // It's often better to spy on fetch rather than completely replace it.
    // This allows you to restore the original implementation later.
    // We use `globalThis` here, which works in a JSDOM environment, instead of `global`.
    jest.spyOn(globalThis, 'fetch').mockImplementation(() =>
        createMockResponse({
            id: 1,
            quote: 'Test quote',
            author: 'Test Author',
        })
    );
});

afterEach(() => {
    // Restore all mocks created with jest.spyOn
    jest.restoreAllMocks();
});

describe('App', () => {
    it('renders loading state initially', () => {
        // The render function itself is already wrapped in act() for the initial render.
        // There is no need to wrap it explicitly.
        render(<App />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders a quote after loading', async () => {
        // We no longer need an explicit `act` around `render`.
        // Instead, we use a `findBy*` query, which automatically waits for
        // the asynchronous update (the fetch call) to complete and the element
        // to appear in the DOM. This implicitly handles the `act` lifecycle.
        render(<App />);

        // The `findBy*` queries return a promise, so we must `await` them.
        // This is the key change to resolve the initial `act` warnings.
        const quoteElement = await screen.findByText(/test quote/i);
        expect(quoteElement).toBeInTheDocument();
        expect(screen.getByText(/test author/i)).toBeInTheDocument();
    });

    it('fetches a new quote when button is clicked', async () => {
        // 1. Initial render and wait for the first quote to appear.
        render(<App />);
        const initialQuote = await screen.findByText(/test quote/i);
        expect(initialQuote).toBeInTheDocument();

        // 2. Mock the second response for the next fetch call.
        // We use `globalThis` here as well.
        jest.spyOn(globalThis, 'fetch').mockImplementationOnce(() =>
            createMockResponse({
                id: 2,
                quote: 'Another quote',
                author: 'Another Author',
            })
        );

        // 3. Simulate the user clicking the button.
        // userEvent.click returns a promise, so we await it to ensure the event
        // has completed. This is also implicitly wrapped in `act()`.
        const button = screen.getByRole('button', { name: /get new quote/i });
        await userEvent.click(button);

        // 4. Wait for the UI to update with the new quote.
        // `findBy*` is again used here to handle the asynchronous state update.
        const newQuoteElement = await screen.findByText(/another quote/i);

        // 5. Verify the new quote and author appear.
        expect(newQuoteElement).toBeInTheDocument();
        expect(screen.getByText(/another author/i)).toBeInTheDocument();
    });
});
