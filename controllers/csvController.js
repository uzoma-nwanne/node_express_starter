const fs = require('fs');
const { parse } = require('csv-parse');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const uploadCsv = async (req, res, next) => {
  try {
    const { file } = req;

    const json = [];

    // we want to wait for the file to be parsed before we send a response
    await new Promise((res, rej) => {
      fs.createReadStream(`./${file.path}`)
        .pipe(parse({ delimiter: ',', from_line: 1 }))
        .on('data', function (row) {
          json.push(row);
        })
        .on('end', () => {
          res();
        })
        .on('error', (err) => {
          rej(err);
        });
    });
    res.status(200).send({ data: json });
  } catch (err) {
    res.status(500).send({
      message: 'File upload failed',
      err: err.message,
    });
  } finally {
    // we want to clean up the files after we are done with them
    const files = fs.readdirSync('./temp');
    for (const file of files) {
      fs.unlinkSync(`./temp/${file}`);
    }
  }
};

module.exports = {
  uploadCsv,
};
