const staticUser = {
  _id: "64efef1b2f66e876543210ab", 
  name: "Student One",
  email: "student@example.com",
  password: "password123", 
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (email === staticUser.email && password === staticUser.password) {
    res.json({
      success: true,
      user: {
        id: staticUser._id,
        name: staticUser.name,
        email: staticUser.email,
      },
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid email or password" });
  }
};
