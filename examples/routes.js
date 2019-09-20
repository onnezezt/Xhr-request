const express = require('express')
const router = express.Router()
const atob = require('atob')

router.post('/more/post', function(req, res) {
  const auth = req.headers.authorization
  const [type, credentials] = auth.split(' ')
  console.log(atob(credentials))
  const [username, password] = atob(credentials).split(':')
  if (type === 'Basic' && username === 'Yee' && password === '123456') {
    res.json(req.body)
  } else {
    res.end('UnAuthorization')
  }
})
router.get('/more/304', function(req, res) {
  res.status(304)
  res.end()
})
router.post('/more/upload', function(req, res) {
  console.log(req.body, req.files)
  res.end('upload success!')
})

router.get('/more/get', function(req, res) {
  res.json({
    msg: `hello world`
  })
})
router.get('/cancel/get', function(req, res) {
  res.json({
    msg: `hello world`
  })
})
router.get('/simple/get', function(req, res) {
  res.json({
    msg: `hello world`
  })
})
router.get('/base/get', function(req, res) {
  res.json(req.query)
})

router.post('/base/post', function(req, res) {
  res.json(req.body)
})

router.post('/base/buffer', function(req, res) {
  let msg = []
  req.on('data', chunk => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})
router.get('/error/get', function(req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})

router.get('/interceptor/get', function(req, res) {
  res.json({
    msg: `hello world`
  })
})

router.get('/config/post', function(req, res) {
  res.json({
    msg: `hello world`
  })
})
module.exports = router
