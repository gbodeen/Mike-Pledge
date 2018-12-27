module.exports = {
  apps: [
    {
      name: "Pledges",
      script: "./server/server.js",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
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
    }
  }
};
