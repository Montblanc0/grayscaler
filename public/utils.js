const reader = new FileReader();

export const readFile = (f) => {
    return new Promise((resolve, reject) => {
        if (f instanceof File) {
            reader.readAsDataURL(f);
            reader.onloadend = (r) => resolve(r.target.result);
            reader.onerror = () => reject("Error while reading file.");
        }
        else reject("No file present.");
    })
}

export const checkFileType = (file) => {
    const allowedMimeTypes = ["image/jpeg", "image/gif", "image/tiff", "image/webp", "image/png"];
    const fileType = file.type;

    return allowedMimeTypes.includes(fileType);
}

export const validateSize = (file) => {
    if (!file.size) return false;
    if (+file.size > 2097152) return false;
    return true;
}