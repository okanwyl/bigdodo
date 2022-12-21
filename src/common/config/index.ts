export default () => ({
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'secret',
  PORT: process.env.PORT || 8080,
});
