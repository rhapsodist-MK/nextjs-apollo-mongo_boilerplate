import express from 'express'
const router = express.Router()

router.get('/', async (req, res, next) => {
  req.target_nextApp = '/about/about'
  next()
})

module.exports = router