export {};

export function blobToBase64(blob: Blob): Promise<string> {
 return new Promise((resolve, reject) => {
 const reader = new FileReader();
 reader.onload = () => {
 const url = reader.result as string;
 // Return only the base64 part
 resolve(url.split(',')[1]);
 };
 reader.onerror = (error) => reject(error);
 reader.readAsDataURL(blob);
 });
}

export function formatTime(seconds: number): string {
 const minutes = Math.floor(seconds / 60);
 const secs = Math.floor(seconds % 60);
 return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function sleep(ms: number) {
 return new Promise(resolve => setTimeout(resolve, ms));
}