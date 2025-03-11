import { getContainerClient } from "@/services/storage";
import { Readable } from 'stream';

// Helper function to convert file buffer to stream
const bufferToStream = (buffer: Buffer) => {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
};

export const uploadImage = async (file: File) => {
  try {
    const bucket = await getContainerClient();
    
    // Check if file exists and delete it
    const files = await bucket.find({ filename: file.name }).toArray();
    if (files.length > 0) {
      await bucket.delete(files[0]._id);
    }
    
    // Convert file to buffer and then to stream
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = bufferToStream(buffer);
    
    // Upload file
    const uploadStream = bucket.openUploadStream(file.name);
    
    return new Promise<string>((resolve, reject) => {
      stream.pipe(uploadStream)
        .on('error', reject)
        .on('finish', () => {
          // Return a URL-like string that can be used to access the file
          const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
          resolve(`${baseUrl}/api/images/${file.name}`);
        });
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const deleteImage = async (fileName: string) => {
  try {
    const bucket = await getContainerClient();
    
    // Find file by filename
    const files = await bucket.find({ filename: fileName }).toArray();
    if (files.length > 0) {
      await bucket.delete(files[0]._id);
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};