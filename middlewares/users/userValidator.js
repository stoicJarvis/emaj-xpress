const createAccountValidator = (req, res, next) => {
  const { user_name, email, password } = req.body;
  const errors = [];

  if (!user_name || user_name.trim().length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Invalid email address');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  } else if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (errors.length > 0) {
    console.log("invalid user", errors);
    return res.status(400).json({ errors });
  }

  next();
};

const loginUserValidator = (req, res, next) => {
  const { user_name, password } = req.body;

  const errors = [];

  if (!user_name || user_name.trim().length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  } else if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (errors.length > 0) {
    console.log("invalid user", errors);
    return res.status(400).json({ errors });
  }

  next();
}

export { createAccountValidator, loginUserValidator };