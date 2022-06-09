const UploadModel = require("../model/nftCreateSchema");
const fs = require("fs");
const bufferImage = require("buffer-image");

exports.uploads = (req, res, next) => {
  console.log("Inside the controller");
  console.log(req.files);
  const files = req.files;

  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }
  //convert Images to bit 64 encoding:
  let imgArray = files.map((file) => {
    let img = fs.readFileSync(file.path);
    const encode_image = img.toString("base64");
    return img;
  });

  let result = imgArray.map((src, index) => {
    //creating object to store in the database:
    let finalImage = {
      nftImg: src, // Its a Buffer data Storage
      nftName: req.body.nftName ? req.body.nftName : files[index].originalname,
      contentType: files[index].mimetype,
      nftImgBase64: src.toString("base64"),
      nftsupply: req.body.nftsupply ? req.body.nftsupply : 123,
      nftCollectionName: req.body.nftCollectionName
        ? req.body.nftCollectionName
        : "sample-collection",
      nftDescription: req.body.nftDescription
        ? req.body.nftDescription
        : "This-is-Sample_nftDescription",
      nftLink: req.body.nftLink ? req.body.nftLink : "This-is-Sample_nftLink",
      nftImage: req.body.nftImage
        ? req.body.nftImage
        : "This-is-Sample_nftImage",
    };
    let newUpload = new UploadModel(finalImage);
    return newUpload
      .save()
      .then(() => {
        return {
          message: "Uploaded Successfully",
        };
      })
      .catch((error) => {
        if (error) {
          if (error.name === "MongoError" && error.code === 11000) {
            return Promise.reject({ error: "Image already exists" });
          }
          return Promise.reject({
            error:
              error.message ||
              `Cannot upload ${files[index].originalname}, something is Missing`,
          });
        }
      });
  });
  Promise.all(result)
    .then((msg) => {
      res.json(msg);
      //res.redirect("/");
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.download = async (req, res, next) => {
  const Image = await UploadModel.find({});

  const vec = [];
  // let data = Image[0];
  // let result = Buffer.from(data.nftImgBase64, "base64");
  // fs.writeFileSync(`./public/downloads/${data.nftName}`, result);
  // res.status(200).json(data.nftImgBase64);

  //send each image nftImgBase64 to the client:
  Image.map((img) => {
    vec.push(img.nftImgBase64);
  });
  console.log(vec);
  res.status(200).send(vec);
};
