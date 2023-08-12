const Joi = require("joi");

const bodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .regex(/^\(\d{3}\)\s\d{3}-\d{4}/)
    .messages({
      "string.pattern.base": "Phone number format must be: (111) 111-1111",
    })
    .required(),
});

module.exports = {
  bodySchema,
};
