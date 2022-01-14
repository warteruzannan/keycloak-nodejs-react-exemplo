const HTTP_CONSTANTS = require("http2").constants;
const jwt = require("jsonwebtoken");
const MemoryCache = require("./memory-cache");
const { KEYCLOAK_PUBLIC_KEY, KEYCLOAK_ALGORITHMS } = require("./config");
const loadPublicKey = require("./load-public-key");

/**
 *
 * @param {String} publicKey Public Key usada para decodificar o web token
 * @param {String} algorithms Algoritmo usado na codificação o token
 * @returns
 */

module.exports = (...roles) => {
  return async (req, res, next) => {
    if (!MemoryCache.get(KEYCLOAK_PUBLIC_KEY)) {
      try {
        const public_key = await loadPublicKey();
        console.log("[middleware-keycloak] load key from cache", public_key);
        MemoryCache.set(KEYCLOAK_PUBLIC_KEY, public_key);
      } catch (error) {
        return res
          .status(HTTP_CONSTANTS.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .json({
            message: "Erro ao carregar public key",
            error: error.message,
          });
      }
    }

    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return res
          .status(HTTP_CONSTANTS.HTTP_STATUS_UNAUTHORIZED)
          .json({ message: "Você não pode entrar na festa, inocente" });
      }
      const token = authorization.split(" ").pop();
      const jwtUserData = await jwt.verify(
        token,
        MemoryCache.get(KEYCLOAK_PUBLIC_KEY),
        {
          algorithms: KEYCLOAK_ALGORITHMS,
        }
      );

      if (!jwtUserData?.realm_access?.roles && roles.length > 0) {
        return res
          .status(HTTP_CONSTANTS.HTTP_STATUS_UNAUTHORIZED)
          .json({ message: "Você não pode entrar na festa, inocente" });
      }

      /**
       * @type {Array<any>} userRoles
       */
      const userRoles = jwtUserData.realm_access.roles;
      try {
        roles.forEach((requiredRole) => {
          if (!userRoles.includes(requiredRole)) {
            throw new Error("Você não pode entrar na festa, inocente");
          }
        });
      } catch (error) {
        return res.status(401).json({ message: error.message });
      }

      req.jwtUserData = jwtUserData;
      next();
    } catch (error) {
      return res.status(HTTP_CONSTANTS.HTTP_STATUS_UNAUTHORIZED).json({
        message: "Você não pode entrar na festa, inocente",
        error: error.message,
      });
    }
  };
};
