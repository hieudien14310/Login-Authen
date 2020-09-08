const Joi = require("@hapi/joi");

const schemas = {
  // Nơi định nghĩa các rules cho việc validate. Ví dụ như : Email không được bỏ trống, phải dài hơn 5 ký tự,...v....v..
  // Các tên key trong shema phải trùng với name trong form gửi đi
  registerSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.string().min(5).required(),
  }),
  loginSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  }),
};
const validateBodyRequestLogin = (schema) => {
  return (req, res, next) => {
    const validateBodyResult = schema.validate(req.body);
    if (validateBodyResult.error){
        req.flash("errors", `❌ ${validateBodyResult.error}`);
        return res.redirect('/login')
    }      
    if (!req.value) req.value = {};
    req.value.body = validateBodyResult.value;
    next();
  };
};

const validateBodyRequestRegister = (schema) => {
  return (req, res, next) => {
    const validateBodyResult = schema.validate(req.body);
    if (validateBodyResult.error) {
      req.flash("errors", `❌ ${validateBodyResult.error}`);
      return res.redirect('/register')
    }

    if (!req.value) req.value = {};
    req.value.body = validateBodyResult.value;
    next();
  };
};

module.exports = {
  validateBodyRequestRegister,
  schemas,
  validateBodyRequestLogin,
};
