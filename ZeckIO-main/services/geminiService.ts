
import { GoogleGenAI, Modality, Part } from "@google/genai";
import type { ImageFile, AspectRatio } from '../types';

const getApiKey = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API_KEY environment variable not set.");
    }
    return apiKey;
};

const imageFileToPart = (imageFile: ImageFile): Part => {
    return {
        inlineData: {
            data: imageFile.base64,
            mimeType: imageFile.mimeType,
        },
    };
};

export const generateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: aspectRatio,
        },
    });

    const base64ImageBytes = response.generatedImages[0]?.image?.imageBytes;
    if (!base64ImageBytes) {
        throw new Error("API did not return an image.");
    }
    return `data:image/png;base64,${base64ImageBytes}`;
};

export const editImage = async (prompt: string, image1: ImageFile, image2?: ImageFile): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const parts: Part[] = [
        imageFileToPart(image1),
        { text: prompt },
    ];

    if (image2) {
        parts.push(imageFileToPart(image2));
    }
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:image/png;base64,${base64ImageBytes}`;
        }
    }
    
    throw new Error("API did not return an edited image.");
};


export const analyzeImage = async (base64ImageDataUrl: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const [header, base64Data] = base64ImageDataUrl.split(',');
    const mimeType = header.match(/data:(.*);/)?.[1] || 'image/png';
    
    const imagePart = {
        inlineData: {
            mimeType,
            data: base64Data,
        },
    };

    const textPart = {
        text: "Analyze this image in detail. Describe the main subject, background, style, and any notable features. Respond in Portuguese."
    };
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
    });

    return response.text;
};

export const generateSpeech = async (text: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say with a neutral, clear tone: ${text}` }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Kore' }, // A versatile voice
                },
            },
        },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
        throw new Error("API did not return audio data.");
    }
    return base64Audio;
};
