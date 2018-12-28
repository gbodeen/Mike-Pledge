const app = require("./app.js");
const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
