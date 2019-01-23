const app = require("./app.js");
const config = require("./config.js");
const port = config.PORT;
const cluster = require('cluster');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < 4; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.listen(port, () => {
    console.log(`server running at: http://localhost:${port}`);
  });

  console.log(`Worker ${process.pid} started`);
}

