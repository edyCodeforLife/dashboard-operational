require('dotenv').config({ path: './.env' })
const { parse } = require('url')
const next = require('next')
const express = require('express')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.disable('x-powered-by')

  server
    .all('*', (req, res) => {
      res.setHeader('X-Powered-By', 'AlteaCare 1.0')
      const parsedUrl = parse(req.url, true)

      if (req.url.includes('.html')) {
        return res.redirect(301, req.url.replace('.html', ''))
      }

      const [path, query = ''] = req.url.split('?')
      if (path.endsWith('/') && path.length > 1) {
        const pathWithoutTrailingSlash =
          path.replace(/\/*$/gim, '') + (query ? `?${query}` : '')

        return res.redirect(301, pathWithoutTrailingSlash)
      }
      handle(req, res, parsedUrl)
    })
    .listen(port, (err) => {
      if (err) {
        throw err
      }

      console.log(`> Ready on http://localhost:${port}`)
    })
})
