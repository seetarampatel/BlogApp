const Blog = require("../models/blog");

exports.index = (req, res) => {
  Blog.find()
    .populate("author")
    .then(blogs => res.json(blogs))
    .catch(err => res.status(404).json(err));
};

exports.show = (req, res) => {
  Blog.findOne({
    _id: req.params.id
  })
    .populate("author")
    .then(blog => res.json(blog))
    .catch(err => res.status(404).json(err));
};

exports.create = async (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "Not Authenticated" });

  // Add the current author to the blog
  req.body.blog.author = req.session.userId;

  Blog.create(req.body.blog)
    .then(() => res.status(200).send({ success: "Blog created" }))
    .catch(err => res.status(404).send(err));
};

exports.edit = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "Not Authenticated" });

  Blog.findOne({
    _id: req.params.id,
    author: req.session.userId
  })
    .then(blog => res.send(blog))
    .catch(err => res.status(404).send(err));
};

exports.update = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "Not Authenticated" });

  Blog.updateOne(
    {
      _id: req.body.id,
      author: req.session.userId
    },
    req.body.blog,
    {
      runValidators: true
    }
  )
    .then(() => res.status(200).send({ success: "Blog updated successfully" }))
    .catch(err => res.status(404).send(err));
};

exports.destroy = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "Not Authenticated" });

  Blog.deleteOne({
    _id: req.body.id,
    author: req.session.userId
  })
    .then(() => res.status(200).send({ success: "Blog deleted successfully" }))
    .catch(err => res.status(404).send(err));
};
