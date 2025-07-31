// frontend/src/setupTests.ts
import '@testing-library/jest-dom'; // Keep this line for the runtime application of matchers

// Declare the global 'fetch' for TypeScript
declare global {
  var fetch: jest.Mock;
}

// Mock import.meta.env for Jest
Object.defineProperty(global.import.meta, 'env', {
  value: {
    VITE_BACKEND_URL: '/api/quote',
  },
  writable: true,
});