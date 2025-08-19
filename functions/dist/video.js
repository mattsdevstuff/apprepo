"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoGenFlow = void 0;
const flow_1 = require("@genkit-ai/flow");
const genkitx_googleai_1 = require("genkitx-googleai");
const zod_1 = require("zod");
exports.videoGenFlow = (0, flow_1.defineFlow)({
    name: 'videoGenFlow',
    inputSchema: zod_1.z.string(),
    outputSchema: zod_1.z.string(),
}, async (prompt) => {
    const model = (0, genkitx_googleai_1.googleAI)('gemini-1.5-flash');
    const result = await model.generate({
        prompt: prompt,
    });
    return result.text();
});
//# sourceMappingURL=video.js.map