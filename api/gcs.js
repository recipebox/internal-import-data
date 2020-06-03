const {
    Storage
} = require('@google-cloud/storage');
const storage = new Storage({
    keyFilename: './Meal Nation-b32dc40093dd.json',
    projectId: 'meal-nation',
});

async function uploadFile(bucketName, filename) {
    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
        gzip: true,
        metadata: {
            cacheControl: 'public, max-age=31536000',
        },
    });
    console.log(`${filename} uploaded to ${bucketName}.`);
}

module.exports = {
    storage,
    uploadFile,
}