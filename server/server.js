const app = require("./app.js");
const config = require("./config.js");
const port = config.PORT;

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
