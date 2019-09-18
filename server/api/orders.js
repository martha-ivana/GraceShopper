const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

// GET ALL ORDERS
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// GET SINGLE ORDER
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

// CREATE NEW GUEST ORDER
// Creating a new cart for an order that is not associated with a user (guest)
router.post('/', async (req, res, next) => {
  try {
    if (!req.body) res.sendStatus(500)
    const {
      address,
      items,
      shippingMethod,
      date,
      gift,
      totalCost,
      checkedOut
    } = req.body
    const newOrder = await Order.create({
      address,
      items,
      shippingMethod,
      date,
      gift,
      totalCost,
      checkedOut
    })
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

// CREATE NEW ORDER FOR USER
// Creating a new cart for an order that has a userId associated with it
router.post('/:userId', async (req, res, next) => {
  try {
    if (!req.body) res.sendStatus(500)
    const {
      address,
      items,
      shippingMethod,
      date,
      gift,
      totalCost,
      checkedOut
    } = req.body
    const newOrder = await Order.create({
      address,
      items,
      shippingMethod,
      date,
      gift,
      totalCost,
      checkedOut
    })
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

// SUBMIT ORDER
// Updates an order after checkout
router.put('/checkout', async (req, res, next) => {
  try {
    let order = await Order.findbyId(req.body.id)
    if (!order) res.sendStatus(404)
    const {
      address,
      items,
      shippingMethod,
      date,
      gift,
      totalCost,
      checkedOut
    } = req.body
    await order.update({
      address,
      items,
      shippingMethod,
      date,
      gift,
      totalCost,
      checkedOut
    })
  } catch (err) {
    next(err)
  }
})

// DELETE ORDER
// Clearing the cart
router.delete('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) res.sendStatus(404)
    await order.destroy
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
