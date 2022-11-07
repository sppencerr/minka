const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// get all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: {
      exclude: ["password"],
    },
  })
    .then((users) => res.json(users))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

// get one user by id
router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: {
      exclude: ["password"],
    },
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: `No user with id ${req.params.id}` });
        return;
      }
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

// create a user
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

// login
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: `Incorrect email` });
        return;
      }

      const validPassword = user.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(404).json({ message: "Incorrect password" });
        return;
      }
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.json(user);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

// logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// update name
router.put("/:id", withAuth, (req, res) => {
  User.update(
    {
      username: req.body.username,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(([result]) => {
      console.log(result);
      if (!result) {
        res.status(404).json({ message: `No user with id ${req.params.id}` });
        return;
      }
      res.json({
        message: `Updated user with id ${req.params.id}`,
        changes: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

// delete profile
router.delete("/:id", withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      console.log(result);
      if (!result) {
        res.status(404).json({ message: `No user with id ${req.params.id}` });
        return;
      }
      res.json({
        message: "User deleted",
        changes: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
