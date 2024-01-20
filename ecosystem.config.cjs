module.exports = {
  apps: [
    {
      name: "botfeed.viandwi24.com",
      script: "bun",
      args: "dev run -sp 3006",
      env: {
        "NODE_ENV": "production"
      }
    }
  ]
};