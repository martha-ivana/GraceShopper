const User = require('./user')
const Plant = require('./plant')
const Order = require('./order')
const PlantOrder = require('./plantOrder')

//Associations
//User to orders, one to many
Order.belongsTo(User)
User.hasMany(Order)
//Orders to plants, many to many

Order.belongsToMany(Plant, {
  through: PlantOrder,
  foreignKey: 'orderId',
  otherKey: 'plantId'
})
Plant.belongsToMany(Order, {
  through: PlantOrder,
  foreignKey: 'plantId',
  otherKey: 'orderId'
})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Plant,
  Order,
  PlantOrder
}
