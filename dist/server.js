app.get('*', (req, res) => {
  const context = { url: req.url }
  renderer.renderToString(context, (error, html) => {
    if (error) return res.send(error.stack)
    const {
      title, htmlAttrs, bodyAttrs, link, style, script, noscript, meta
    } = context.meta.inject()
    return res.send(`
      <!doctype html>
      <html data-vue-meta-server-rendered ${htmlAttrs.text()}>
        <head>
          ${meta.text()}
          ${title.text()}
          ${link.text()}
          ${style.text()}
          ${script.text()}
          ${noscript.text()}
        </head>
        <body ${bodyAttrs.text()}>
          ${html}
          <script src="/assets/vendor.bundle.js"></script>
          <script src="/assets/client.bundle.js"></script>
        </body>
      </html>
    `)
  })
})
