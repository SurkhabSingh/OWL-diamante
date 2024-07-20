const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");
const router = require("./routes/routes");
const { sendFileToIPFS } = require("./utils/ipfsManagement");

dotenv.config();

const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors());

app.use("/", router);
// const ipfsCal = async () => {
//   const resu = await sendFileToIPFS({
//     name: "surkhab",
//     age: "400",
//     nickname: "pookie",
//   });

//   console.log(resu);
// };
// ipfsCal();

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
