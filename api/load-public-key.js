const axios = require("axios");

module.exports = async () => {
  console.log(
    `[load-public-api] at ${process.env.KEYCLOAK_SERVER}/auth/realms/${process.env.KEYCLOAK_HELM}`
  );
  const { data } = await axios.get(
    `${process.env.KEYCLOAK_SERVER}/auth/realms/${process.env.KEYCLOAK_HELM}`
  );

  return `-----BEGIN PUBLIC KEY-----\r\n${data?.public_key}\r\n-----END PUBLIC KEY-----`;
};
