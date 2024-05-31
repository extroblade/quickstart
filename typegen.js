const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const { API_URL, API_USER, API_PASS } = process.env;

if (!API_URL) {
  console.error("Missing required environment variables");
  process.exit(1);
}

const swaggerFilePath = path.resolve(__dirname, "src/shared/types/schema.yaml");
const curlCommand = `curl ${API_URL} --user ${API_USER}:${API_PASS} -o ${swaggerFilePath}`;

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