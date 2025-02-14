const { body, validationResult } = require("express-validator");
const validate = {};

validate.contactRules = () => {
  return [
    body("firstName").trim().escape().notEmpty().withMessage("First name is required."),
    body("lastName").trim().escape().notEmpty().withMessage("Last name is required."),
    body("email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required. Example: firstNamelastName@email.com"),
    body("favoriteColor").trim().escape().notEmpty().withMessage("Favorite color is required."),
    body("birthday")
      .trim()
      .escape()
      .notEmpty()
      .isDate()
      .withMessage("A valid birthday is required. Accepted format: YYYY-MM-DD.")
  ];
};

validate.checkContactData = async (req, res, next) => {
  contactInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const simplifiedErrors = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: simplifiedErrors });
  }
  next();
};

module.exports = validate;
