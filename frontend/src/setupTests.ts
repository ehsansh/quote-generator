// frontend/src/setupTests.ts

import '@testing-library/jest-dom'; // Keep this for runtime application of matchers

// Augment the Window interface to allow global.fetch to be a Jest mock
declare global {
    interface Window {
        fetch: jest.Mock; // Tell TypeScript that window.fetch (and thus global.fetch in JSDOM) can be a Jest mock
    }
}
