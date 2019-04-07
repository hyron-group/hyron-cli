const fs = require('fs');

module.exports = class {
    static requestConfig() {
        return {
            upload: 'post',
            download: {
                method: 'get',
                params: '/:id',
                fontware: ['!simple-auth'] // to disable authenticate
            }
        }
    }

    // upload file from client. required authenticate
    upload(uid, name, file) {
        return new Promise((resolve, reject) => {
            fs.writeFile(`./.upload/${uid}-${name}`,
                file.content,
                (err) => {
                    if (err) {
                        reject(
                            new HTTPMessage(
                                StatusCode.INTERNAL_SERVER_ERROR,
                                `can't upload file because : ${err.message}`
                            )
                        );
                    } else resolve(true);
                });
        })

    }

    // download file from client. not required authenticate
    download(id) {
        return new Promise((resolve, reject) => {
            fs.readFile(`./.upload/${id}`, (err, data) => {
                if (err) {
                    reject(new HTTPMessage(
                        StatusCode.NOT_FOUND,
                        `not found file : ${err.message}`
                    ))
                } else resolve(data);
            })
        })
    }
}