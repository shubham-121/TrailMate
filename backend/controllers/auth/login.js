const Users = require("../../models/UserSchema/userSignup.js");
const hashUserPassword = require("../../utils/hashUserPassword.js");
const jwt = require("jsonwebtoken");
const validateUserHashedPassword = require("../../utils/validateUserHashedPassword.js");

async function login(req, res) {
  const { userEmail, userPassword } = req.body;

  console.log("Login details:", userEmail, userPassword);

  //1- check for missing credentials
  if (!userEmail || !userPassword) {
    return res.status(400).json({
      message: "Missing credentials, please fill all credentials first",
      userData: {
        userEmail,
        userPassword,
      },
    });
  }

  try {
    //2- First  find by email
    const searchUser = await Users.findOne({ userEmail: userEmail });

    if (!searchUser) {
      return res.status(400).json({
        message: "User doesnt exist in the DB, signup first",
        userData: { userEmail },
      });
    }

    console.log("Login -> searched user", searchUser);

    //3- get the email from previous search
    const storedHashedPswd = searchUser.userPassword;

    //4-validate plain pswd with the hashed password
    const isPasswordMatch = await validateUserHashedPassword(
      userPassword, //plain pswd by user
      storedHashedPswd //hashed pswd in DB
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect password. Please try again.",
        status: "Failure",
      });
    }

    console.log("User pswd matched with the hash password", isPasswordMatch);

    //5-generate and assign the jwt

    const userObj = { _id: searchUser._id, email: searchUser.userEmail };
    const jwt_token = jwt.sign(userObj, process.env.JWT_SECRET_KEY);

    console.log("jwt token for logged in user", jwt_token);

    return res.status(200).json({
      message: "Successfully logged in.",
      status: "Success",
      userName: searchUser.userName,
      userEmail: searchUser.userEmail,
      userPhoneNumber: searchUser.userPhoneNumber,
      userId: searchUser._id,
      token: jwt_token,
    });
  } catch (error) {
    console.log("Error in logging the user in:", error.message);

    return res.status(500).json({
      message: "Internal server error. Please try again later.",
      status: "Failure",
    });
  }
}

module.exports = login;
