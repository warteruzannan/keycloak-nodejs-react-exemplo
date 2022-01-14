const express = require("express");
const cors = require("cors");
const HTTP_CONSTANTS = require("http2").constants;
const fiends = require("./friends.json");

const { KEYCLOAK_PUBLIC_KEY } = require("./config");
const PORT = 4020;
const app = express();
const keycloakMidleware = require("./midleware.keycloak")(KEYCLOAK_PUBLIC_KEY);

app.use(cors());
app.get("/friends", keycloakMidleware(), async (req, res) => {
  try {
    return res.status(HTTP_CONSTANTS.HTTP_STATUS_OK).json(fiends);
  } catch (error) {
    return res
      .status(HTTP_CONSTANTS.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: `Probelma ao decodificar token ${error.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`app rodando na porta ${PORT}`);
});
