import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "Coffee-hunter-cov2";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath: `/${repoName}`,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
