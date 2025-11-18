const ApiError = require('./app/app-error');
const express = require("express");
const cors = require("cors");
const app = express();
const bookRoutes = require("./app/routes/book.route");
const publisherRoutes = require("./app/routes/publisher.route");
const statusRoutes = require("./app/routes/status.route");
const employeeRoutes = require("./app/routes/employee.route");
const userRoutes = require("./app/routes/user.route");
const borrowingCardRouter = require('./app/routes/borrowingCard.route');
const reportRoutes = require('./app/routes/report.route');
//
app.use(cors());
app.use(express.json());
app.use('/api/book', bookRoutes);
app.use('/api/publisher', publisherRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/borrowingCard', borrowingCardRouter);
app.use('/api/report', reportRoutes);

// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// handle errors
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
});
//home page
app.get("/", (req ,res)=>{
    res.json({
        message: "welcome to contact book application"
    })
});

module.exports = app;