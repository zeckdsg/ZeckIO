
import React from 'react';

interface RightPanelProps {
    generatedImage: string | null;
    isLoading: boolean;
    analysis: string | null;
    onAnalyze: () => void;
    onTTS: () => void;
    onEdit: () => void;
    error: string | null;
}

export const RightPanel: React.FC<RightPanelProps> = ({
    generatedImage, isLoading, analysis, onAnalyze, onTTS, onEdit, error
}) => {
    const downloadImage = () => {
        if (!generatedImage) return;
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `ai-image-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="right-panel flex-grow bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center relative md:block hidden">
            {isLoading && (
                <div id="loadingContainer" className="loading-container text-center">
                    <div className="loading-spinner w-16 h-16 border-8 border-t-transparent border-indigo-500 rounded-full animate-spin mx-auto"></div>
                    <div className="loading-text mt-4 text-lg font-semibold text-gray-300">Gerando sua imagem...</div>
                </div>
            )}
            {!isLoading && error && (
                 <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">
                    <p className='font-bold text-lg'>Erro!</p>
                    <p>{error}</p>
                </div>
            )}
            {!isLoading && !generatedImage && !error && (
                <div id="resultPlaceholder" className="result-placeholder text-center text-gray-500">
                    <div className="result-placeholder-icon text-7xl">🎨</div>
                    <div className="mt-4 text-xl">Sua obra de arte aparecerá aqui</div>
                </div>
            )}
            {!isLoading && generatedImage && (
                <div id="imageContainer" className="image-container w-full h-full flex flex-col items-center space-y-4">
                    <div className="relative w-full aspect-square max-w-full rounded-lg overflow-hidden group">
                         <img id="generatedImage" src={generatedImage} alt="Generated Art" className="generated-image w-full h-full object-contain" />
                         <div className="image-actions absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="action-btn bg-black/60 hover:bg-indigo-600 text-white rounded-full p-3 text-xl leading-none" onClick={onEdit} title="Editar">✏️</button>
                            <button className="action-btn bg-black/60 hover:bg-indigo-600 text-white rounded-full p-3 text-xl leading-none" onClick={downloadImage} title="Download">💾</button>
                        </div>
                    </div>
                    <div className="w-full flex justify-center gap-2">
                        <button onClick={onAnalyze} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">🔍 Analisar Imagem</button>
                        <button onClick={onTTS} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">🔊 Ouvir Descrição</button>
                    </div>
                    {analysis && (
                        <div className="w-full bg-gray-900 p-4 rounded-lg text-gray-300 max-h-48 overflow-y-auto">
                            <h3 className="font-bold mb-2">Análise da Imagem:</h3>
                            <p>{analysis}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
