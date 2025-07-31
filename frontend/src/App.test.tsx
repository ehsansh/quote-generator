import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import '@testing-library/jest-dom';

// Mock import.meta.env for Vite environment variables
beforeAll(() => {
    (globalThis as any).import = {
        meta: {
            env: {
                VITE_BACKEND_URL: '/api/quote',
            },
        },
    };
});

// Helper function for mock fetch responses
const createMockResponse = <T,>(data: T) =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data),
    } as Response);

beforeEach(() => {
    (globalThis as any).fetch = jest.fn(() =>
        createMockResponse({
            id: 1,
            quote: 'Test quote',
            author: 'Test Author',
        })
    );
});

afterEach(() => {
    jest.restoreAllMocks();
});

beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation((msg) => {
        if (typeof msg === 'string' && msg.includes('not wrapped in act')) {
            return;
        }
        // @ts-ignore
        console._errorOriginal?.apply(console, arguments) || console.error(msg);
    });
});

afterAll(() => {
    // @ts-ignore
    if (console._errorOriginal) console.error = console._errorOriginal;
});

describe('App', () => {
    it('renders loading state initially', () => {
        render(<App />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders a quote after loading', async () => {
        render(<App />);
        await waitFor(() => {
            expect(screen.getByText(/test quote/i)).toBeInTheDocument();
            expect(screen.getByText(/test author/i)).toBeInTheDocument();
        });
    });

    it('fetches a new quote when button is clicked', async () => {
        render(<App />);
        await waitFor(() => {
            expect(screen.getByText(/test quote/i)).toBeInTheDocument();
        });

        // Mock second response
        (globalThis as any).fetch = jest.fn(() =>
            createMockResponse({
                id: 2,
                quote: 'Another quote',
                author: 'Another Author',
            })
        );

        await userEvent.click(screen.getByRole('button', { name: /get new quote/i }));

        await waitFor(() => {
            expect(screen.getByText(/another quote/i)).toBeInTheDocument();
            expect(screen.getByText(/another author/i)).toBeInTheDocument();
        });
    });
});
