const Joi = require("joi");

exports.userValidation = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  subscription: Joi.string(),
  password: Joi.string().required(),
  token: Joi.string().optional().allow(null).allow("").empty(""),
});
