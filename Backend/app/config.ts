const config = {
  port: process.env.PORT || 3001,
  databaseUrl: process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/project",
  JwtSecret: process.env.JWT_SECRET || "secret",
};

export default config;
