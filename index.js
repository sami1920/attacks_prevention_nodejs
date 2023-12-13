const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const port = 3000;

// MySQL connection using ORM
const sequelize = new Sequelize("attacks", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Define a User model for the "users" table
const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Sync the database and start the server
sequelize.sync().then(() => {
  console.log("Database synced successfully!");

  // Route for serving the HTML form
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  // Route for handling form submissions
  app.post("/submit", async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    try {
      // Find the user using ORM
      const user = await User.findOne({
        where: {
          name: name,
          password: password,
        },
      });

      // Find the user using raw MySQL Query of sequelize
      // const [user, metadata] = await sequelize.query(
      //   `SELECT * FROM Users WHERE name = :name AND password = :password LIMIT 1`,
      //   {
      //     replacements: { name, password },
      //     type: sequelize.QueryTypes.SELECT,
      //   }
      // );

      if (user) {
        res.send("Congrats! User found successfully!");
      } else {
        res.send("User not found!");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});
