const router = require("express-promise-router")();
const loginController = require("../Controllers/Login");
const { validateBodyRequest, schemas } = require("../helper/validate");
const passport = require("passport");
//Mặc dù ko sử dụng passportConfig nhưng bắt buộc vẫn phải khai báo
const passportConfig = require("../Config/Passport");

router
  .route("/")
  .get(loginController.getIndex)
  .post(
    validateBodyRequest(schemas.loginSchema),
    //Nếu dùng chức năng login thì nên để session là true, còn nếu tạo API thì để là false
    //Sau khi Authen thành công, Passport sẽ thiết lập một session login liên tục.
    // Điều này sẽ rát phù hợp khi đăng nhập trên cùng một trình duyệt.
    // Tuy nhiên trong nhiều trường hợp không cần thiết phải sử dụng đến sessions. VD như khi dùng API thường yêu cầu với mỗi request.
    passport.authenticate("local", {
       session: true,
       failureRedirect: '/login'
    }),
    loginController.postLogin
  );
//
router
  .route("/auth/facebook")
  .get(passport.authenticate("facebook", { scope: ["email"], session: true }));
router
  .route("/auth/facebook/callback")
  .get(
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    (req, res) => {
      res.redirect("/home");
    }
  );

router
  .route("/auth/google")
  .get(passport.authenticate("google", { scope: ["email", "profile"], session: true }));
router
  .route("/auth/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      res.redirect("/home");
    }
  );
module.exports = router;
