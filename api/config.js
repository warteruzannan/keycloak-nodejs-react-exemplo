const { config } = require("dotenv");
const path = require("path");

config({ path: path.join(".env") });

module.exports = {
  KEYCLOAK_PUBLIC_KEY: `-----BEGIN PUBLIC KEY-----\r\n${process.env.KEYCLOAK_PUBLIC_KEY}\r\n-----END PUBLIC KEY-----`,
  KEYCLOAK_ALGORITHMS: "RS256",
};
