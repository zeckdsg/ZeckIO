import React, { useState } from 'react';
import type { Mode, CreateFunction, EditFunction, ImageFile, AspectRatio } from '../types';
import { fileToImageFile } from '../utils/file';

interface LeftPanelProps {
    mode: Mode;
    setMode: (mode: Mode) => void;
    prompt: string;
    setPrompt: (prompt: string) => void;
    createFunction: CreateFunction;
    setCreateFunction: (func: CreateFunction) => void;
    editFunction: EditFunction;
    setEditFunction: (func: EditFunction) => void;
    aspectRatio: AspectRatio;
    setAspectRatio: (ratio: AspectRatio) => void;
    imageFile1: ImageFile | null;
    setImageFile1: (file: ImageFile | null) => void;
    imageFile2: ImageFile | null;
    setImageFile2: (file: ImageFile | null) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

const FunctionCard: React.FC<{
    icon: string;
    name: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, name, isActive, onClick }) => (
    <div
        className={`function-card flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${isActive ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700 hover:bg-gray-600'}`}
        onClick={onClick}
    >
        <div className="text-2xl mb-1">{icon}</div>
        <div className="text-sm font-medium text-center">{name}</div>
    </div>
);

const UploadArea: React.FC<{
    id: string;
    label: string;
    imageFile: ImageFile | null;
    onUpload: (file: ImageFile) => void;
    isDual?: boolean;
}> = ({ id, label, imageFile, onUpload, isDual = false }) => {
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadProgress(0);
            try {
                const loadedImageFile = await fileToImageFile(file, (progress) => {
                    setUploadProgress(progress);
                });
                onUpload(loadedImageFile);
            } catch (error) {
                console.error("File upload failed:", error);
                // Optionally, display an error to the user
            } finally {
                setUploadProgress(null);
            }
        }
    };
    
    const containerClasses = isDual
        ? "upload-area-dual"
        : "upload-area";

    return (
        <div className={`relative ${containerClasses} flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-600 rounded-lg text-center cursor-pointer hover:border-indigo-500 transition-colors duration-200 bg-gray-800 overflow-hidden`}
             onClick={() => document.getElementById(id)?.click()}>
            <input type="file" id={id} accept="image/*" className="hidden" onChange={handleFileChange} />
            
            {imageFile && (
                <img src={imageFile.url} alt="Preview" id={`${id}Preview`} className="image-preview absolute inset-0 w-full h-full object-cover rounded-lg" />
            )}
            
            {!imageFile && uploadProgress === null && (
                 <>
                    <div className="text-3xl text-gray-500">📁</div>
                    <div className="font-semibold mt-2">{label}</div>
                    <div className="upload-text text-xs text-gray-400 mt-1">{isDual ? "Clique para selecionar" : "PNG, JPG, WebP (máx. 10MB)"}</div>
                </>
            )}

            {uploadProgress !== null && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800/90 rounded-lg z-10 p-4">
                    <div className="w-full bg-gray-600 rounded-full h-2.5">
                        <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-150" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <p className="text-sm font-semibold mt-2 text-white">{Math.round(uploadProgress)}%</p>
                </div>
            )}
        </div>
    );
};


export const LeftPanel: React.FC<LeftPanelProps> = ({
    mode, setMode, prompt, setPrompt, createFunction, setCreateFunction,
    editFunction, setEditFunction, aspectRatio, setAspectRatio,
    imageFile1, setImageFile1, imageFile2, setImageFile2,
    onGenerate, isLoading
}) => {
    
    const showTwoImages = mode === 'edit' && editFunction === 'compose';
    const showOneImage = mode === 'edit' && !showTwoImages;

    const backToEditFunctions = () => {
      // This is a conceptual navigation, in React we just change state
      // no actual back functionality needed as state drives the UI
    };

    return (
        <div className="left-panel bg-gray-800 rounded-xl p-6 flex flex-col space-y-6 w-full md:w-1/3 lg:w-1/4 h-full md:max-h-[calc(100vh-2rem)] overflow-y-auto">
            <header>
                <h1 className="panel-title text-2xl font-bold">🎨 AI Image Studio</h1>
                <p className="panel-subtitle text-gray-400">Gerador profissional de imagens</p>
            </header>

            <div className="prompt-section">
                <div className="section-title font-semibold mb-2 text-gray-300">💭 Descreva sua ideia</div>
                <textarea
                    id="prompt"
                    className="prompt-input w-full bg-gray-900 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow resize-none h-28"
                    placeholder="Descreva a imagem que você deseja criar..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
            </div>

            <div className="mode-toggle grid grid-cols-2 gap-2 bg-gray-900 p-1 rounded-md">
                <button
                    className={`mode-btn py-2 rounded-md transition-colors duration-200 ${mode === 'create' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700'}`}
                    data-mode="create"
                    onClick={() => setMode('create')}
                >
                    Criar
                </button>
                <button
                    className={`mode-btn py-2 rounded-md transition-colors duration-200 ${mode === 'edit' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700'}`}
                    data-mode="edit"
                    onClick={() => setMode('edit')}
                >
                    Editar
                </button>
            </div>

            {mode === 'create' && (
                <>
                    <div className="functions-section">
                        <div className="section-title font-semibold mb-2 text-gray-300">📐 Proporção</div>
                        <div className="grid grid-cols-3 gap-2 bg-gray-900 p-1 rounded-md">
                            {(['1:1', '16:9', '9:16', '4:3', '3:4'] as AspectRatio[]).map((ratio) => (
                                <button
                                    key={ratio}
                                    className={`mode-btn py-2 rounded-md transition-colors duration-200 text-sm ${aspectRatio === ratio ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700'}`}
                                    onClick={() => setAspectRatio(ratio)}
                                >
                                    {ratio}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div id="createFunctions" className="functions-section">
                        <div className="section-title font-semibold mb-2 text-gray-300">✨ Estilo</div>
                        <div className="functions-grid grid grid-cols-2 gap-3">
                            <FunctionCard icon="✨" name="Prompt" isActive={createFunction === 'free'} onClick={() => setCreateFunction('free')} />
                            <FunctionCard icon="🏷️" name="Adesivos" isActive={createFunction === 'sticker'} onClick={() => setCreateFunction('sticker')} />
                            <FunctionCard icon="📝" name="Logo" isActive={createFunction === 'text'} onClick={() => setCreateFunction('text')} />
                            <FunctionCard icon="💭" name="HQ" isActive={createFunction === 'comic'} onClick={() => setCreateFunction('comic')} />
                        </div>
                    </div>
                </>
            )}
            
            {mode === 'edit' && (
                 <div id="editFunctions" className="functions-section">
                    <div className="functions-grid grid grid-cols-2 gap-3">
                        <FunctionCard icon="➕" name="Adicionar" isActive={editFunction === 'add-remove'} onClick={() => setEditFunction('add-remove')} />
                        <FunctionCard icon="🎯" name="Retoque" isActive={editFunction === 'retouch'} onClick={() => setEditFunction('retouch')} />
                        <FunctionCard icon="🎨" name="Estilo" isActive={editFunction === 'style'} onClick={() => setEditFunction('style')} />
                        <FunctionCard icon="🖼️" name="Unir" isActive={editFunction === 'compose'} onClick={() => setEditFunction('compose')} />
                    </div>
                </div>
            )}

            <div className="dynamic-content flex-grow">
                {showTwoImages && (
                    <div id="twoImagesSection" className="functions-section space-y-4">
                        <div className="font-semibold text-center text-gray-300">📸 Duas Imagens Necessárias</div>
                        <div className="grid grid-cols-2 gap-3">
                            <UploadArea id="imageUpload1" label="Primeira Imagem" imageFile={imageFile1} onUpload={setImageFile1} isDual />
                            <UploadArea id="imageUpload2" label="Segunda Imagem" imageFile={imageFile2} onUpload={setImageFile2} isDual />
                        </div>
                         {/* The back button is not needed in a state-driven UI */}
                    </div>
                )}
                {showOneImage && (
                   <UploadArea id="imageUpload" label="Clique ou arraste uma imagem" imageFile={imageFile1} onUpload={setImageFile1} />
                )}
            </div>

            <button
                id="generateBtn"
                className="generate-btn w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200"
                onClick={onGenerate}
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="spinner w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                    <span className="btn-text">🚀 Gerar Imagem</span>
                )}
            </button>
        </div>
    );
};