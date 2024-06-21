let JwtStrategy = require("passport-jwt").Strategy;
// 拉出JWT
let ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models").user;

module.exports = (passport) => {
  let opts = {};
  // 具體來說，它期望請求頭包含 'Authorization: jwt <token>' 格式的 JWT token
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  // 設置用來驗證和簽署 JWT token 的密鑰
  opts.secretOrKey = process.env.PASSPORT_SECRET;
  // 使用JwtStrategy
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        let foundUser = await User.findOne({ _id: jwt_payload._id }).exec();
        if (foundUser) {
          return done(null, foundUser); // req.user = foundUser
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(e, false);
      }
    })
  );
};
