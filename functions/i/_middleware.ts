import examplePlugin from "../plugin/index.js";

export const onRequest = examplePlugin({ footerText: "Set from a Plugin!" });
