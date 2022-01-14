const { config } = require("dotenv");
const path = require("path");

config({ path: path.join(".env") });

module.exports = {
  KEYCLOAK_PUBLIC_KEY: "KEYCLOAK_PUBLIC_KEY",
  KEYCLOAK_ALGORITHMS: "RS256",
  KEYCLOAK_SERVER: process.env.KEYCLOAK_SERVER || "http://127.0.0.1:8000",
  KEYCLOAK_HELM: process.env.KEYCLOAK_SERVER || "test",
};
