"use strict";
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@genkit-ai/core");
const firebase_1 = require("@genkit-ai/firebase");
const vertexai_1 = require("@genkit-ai/vertexai");
exports.default = (0, core_1.configureGenkit)({
    plugins: [
        (0, firebase_1.firebase)(),
        (0, vertexai_1.vertexAI)(),
    ],
    logSinks: ['firebase'],
    enableTracingAndMetrics: true,
});
//# sourceMappingURL=genkit.js.map