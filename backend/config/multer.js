import multer from 'multer';

// Switch from diskStorage to memoryStorage
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export default upload;