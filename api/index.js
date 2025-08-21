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
app.get('/', (req, res) => {
  app.sendFile(path.join(__dirname, '../public/index.html'), res)
});
const posts = [
  {
    id: "1",
    title: "Hello Novax!",
    content: "This is my very first post using Novaxjs2 🚀",
    author: "Admin",
    createdAt: "2025-08-21T09:00:00Z"
  },
  {
    id: "2",
    title: "Getting Started",
    content: "Novaxjs2 makes building web apps super simple with built-in routing and templates.",
    author: "Jane Doe",
    createdAt: "2025-08-21T10:15:00Z"
  },
  {
    id: "3",
    title: "Why Novax?",
    content: "Because it’s lightweight, modern, and designed for both frontend and backend flexibility.",
    author: "John Smith",
    createdAt: "2025-08-21T11:30:00Z"
  }
];

app.get('/docs/:feature', (req, res) => {
  try {
    const target = req.params.feature;
  if(target && docs.includes(target)) {
    const footer = fs.readFileSync(path.join(__dirname, '../public/footer.html'), 'utf8');
    const render = app.render(target, {footer: footer, posts: posts });
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
  console.log(`Nova is running on https:localhost:${port}`);
});
console.log(app)