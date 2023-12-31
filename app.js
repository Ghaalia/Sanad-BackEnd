const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./database");
const morgan = require("morgan");
const cors = require("cors");
const { NotFound } = require("./middleware/NotFound");
const { ErrorHandler } = require("./middleware/ErrorHandler");
const passport = require("passport");
const userrouter = require("./Api/user/user.routes");
const OrganizationRouter = require("./Api/organization/organization.routes");
const eventrouter = require("./api/Event/event.routes");
const categoryrouter = require("./Api/EventCategory/eventcategory.routes");
const notificationRouter = require("./Api/notification/notification.routes");
const deviceRouter = require("./Api/device/device.routes");
const pdfRouter = require("./Api/pdf/pdf.routes");

const { localStrategy, jWTStrategy } = require("./middleware/passport");
const { localStrategy2, jWTStrategy2 } = require("./middleware/OrgPassport");

const participationrouter = require("./Api/participation/participation.routes");
const uploadRoutes = require("./Api/donation/upload.routes");

require("dotenv").config();

app.use(cors());
app.use("/media", express.static("media")); //i added this line to give access for /media folder, to the frontend
app.use(express.json());
app.use(morgan("dev"));
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jWTStrategy);

passport.use("local2", localStrategy2);
passport.use("jwt2", jWTStrategy2);

/*
ADD ROUTES HERE
*/
app.use("/api", categoryrouter);
app.use("/api", userrouter);
app.use("/api", eventrouter);
app.use("/api", OrganizationRouter);
app.use("/api", userrouter);
app.use("/api", participationrouter);
app.use("/api", pdfRouter);
app.use("/api", deviceRouter);
app.use("/api", notificationRouter);
app.use(uploadRoutes);

// Not Found Path
app.use(NotFound);

// Error Handler
app.use(ErrorHandler);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`The application is running on localhost:${process.env.PORT}`);
});
