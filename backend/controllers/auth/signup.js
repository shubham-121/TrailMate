const Users = require("../../models/UserSchema/userSignup.js");
const hashUserPassword = require("../../utils/hashUserPassword.js");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  const body = req.body;

  const { userName, userEmail, userPhoneNumber, userPassword } = body;

  console.log("body:", userName, userEmail, userPhoneNumber, userPassword);

  //1- check for missing credentials
  if (!userName || !userEmail || !userPhoneNumber || !userPassword) {
    console.error("Error missing credentials");
    return res.status(400).json({
      message: "Missing credentials, please fill all credentials first",
      userData: {
        userName,
        userEmail,
        userPassword,
        userPhoneNumber,
      },
    });
  }

  //2- check if already present in the DB
  try {
    const existingUser1 = await Users.findOne({ userEmail: userEmail });
    const existingUser2 = await Users.findOne({
      userPhoneNumber: userPhoneNumber,
    });

    existingUser1 && console.log("user already present with same userEmail");
    existingUser2 && console.log("user already present with same phoneNumber");

    if (existingUser1 || existingUser2) {
      return res.status(400).json({
        message: "User already exists in the Database, try login",
        existingUser: existingUser1 || existingUser2,
      });
    }

    //3- if not, then register in DB, hash the pswd, then  assign the token , direct the user to homepage with active tokens

    const hashedPassword = await hashUserPassword(userPassword);

    const newUser = await Users.create({
      userName,
      userEmail,
      userPhoneNumber,
      userPassword: hashedPassword,
    });

    console.log("hash password in signup route:", hashedPassword);

    if (!newUser) {
      return res.status(400).json({
        message: "Error in creating the user in the DB",
        user: newUser,
      });
    }

    console.log("User created successfully:", newUser);

    //4- generate jwt tokens
    const userObj = { _id: newUser._id, email: newUser.userEmail };
    const jwt_token = jwt.sign(userObj, process.env.JWT_SECRET_KEY);

    jwt_token
      ? console.log("JWT generated: -> ", jwt_token)
      : console.log("Failed to genreate jwt token");

    return res.status(200).json({
      message: "User created successfully",
      userName: userName,
      userEmail: userEmail,
      userPhoneNumber: userPhoneNumber,
      userId: newUser._id,
      token: jwt_token,
    });
  } catch (error) {
    console.error("Error in creating the user: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = signup;
