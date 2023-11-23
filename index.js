require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const product = require('./src/controllers/savedInDB')
const port = process.env.PORT || 3001

// Syncing all the models at once.
conn.sync({ force: true}).then(() => {
  product()
  server.listen(port, () => {
    console.log(`Server raised in port ${port}`); // eslint-disable-line no-console

  });
});

