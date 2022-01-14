const Author = require("../models/author");
const jwt = require("jsonwebtoken");

exports.authenticate = (req, res) => {
  console.log("The body", req.body.email);
  Author.findOne({
    email: req.body.email
  })
    .then(author => {
      author.authenticate(req.body.password, (err, isMatch) => {
        if (err) throw new Error(err);

        if (isMatch) {
          req.session.userId = author.id;

          const token = jwt.sign({ payload: req.body.email }, "bobthebuilder", {
            expiresIn: "1h"
          });
          res
            .cookie("token", token, { httpOnly: true })
            .status(201)
            .send({ success: "Authenticated successfully" });
        } else {
          res.status(401).json({ error: "Your credentials do not match" });
        }
      });
    })
    .catch(err => {
      res.status(404).json(err);
    });
};

exports.logout = (req, res) => {
  if (!req.isAuthenticated())
    res.status(401).send({ error: "Could not authenticate request" });

  req.session.userId = null;
  res
    .clearCookie("token")
    .status(200)
    .send({ success: "Your are now logged out" });
};
