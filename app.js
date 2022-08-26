const express = require("express")
const app = express();
const itemsRoutes = require("./routes")
const ExpressError = require("./expressError")

app.use(express.json());
app.use("/items", itemsRoutes);



// 404 Handler
app.use(function(req, res, next) {
    return new ExpressError("Not Found", 404);
});

// General error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
  
    return res.json({
      error: {message: err.message, status: err.status}
    });
  });

module.exports = app; 