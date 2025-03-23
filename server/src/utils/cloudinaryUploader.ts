import cloudinary from '../config/cloudinaryConfig';
import type { Express } from 'express';
import { Buffer } from 'buffer';

export const uploadSingleFile = (
    file: Express.Multer.File,
    folderName: string = 'uploads',
    resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: folderName, resource_type: resourceType },
                (error, result) => {
                    if (error) return reject(new Error(error.message));
                    if (result?.secure_url) return resolve(result.secure_url);
                    reject(new Error('Upload failed: No URL returned'));
                }
            );

            const buffer = Buffer.isBuffer(file.buffer)
                ? file.buffer
                : Buffer.from(file.buffer);

            uploadStream.end(buffer);
        } catch (error) {
            reject(
                new Error(
                    `Unexpected error in uploadSingleFile: ${error.message}`
                )
            );
        }
    });
};

export const uploadMultipleFiles = async (
    files: Express.Multer.File[],
    folderName: string = 'uploads',
    resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<{ success: string[]; failed: string[] }> => {
    try {
        const uploadResults = await Promise.allSettled(
            files.map((file) =>
                uploadSingleFile(file, folderName, resourceType)
            )
        );

        const success = uploadResults
            .filter((result) => result.status === 'fulfilled')
            .map((result) => (result as PromiseFulfilledResult<string>).value);

        const failed = uploadResults
            .filter((result) => result.status === 'rejected')
            .map((result) => (result as PromiseRejectedResult).reason.message);

        return { success, failed };
    } catch (error) {
        throw new Error(
            `Unexpected error in uploadMultipleFiles: ${error.message}`
        );
    }
};
