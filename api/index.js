const nova = require('novaxjs2');
const path = require('path');
const fs = require('fs');
const app = new nova();
const port = 3000;

app.setViewEngine('novax', {
  viewsPath: path.join(process.cwd(), '../public')
})

app.serveStatic('public')
app.get('/', (req, res) => {
  app.sendFile(path.join(__dirname, '../public/index.html'), res)
});

app.get('/sitemap', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/xml'})
  res.end(`<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->


<url>
  <loc>https://novaxjs.vercel.app/</loc>
  <lastmod>2025-04-24T21:21:19+00:00</lastmod>
</url>


</urlset>`)
});
app.on(404, async () => {
  return await app.render('404');;
});
app.error(async(err, req, res) => {
  return await app.render('500');;
})
app.at(port, () => {
  console.log(`Nova is running on https:localhost:${port}`);
});
