const nova = require('novaxjs2');
const path = require('path');
const fs = require('fs');
const app = new nova();
const port = 3000;
app.serveStatic('public')
app.get('/', async (req, res) => {
  try {
    app.sendFile(path.join(__dirname, '../public/index.html'), res)
  } catch(err) {
    return 'Error: '+err;
  }
});
app.on(404, () => {
    return `${fs.readFileSync(path.join(__dirname, '../public/404.html'))}`;
});
app.at(port, () => {
  console.log(`Nova is running on https:localhost:${port}`);
})
module.exports = app;
