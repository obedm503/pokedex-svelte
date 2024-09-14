/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "pokedex-svelte",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: input?.stage === "production" ? "production" : "default",
        },
        cloudflare: "5.38.0",
      },
    };
  },
  async run() {
    new sst.aws.SvelteKit("MyWeb", {
      domain: {
        name: $app.stage === "production" ? "pokedx.xyz" : "dev.pokedx.xyz",
        dns: sst.cloudflare.dns(),
      },
    });
  },
});
