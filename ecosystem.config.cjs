module.exports = {
  apps: [
    {
      name: "botfeed.viandwi24.com-api",
      script: "bun",
      args: "dev run -sp 3006",
      env: {
        "NODE_ENV": "production"
      }
    },
    {
      name: "botfeed.viandwi24.com-web",
      script: "bun",
      args: "preview",
      env: {
        "PORT": 3007,
        "NODE_ENV": "production"
      }
    },
  ]
};