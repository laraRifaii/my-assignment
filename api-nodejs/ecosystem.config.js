module.exports = {
  apps: [
    {
      name: "api-nodejs",
      script: "./index.js",
      env: {
        NODE_ENV: "production",
      },

      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      log_file: "./logs/combined.log",

      time: true,
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
