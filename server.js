const nova = require('novaxjs2');
const fs = require('fs');
const path = require('path');
const app = nova();
const port = 3000;
app.get('/', (req, res) => {
  res.end(fs.readFileSync(path.join(__dirname, './public/index.html')));
});
app.get('/novaxjs2', (eeq, res) => {
  res.end(fs.readFileSync(path.join(__dirname, './public/novaxjs2.webp')));
});
app.at(port, () => {
  console.log(`Nova is running on https:localhost:${port}`);
})