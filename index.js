const { productsCreate } = require('./src/controllers/productsCreate.js');
const { getUsers } = require('./src/controllers/getUsers.js');

require("dotenv").config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const port = process.env.PORT || 3001;


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(port, async() => {
    await productsCreate();
    await getUsers()
    console.log(`Server raised in port ${port}`); // eslint-disable-line no-console
  });
});
