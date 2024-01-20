module.exports = {
  apps: [
    {
      name: "botfeed.viandwi24.com-api",
      script: "bun",
      args: "dev run -sp 3006",
      cwd: "packages/engine",
      env: {
        "NODE_ENV": "production"
      }
    },
    {
      name: "botfeed.viandwi24.com-web",
      script: "bun",
      args: "preview",
      cwd: "packages/web-ui",
      env: {
        "PORT": 3007,
        "NODE_ENV": "production"
      }
    },
  ]
};