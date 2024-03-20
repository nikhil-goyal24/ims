const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.REGION,
});

const s3 = new AWS.S3();

function uploadOnS3(file, filename) {
    
    var date = new Date();
    var parentFolder = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    const params = {
        Bucket: process.env.BUCKET,
        Key: parentFolder + '/' + filename,
        Body: file,
    };
    
    return new Promise(function (resolve, reject) {
        s3.upload(params, function (err, data) { // Use s3.upload instead of s3Bucket.upload
            if (err) {
                console.log('Error =>' + err);
                reject(null);
            }
            if (data != null) {
                console.log('Image', 'uploadOnS3' + data.Location);
                resolve(data.Location);
            }
        });
    });
}

module.exports = uploadOnS3;


