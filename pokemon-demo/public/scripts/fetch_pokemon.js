const AWS = require('aws-sdk')
AWS.config.update({
    accessKeyId: 'AKIAS322KRRNTP3JKMGB',
    secretAccessKey: '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',
    region: 'eu-central-1'
})
const S3 = new AWS.S3();


module.exports = {
    getFileFromS3: () => {
        return new Promise((resolve, reject) =>{
            try {
                const bucketName = 'pokemon-next-tutorial'
                const objectKey = 'index.json'

                S3.getObject(
                    {
                        Bucket: bucketName,
                        Key: objectKey
                    }, (err,data) => {
                        if (err) {
                            reject(err)
                        } else {
                            console.log('Unparsed Fetched Object Data: ', data)
                            resolve(data)
                        }
                    }
                )
            } catch(e) {
                reject(e)
            }
        })

    }
}