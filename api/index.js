const nova = require('novaxjs2');
const path = require('path');
const fs = require('fs');
const app = new nova();
const port = 3000;

app.serveStatic();
app.setViewEngine('novax', {
  viewsPath: path.join(__dirname, '../public/docs')
})
const docs = ['about', 'installation', 'features', 'usage', 'api-reference', 'plugin-system', 'file-uploads', 'cors', 'middleware', 'templating', 'route-middleware', 'responses', 'error-handling', 'example', 'projects', 'contact', 'static-files', 'file-configuration', 'app']
app.get('/', async (req, res) => {
  res.send(await app.render('index'))
});

app.get('/docs/:feature', (req, res) => {
  try {
    const target = req.params.feature;
  if(target && docs.includes(target)) {
    if(target === 'plugin-system') app.minifier = false;
    const render = app.render(target);
    if(render) {
      return render;
    } else {
      res.send('Rendering error please try again')
    }
  } else {
    res.redirect('/404.html')
  }
  } catch(err) {
    res.send(err)
  }
})
app.on(404, (err, req, res) => {
  return fs.readFileSync(path.join(__dirname, '../public/404.html'), 'utf8');
});
app.on(500, (err, req, res) => {
  console.log(err)
  return fs.readFileSync(path.join(__dirname, '../public/500.html'), 'utf8');
})
app.error((err, req, res) => {
  console.log(err)
})
app.at(port, () => {
  console.log(`Novax is running on https:localhost:${port}`);
});
