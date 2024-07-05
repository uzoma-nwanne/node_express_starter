//validates that uploaded file is a  CSV file

const validateCSVFile = (req, res, next) => {
  const { file } = req;
  console.log(file)
  if (!file.mimetype.includes("csv")) {
    return res.status(400).send({ message: "Please upload a CSV file" });
  }
  next();
};


module.exports ={
    validateCSVFile
}