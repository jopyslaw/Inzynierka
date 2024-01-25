const config = {
  port: process.env.PORT || 3000,
  databaseUrl:
    process.env.MONGODB_URI ||
    "mongodb://mongo1:27017,mongo2:27017,mongo3:27017/project", //"mongodb+srv://konradpraktykife:74sGvlDU1Kb9XruP@cluster0.duwmmdt.mongodb.net/?retryWrites=true&w=majority",
  JwtSecret: process.env.JWT_SECRET || "secret",
};

export default config;
