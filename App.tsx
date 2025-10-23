
import React, { useState, useCallback } from 'react';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { MobileModal } from './components/MobileModal';
import { generateImage, editImage, analyzeImage, generateSpeech } from './services/geminiService';
import type { Mode, CreateFunction, EditFunction, ImageFile, AspectRatio } from './types';
import { playAudio } from './utils/audio';

const App: React.FC = () => {
    const [mode, setMode] = useState<Mode>('create');
    const [prompt, setPrompt] = useState<string>('');
    const [createFunction, setCreateFunction] = useState<CreateFunction>('free');
    const [editFunction, setEditFunction] = useState<EditFunction>('add-remove');
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
    
    const [imageFile1, setImageFile1] = useState<ImageFile | null>(null);
    const [imageFile2, setImageFile2] = useState<ImageFile | null>(null);

    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(false);

    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);
        setAnalysis(null);

        try {
            let result: string | null = null;
            if (mode === 'create') {
                let finalPrompt = prompt;
                if(createFunction === 'sticker') finalPrompt = `sticker, ${prompt}, vector art, white background`;
                if(createFunction === 'text') finalPrompt = `typographic logo for "${prompt}", text only, vector, white background`;
                if(createFunction === 'comic') finalPrompt = `comic book style art, ${prompt}`;

                result = await generateImage(finalPrompt, aspectRatio);
            } else { // edit mode
                const baseImage = imageFile1;
                if (!baseImage) {
                    throw new Error("Por favor, carregue uma imagem para editar.");
                }
                
                let finalPrompt = prompt;

                if (editFunction === 'compose') {
                    if(!imageFile2) throw new Error("Por favor, carregue a segunda imagem para unir.");
                    // The API doesn't support composing two images directly, so we describe the action
                    finalPrompt = `Combine the style and elements of the second image with the first image. The main subject is from the first image. The prompt is: ${prompt}`;
                     result = await editImage(finalPrompt, baseImage, imageFile2);
                } else {
                     if (editFunction === 'add-remove') finalPrompt = `add or remove elements based on this instruction: ${prompt}`;
                     if (editFunction === 'retouch') finalPrompt = `retouch the image following this instruction: ${prompt}`;
                     if (editFunction === 'style') finalPrompt = `apply a new style to the image based on this instruction: ${prompt}`;
                     result = await editImage(finalPrompt, baseImage);
                }

            }
            setGeneratedImage(result);
            if (window.innerWidth < 768) {
                setIsMobileModalOpen(true);
            }
        } catch (e: any) {
            setError(e.message || "Ocorreu um erro ao gerar a imagem.");
        } finally {
            setIsLoading(false);
        }
    }, [mode, prompt, createFunction, editFunction, imageFile1, imageFile2, aspectRatio]);

    const handleAnalyze = useCallback(async () => {
        if (!generatedImage) return;
        setIsLoading(true);
        setError(null);
        setAnalysis(null);
        try {
            const result = await analyzeImage(generatedImage);
            setAnalysis(result);
        } catch(e: any) {
            setError(e.message || "Ocorreu um erro ao analisar a imagem.");
        } finally {
            setIsLoading(false);
        }
    }, [generatedImage]);

    const handleTTS = useCallback(async () => {
        const textToSpeak = analysis || prompt;
        if (!textToSpeak) return;
        setIsLoading(true);
        setError(null);
        try {
            const audioData = await generateSpeech(textToSpeak);
            playAudio(audioData);
        } catch(e: any) {
            setError(e.message || "Ocorreu um erro ao gerar o áudio.");
        } finally {
            setIsLoading(false);
        }
    }, [analysis, prompt]);

    const editCurrentImage = () => {
        if (!generatedImage) return;
        setMode('edit');
        setEditFunction('add-remove');
        setImageFile1({
            base64: generatedImage.split(',')[1],
            mimeType: generatedImage.match(/data:(.*);/)?.[1] || 'image/png',
            url: generatedImage,
        });
        setImageFile2(null);
        setGeneratedImage(null);
        setAnalysis(null);
        if (window.innerWidth < 768 && isMobileModalOpen) {
            setIsMobileModalOpen(false);
        }
    };
    
    return (
        <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4 min-h-screen font-sans">
            <LeftPanel
                mode={mode}
                setMode={setMode}
                prompt={prompt}
                setPrompt={setPrompt}
                createFunction={createFunction}
                setCreateFunction={setCreateFunction}
                editFunction={editFunction}
                setEditFunction={setEditFunction}
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
                imageFile1={imageFile1}
                setImageFile1={setImageFile1}
                imageFile2={imageFile2}
                setImageFile2={setImageFile2}
                onGenerate={handleGenerate}
                isLoading={isLoading}
            />
            <RightPanel
                generatedImage={generatedImage}
                isLoading={isLoading}
                analysis={analysis}
                onAnalyze={handleAnalyze}
                onTTS={handleTTS}
                onEdit={editCurrentImage}
                error={error}
            />
            <MobileModal
                isOpen={isMobileModalOpen}
                onClose={() => setIsMobileModalOpen(false)}
                generatedImage={generatedImage}
                onEdit={() => {
                    editCurrentImage();
                    setIsMobileModalOpen(false);
                }}
                onNewImage={() => {
                    setGeneratedImage(null);
                    setIsMobileModalOpen(false);
                }}
            />
        </div>
    );
};

export default App;
