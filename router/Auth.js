const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authModel = require("../models/auth");

const AuthRouter = Router();

AuthRouter.post("/signup", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 12, async (err, Secure_Password) => {
      console.log("secure_password", Secure_Password);
      if (err) {
        console.log(err);
      } else {
        const signupdata = new authModel({
          name,
          email,
          gender,
          password: Secure_Password,
        });
        // console.log("Secure_Password", Secure_Password);
        console.log("signupdata", signupdata);
        await signupdata.save();
        res.send({ Message: "Signup successfully", signupdata: signupdata });
      }
    });
  } catch (error) {
    res.send("Error in Signup the user");
    console.log(error);
  }
});

AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const logindata1 = await authModel.find({ email });
    // console.log("logindata1",logindata1);
    const hashpassword = logindata1[0].password;
    if (logindata1.length > 0) {
      bcrypt.compare(password, hashpassword, (err, result) => {
        if (!err) {
          const token = jwt.sign(
            { userID: logindata1[0]._id },
            process.env.jwt_key,
            {
              expiresIn: "1d",
            }
          );
          res.send({ token: token, message: "login successfully" });
        } else {
          res.send("Wrong Credntials1");
        }
      });
    } else {
      res.send("Wrong Credntials2");
    }
  } catch (error) {
    console.log(error);
    res.status(401).send("unathorized");
  }
});

module.exports = AuthRouter;
