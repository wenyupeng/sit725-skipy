const { expressjwt: jwt } = require("express-jwt");
const envConfig = require("../config/env.config");
const secret = envConfig.jwtSecret;

const authenticate = jwt({
  secret: secret,
  algorithms: ["HS256"],
  credentialsRequired: true,
  getToken: function fromHeaderOrQuerystring(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
});
module.exports = authenticate;