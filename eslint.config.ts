import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: true,
  },
  typescript: {
    overrides: {
      "ts/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
});
