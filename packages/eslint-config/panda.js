import pandaPlugin from "eslint-plugin-panda";

export const pandaConfig = [
  {
    plugins: {
      panda: pandaPlugin,
    },
    rules: {
      "panda/no-invalid-token-paths": "error",
    },
  },
];