
import React from 'react';

interface MobileModalProps {
    isOpen: boolean;
    onClose: () => void;
    generatedImage: string | null;
    onEdit: () => void;
    onNewImage: () => void;
}

export const MobileModal: React.FC<MobileModalProps> = ({ isOpen, onClose, generatedImage, onEdit, onNewImage }) => {
    if (!isOpen) return null;
    
    const downloadFromModal = () => {
        if (!generatedImage) return;
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `ai-image-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div id="mobileModal" className="mobile-modal fixed inset-0 bg-black/80 flex items-center justify-center z-50 md:hidden" onClick={onClose}>
            <div className="modal-content bg-gray-800 rounded-xl p-4 w-11/12 max-w-md flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
                {generatedImage ? (
                    <img id="modalImage" src={generatedImage} alt="Generated Art" className="modal-image w-full h-auto object-contain rounded-lg" />
                ) : (
                    <div className="text-center p-8">Carregando imagem...</div>
                )}
                <div className="modal-actions grid grid-cols-3 gap-2">
                    <button className="modal-btn edit bg-gray-700 hover:bg-gray-600 rounded-lg p-3 flex flex-col items-center" onClick={onEdit}>
                        <span className="text-2xl">✏️</span>
                        <span className="text-xs">Editar</span>
                    </button>
                    <button className="modal-btn download bg-gray-700 hover:bg-gray-600 rounded-lg p-3 flex flex-col items-center" onClick={downloadFromModal}>
                        <span className="text-2xl">💾</span>
                        <span className="text-xs">Salvar</span>
                    </button>
                     <button className="modal-btn new bg-indigo-600 hover:bg-indigo-700 rounded-lg p-3 flex flex-col items-center" onClick={onNewImage}>
                        <span className="text-2xl">✨</span>
                        <span className="text-xs">Nova</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
