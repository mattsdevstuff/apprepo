"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVideoFlow = exports.refinePromptFlow = void 0;
const flow_1 = require("@genkit-ai/flow");
const vertexai_1 = require("@genkit-ai/vertexai");
const zod_1 = require("zod");
const auth_1 = require("@genkit-ai/firebase/auth");
// This flow refines a simple idea into a detailed prompt.
exports.refinePromptFlow = (0, flow_1.defineFlow)({
    name: 'refinePromptFlow',
    inputSchema: zod_1.z.object({ idea: zod_1.z.string() }),
    outputSchema: zod_1.z.object({ refinedPrompt: zod_1.z.string() }),
    auth: (0, auth_1.firebaseAuth)((user) => {
        if (!user) {
            throw new Error('Authentication is required');
        }
    }),
}, async ({ idea }) => {
    const llm = vertexai_1.vertexAI.generativeModel('gemini-1.5-flash');
    const prompt = `Based on the following idea, generate a detailed, cinematic prompt for a vertical video. The prompt should be descriptive and evocative, suitable for a text-to-video AI model. Idea: "${idea}"`;
    const result = await (0, flow_1.run)('generate-prompt', async () => {
        return await llm.generate({
            prompt: prompt,
        });
    });
    const refinedPrompt = result.text();
    return { refinedPrompt };
});
// This flow simulates video generation.
exports.generateVideoFlow = (0, flow_1.defineFlow)({
    name: 'generateVideoFlow',
    inputSchema: zod_1.z.object({
        prompt: zod_1.z.string(),
        imageBase64: zod_1.z.string().optional(),
        aspectRatio: zod_1.z.string().optional(),
    }),
    outputSchema: zod_1.z.object({
        videoUrl: zod_1.z.string(),
        // You can add more output fields here, e.g., videoId, duration, etc.
    }),
    auth: (0, auth_1.firebaseAuth)((user) => {
        if (!user) {
            throw new Error('Authentication is required');
        }
    }),
}, async ({ prompt }) => {
    // In a real application, you would call a video generation model here.
    // For this example, we will simulate the process and return a sample video URL.
    console.log(`Simulating video generation for prompt: "${prompt}"`);
    await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate a 5-second delay
    const sampleVideoUrl = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4';
    return { videoUrl: sampleVideoUrl };
});
//# sourceMappingURL=flows.js.map