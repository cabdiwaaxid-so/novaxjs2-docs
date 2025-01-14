const nova = require('novaxjs2');
const path = require('path');
const app = new nova();
const port = 3000;
app.serveStatic('./public')
app.get('/', (req, res) => {
  app.sendFile(path.join(__dirname, 'public/index.html')), res)
});
app.on(404, () => {
    return `<h1>404 - Page Not Found </h1>`;
});
app.at(port, () => {
  console.log(`Nova is running on https:localhost:${port}`);
})
