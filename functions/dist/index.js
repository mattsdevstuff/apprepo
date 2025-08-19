"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVideo = exports.refinePrompt = void 0;
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
require("./genkit"); // Import and initialize Genkit configuration
const functions_1 = require("@genkit-ai/firebase/functions");
const flows_1 = require("./flows");
// Expose the Genkit flows as HTTPS endpoints
exports.refinePrompt = (0, functions_1.onFlow)(flows_1.refinePromptFlow, {
// Add any specific options here, e.g., memory, cors, etc.
});
exports.generateVideo = (0, functions_1.onFlow)(flows_1.generateVideoFlow, {
// Add any specific options here
});
//# sourceMappingURL=index.js.map