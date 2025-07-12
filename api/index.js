const nova = require('novaxjs2');
const path = require('path');
const fs = require('fs');
const app = new nova();
const port = 3000;

app.serveStatic('public');
app.setViewEngine('novax', {
  viewsPath: path.join(__dirname, '../public/docs')
})
const docs = ['about', 'installation', 'features', 'usage', 'api-reference', 'plugin-system', 'file-uploads', 'cors', 'middleware', 'templating', 'route-middleware', 'responses', 'error-handling', 'example', 'projects', 'contact', 'static-files', 'file-configuration']
app.get('/', (req, res) => {
  app.sendFile(path.join(__dirname, '../public/index.html'), res)
});
app.get('/docs/:feature', (req, res) => {
  try {
    const target = req.params.feature;
  if(target && docs.includes(target)) {
    const footer = fs.readFileSync(path.join(__dirname, '../public/footer.html'), 'utf8');
    const render = app.render(target, {footer: footer });
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
app.get('/sitemap', (req, res) => {
  const baseUrl = `${req.protocol}://${req.headers.host}`;
  const currentDate = new Date().toISOString();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<url>
  <loc>${baseUrl}/</loc>
  <lastmod>2025-04-24T21:21:19+00:00</lastmod>
</url>`;

  // Add all documentation pages
  docs.forEach(doc => {
    sitemap += `
<url>
  <loc>${baseUrl}/docs/${doc}</loc>
  <lastmod>${currentDate}</lastmod>
</url>`;
  });

  sitemap += `
</urlset>`;

  res.send(sitemap, 'text/xml');
});
app.on(404, () => {
  return fs.readFileSync(path.join(__dirname, '../public/404.html'), 'utf8');
});
app.error((err, req, res) => {
  res.send(fs.readFileSync(path.join(__dirname, '../public/500.html'), 'utf8'));
})
app.at(port, () => {
  console.log(`Nova is running on https:localhost:${port}`);
});
