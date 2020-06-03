const gcs = require('./gcs');

module.exports = { upload };
async function upload() {
  const [buckets] = await gcs.storage.getBuckets();
  console.log('Buckets:');
  buckets.forEach((bucket) => {
    console.log(bucket.name);
  });
  gcs.uploadFile(
    'meal-nation.appspot.com',
    '/Users/yoh/Pictures/20200406_153923.jpg'
  );
}

function getBase64(url) {
  return axios
    .get(url, {
      responseType: 'arraybuffer',
    })
    .then((response) =>
      Buffer.from(response.data, 'binary').toString('base64')
    );
}
