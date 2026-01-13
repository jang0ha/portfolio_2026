// @ts-nocheck
import withNuxt from './.nuxt/eslint.config.mjs'

// export default withNuxt(
//   // Your custom configs here
// )

export default withNuxt(
  eslintPluginPrettierRecommended, {
    ignores: ["node_modules", "lib", "preset"]
  }
)
