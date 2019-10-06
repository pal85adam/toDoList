const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
connectDB();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,x-auth-token"
  );
  next();
});

//routes
app.use("/api/users", require("./config/routes/api/users"));
app.use("/api/auth", require("./config/routes/api/auth"));
app.use("/api/profile", require("./config/routes/api/profile"));
app.use("/api/tasks", require("./config/routes/api/tasks"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client_app/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client_app", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
