const createServer = (action) => {
  const http = require('http')

  const hostname = '127.0.0.1'
  const port = 3000

  const domain = require('domain')
  const server = http.createServer((req, res) => {
    const d = domain.create()
    d.on('error', (e) => {
      res.statusCode = 500
      res.end(e)
    })
    d.run(() => action(req, res))
  })

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
  })

  process.on('uncaughtException', (e) => console.log(e))
}

createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello wWorld\n')
})