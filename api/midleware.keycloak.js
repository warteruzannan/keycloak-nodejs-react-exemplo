const HTTP_CONSTANTS = require("http2").constants;
const jwt = require("jsonwebtoken");

/**
 *
 * @param {String} publicKey Public Key usada para decodificar o web token
 * @param {String} algorithms Algoritmo usado na codificação o token
 * @returns
 */

module.exports = (publicKey, algorithms = "RS256") => {
  return (...roles) => {
    return async (req, res, next) => {
      try {
        const { authorization } = req.headers;

        if (!authorization) {
          return res
            .status(HTTP_CONSTANTS.HTTP_STATUS_UNAUTHORIZED)
            .json({ message: "Você não pode entrar na festa, inocente" });
        }
        const token = authorization.split(" ").pop();
        const jwtUserData = await jwt.verify(token, publicKey, {
          algorithms,
        });

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
};
