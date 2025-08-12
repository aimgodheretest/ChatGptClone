const app = require("./src/app.js");
const ConnectDB = require("./src/db/db.js");



ConnectDB()

app.listen(3000, () => {
  console.log("Server is running on port:3000");
});
