require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/utils/db');

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
