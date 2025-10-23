import type { ImageFile } from '../types';

export const fileToImageFile = (file: File, onProgress: (progress: number) => void): Promise<ImageFile> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onprogress = (event) => {
            if (event.lengthComputable) {
                const progress = (event.loaded / event.total) * 100;
                onProgress(progress);
            }
        };
        
        reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(',')[1];
            if (base64) {
                 resolve({
                    base64,
                    mimeType: file.type,
                    url: result,
                 });
            } else {
                reject(new Error("Failed to read file as base64."));
            }
        };
        
        reader.onerror = (error) => reject(error);
        
        reader.readAsDataURL(file);
    });
};