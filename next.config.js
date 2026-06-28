const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/assets/styles")],
    prependData: `@use "mixins";`,
  },
};

module.exports = nextConfig;
