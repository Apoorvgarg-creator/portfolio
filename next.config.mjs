/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
