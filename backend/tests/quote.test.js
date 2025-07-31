// backend/tests/quote.test.js
const request = require('supertest');
const app = require('../server'); // Import your Express app instance

// Mock node-fetch to control external API responses during tests
// This prevents tests from failing if dummyjson.com is down or slow
jest.mock('node-fetch', () => jest.fn());
const mockFetch = require('node-fetch');

describe('Quote API', () => {
    // Reset mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test case 1: Successful quote fetch
    test('GET /api/quote should return a random quote successfully', async () => {
        // Configure the mock fetch to return a successful response
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () =>
                Promise.resolve({
                    id: 1,
                    quote: 'Test quote from mock',
                    author: 'Mock Author',
                }),
        });

        const response = await request(app).get('/api/quote');

        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('quote', 'Test quote from mock');
        expect(response.body).toHaveProperty('author', 'Mock Author');
        expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/quotes/random');
    });

    // Test case 2: External API (dummyjson) returns an error
    test('GET /api/quote should handle external API error', async () => {
        // Configure the mock fetch to simulate an external API error response
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            statusText: 'Bad Request',
        });

        const response = await request(app).get('/api/quote');

        expect(response.statusCode).toBe(400);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty(
            'error',
            'Failed to fetch quote from external API: Bad Request'
        );
        expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/quotes/random');
    });

    // Test case 3: Internal server error (e.g., network issue with fetch)
    test('GET /api/quote should handle internal server error', async () => {
        // Configure the mock fetch to throw an error (e.g., network issue)
        mockFetch.mockRejectedValueOnce(new Error('Network error'));

        const response = await request(app).get('/api/quote');

        expect(response.statusCode).toBe(500);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty(
            'error',
            'Internal Server Error while fetching quote.'
        );
        expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/quotes/random');
    });

    // Test case 4: Root endpoint
    test('GET / should return "Node.js Backend is running..."', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Node.js Backend is running and serving quotes!');
    });
});
