require("colors");
const express = require("express")
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const { v4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//-------------------------------------------------------------------------------------
const tempDir = path.join(__dirname, "tmp");
console.log("tempDir:", tempDir.blue);
const productsDir = path.join(__dirname, "public", "products");

//! Настройки сохранения файла:
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    // fileSize: 2048
  }
});

//! Middleware upload
const upload = multer({
  storage: multerConfig
});

const products = [];


app.post("/api/products", upload.single("image"), async (req, res) => {
  console.log("req.file:".red, req.file); //!
  const { file: uploadFile } = req

  const { path: tempUpload, originalname } = req.file;
  console.log("tempUpload:".yellow, tempUpload); //!

  const resultUpload = path.join(productsDir, originalname);
  console.log("resultUpload:".green, resultUpload); //!
  console.log(""); //!

  try {
    //! Переносим файл с папки tempUpload в папку resultUpload
    await fs.rename(tempUpload, resultUpload);

    const image = path.join("products", originalname);

    console.log("req.body:".bgYellow, req.body); //! Должно быть поле "name" в Postman--> Body --> Key (name)
    console.log("");

    const newProduct = {
      name: req.body.name,
      id: v4(),
      image
    };

    products.push(newProduct);
    console.log("products:".bgRed, products); //!

    //! мой вариант
    res.status(201).json({
      status: "success /api/products",
      code: 201,
      uploadFile,
      products
    })
    // res.status(201).json(newProduct);
  } catch (error) {
    await fs.unlink(tempUpload);
  }
});

app.get("/api/products", async (req, res) => {
  res.json(products);
})

const PORT = 3001

app.listen(PORT, () => console.log(`Server-2 is running on the port: ${PORT}`.bgGreen.black));