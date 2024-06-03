const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://gist.githubusercontent.com/ericpsimon/71899d0564e928fd1a9a7b2eca22ce31/raw/5990bfd88677568d70c76d07d0faee459240e72a/json-placeholder-api.yaml";

if (!API_URL) {
  console.error("Missing required environment variables");
  process.exit(1);
}

const swaggerFilePath = path.resolve(__dirname, "src/shared/types/schema.yaml");
const curlCommand = `curl ${API_URL} ${process.env.API_USER && process.env.API_PASS ? `--user ${process.env.API_USER}:${process.env.API_PASS}` : ""} -o ${swaggerFilePath}`;

try {
  execSync(curlCommand, { stdio: "inherit" });

  if (!fs.existsSync(swaggerFilePath)) {
    throw new Error("Swagger schema file not found after download");
  }

  const generateTypesCommand = `pnpm swagger-typescript-api -p ${swaggerFilePath} -o src/shared/types/ -n generated.ts`;
  execSync(generateTypesCommand, { stdio: "inherit" });
} catch (error) {
  console.error("Failed to download API schema or generate types", error);
  process.exit(1);
}
