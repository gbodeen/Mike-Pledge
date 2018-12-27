require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "Pledges",
      script: "./server/server.js",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production",
        DB_HOST: "mypostgresinstance.cddpmydwbwcw.us-east-1.rds.amazonaws.com",
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        PORT: 3003
      }
    }
  ],

  deploy: {
    production: {
      user: "ubuntu",
      host: "ec2-18-234-245-254.compute-1.amazonaws.com",
      port: "22",
      key: "~/.ssh/firstInstance.pem",
      ref: "origin/master",
      repo: "git@github.com:Michael-K-Oconnor/Mike-JumpStart-Pledge.git",
      path: "/home/ubuntu/Mike-JumpStart-Pledge",
      "post-deploy":
        "npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production"
      // env: {
      //   NODE_ENV: "production"
      // }
    }
  }
};
