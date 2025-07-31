// frontend/jest.config.cjs
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    // --- ADD/MODIFY transform HERE ---
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                // You can add diagnostics ignoreCodes here if you want to suppress the TS1343 warning
                // diagnostics: {
                //   ignoreCodes: [1343]
                // },
                astTransformers: {
                    before: [
                        {
                            // Path can be just the module name if it's in node_modules,
                            // or the full path as suggested in the issue.
                            // 'ts-jest-mock-import-meta' is usually enough.
                            path: 'ts-jest-mock-import-meta',
                            options: {
                                // This is the mock object that import.meta will resolve to.
                                // We need to provide 'env' with 'VITE_BACKEND_URL'.
                                metaObjectReplacement: {
                                    env: {
                                        VITE_BACKEND_URL: '/api/quote' // This mock value will be used in tests
                                    }
                                }
                            }
                        }
                    ]
                },
                // Crucially, still point ts-jest to your tsconfig.app.json
                tsconfig: 'tsconfig.app.json',
                // isolatedModules: true // Recommended for performance
            }
        ]
    },
    // --- END transform ---
    // You will STILL need setupFilesAfterEnv for @testing-library/jest-dom and global.fetch mock
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};