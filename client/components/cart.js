import React, {Component} from 'react'
import {connect} from 'react-redux'
import SingleCartItem from './SingleCartItem'
import {getCart, checkoutThunk} from '../store/cart'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    //we are currently hard coding in the cartID for testing purposes
    await this.props.getCart(28)
  }

  handleClick() {
    this.props.checkoutThunk()
  }

  render() {
    //the button at the bottom of the page needs to redirect to the checkout form, rather than handleSubmit
    const cart = this.props.cart
    return (
      <div>
        {cart.plants.length && cart.plants.length > 0 ? (
          <div className="cart-container">
            <div className="cart-title">
              <h1>Your Shopping Cart</h1>
            </div>

            {cart.plants.map(plant => (
              <SingleCartItem key={plant.id} item={plant} />
            ))}
            <button type="submit" value="Submit" onClick={this.handleClick}>
              Checkout
            </button>
          </div>
        ) : (
          <div className="cart-container">
            <h2>There are currently no items in the cart.</h2>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})
const mapDispatchToProps = dispatch => ({
  getCart: id => dispatch(getCart(id)),
  checkoutThunk: () => dispatch(checkoutThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
