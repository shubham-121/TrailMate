function homeScreen(req, res) {
  const { _id: userId, email: userEmail } = req.user;

  if (!userId && !userEmail) {
    return res.status(400).json({ message: "User not allowed, login again!" });
  }

  console.log("Homescreen body part : ", req.user);

  return res
    .status(200)
    .json({ message: "Homescreen route", userId, userEmail });
}

module.exports = homeScreen;
