const User = require("../modules/User");
const nodeMailer = require("../config/nodemailer");
const ForgetPassword = require("../modules/ForgetPassword");
const bcrypt = require("bcrypt");

// Login Page
module.exports.signInPageController = (req, res) => {
  req.flash("error");
  return res.render("session/loginPage.ejs", {
    title: "Sign In",
  });
};

// Sign Up Page
module.exports.signUpPageController = (req, res) => {
  return res.render("session/signUpPage.ejs", {
    title: "Sign Up",
  });
};

// Function to check if password and confirm password are same or not
function isBothPasswordsAreSame(password, confirmPassword) {
  if (password !== confirmPassword) {
    return false;
  }
  return true;
}

// Creating new Account
module.exports.create = async (req, res) => {
  try {
    const user = req.body;
    if (!isBothPasswordsAreSame(user.password, user.confirmPassword)) {
      return res.redirect("back");
    }
    const isUserExist = await User.findOne({ email: user.email });
    // If user Already have account then we let user know that he has Registered Account
    if (isUserExist) {
      return res.redirect("back");
    }
    // Send OTP and check Email
    configOTP(user.email);
    return res.render("session/updateUser", {
      target: "newUserOTP",
      user: user,
    });
  } catch (err) {
    res.redirect("back");
  }
};

// Function to bcrypt a password
let saltRounds = 10;
function bcryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
}
// create userOTP
module.exports.createUserOTP = async (req, res) => {
  // check if OTP is correct or not
  const password = await bcryptPassword(req.body.password);
  const isOTPValid = await isOTPValidHandler(req.body.OTP, req.body.email);
  if (isOTPValid === true) {
    const user = {
      email: req.body.email,
      password: password,
      fullName: req.body.fullName,
      gender: req.body.gender,
      phone: req.body.phone,
      friends: [],
      image: "",
      address: req.body.address,
    };
    const newUser = new User(user);
    await newUser.save();
    req.flash("success", "New Account Is Created SuccessFully");
    return res.redirect("/user/signIn");
  } else {
    return res.render("session/signUpPage.ejs", {
      message: "OTP Not Matched",
    });
  }
};

// createSession
module.exports.createSession = async (req, res) => {
  req.flash("success", "Logged In SuccessFully");
  return res.redirect("/");
};

// Sign Out
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged Out SuccessFully");
    return res.redirect("/");
  });
};

// Forget password Page
module.exports.forgetPasswordPage = (req, res) => {
  return res.render("session/updateUser", {
    target: "forgetPassword",
  });
};

// Send OTP to user
let sendOTPMail = (userEmail, OTP) => {
  nodeMailer.Transporter.sendMail(
    {
      from: process.env.userEmail,
      to: userEmail,
      subject: "One Time Password From Fast Food",
      html: `<p>This Is User One Time Password From Fast Food Don't Share It With Any One <b>${OTP}<b/></p>`,
    },
    (error, info) => {
      if (error) {
        return;
      }
      return;
    }
  );
};

function generateRandomNumber() {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
}

async function configOTP(userEmail) {
  try {
    let OTP = generateRandomNumber();

    // saving otp with email in ForgetPassword databases
    await ForgetPassword.create({
      email: userEmail,
      OTP: OTP,
    });
    // sending mail to user
    sendOTPMail(userEmail, OTP);
  } catch (err) {
    return;
  }
}

// Forget password
module.exports.forgetPassword = async (req, res) => {
  let userEmail = req.body.email;
  // generate OTP And Save to Database
  let user = await User.findOne({ email: userEmail });
  if (user) {
    configOTP(userEmail);
    return res.render("session/updateUser", {
      target: "ForgetOTP",
      email: userEmail,
    });
  } else {
    return res.redirect("back");
  }
};

// Check id OTP match or not
async function isOTPValidHandler(enterOTP, userEmail) {
  let forgetUser = await ForgetPassword.findOne({ email: userEmail });
  await ForgetPassword.findByIdAndDelete(forgetUser.id);

  if (enterOTP === forgetUser.OTP) {
    return true;
  } else {
    return false;
  }
}

// OTP password
module.exports.checkOTP = async (req, res) => {
  let userEmail = req.body.email;
  let OTP = req.body.OTP;

  // check if forgetUser OTP and Entered OTP is same the reset other wise send back
  let isOTPValid = await isOTPValidHandler(OTP, userEmail);

  if (isOTPValid === true) {
    return res.render("session/updateUser", {
      target: "changePassword",
      email: userEmail,
    });
  } else {
    return res.render("session/updateUser", {
      target: "forgetPassword",
    });
  }
};

// Change the password
module.exports.changePassword = async (req, res) => {
  let { email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.redirect("back");
  }

  let newPassword = await bcryptPassword(password);
  // find the user by Email and update the password
  let user = await User.findOne({ email: email });
  if (user) {
    user.password = newPassword;
    await user.save();
    req.flash("success", "password is successfully forgotten");
    return res.redirect("/user/signIn");
  } else {
    return res.redirect("back");
  }
};
