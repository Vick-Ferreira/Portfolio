const multer = require('multer');
const path = require('path');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucketName = process.env.GCS_BUCKET_NAME;

const upload = multer({ dest: 'uploads/' });

async function uploadFileToGCS(filePath, destination) {
  await storage.bucket(bucketName).upload(filePath, {
    destination,
  });
  console.log(`${filePath} uploaded to ${bucketName}`);
  return `https://storage.googleapis.com/${bucketName}/${destination}`;
}

const uploadImagem = async (req, res) => {
  try {
    const filePath = req.file.path;
    const destination = `uploads/imagens/${req.file.filename}`;
    const publicUrl = await uploadFileToGCS(filePath, destination);
    res.json({ url: publicUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file');
  }
};

const uploadVideo = async (req, res) => {
  try {
    const filePath = req.file.path;
    const destination = `uploads/${req.file.filename}`;
    const publicUrl = await uploadFileToGCS(filePath, destination);
    res.json({ url: publicUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file');
  }
};

module.exports = {
  upload,
  uploadImagem,
  uploadVideo,
};
