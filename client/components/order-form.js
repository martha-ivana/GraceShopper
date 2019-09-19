import React from 'react'
import {connect} from 'react-redux'
import {checkoutThunk} from '../store'

class OrderForm extends React.Component {
  constructor() {
    super()
    this.state = {
      address: '',
      shippingMethod: '',
      gift: 'no',
      totalCost: 0,
      checkedOut: false,
      userId: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSelect(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    try {
      event.preventDefault()
      this.props.checkedOut(this.state)
      alert(`Your order has been successfully submitted.`)
      this.setState({
        address: '',
        shippingMethod: '',
        gift: 'no',
        totalCost: 0,
        checkedOut: false,
        userId: null
      })
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <div className="order">
        <h2>Order Checkout</h2>
        <form className="order-form" onSubmit={this.handleSubmit}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={this.state.address}
          />
          <label htmlFor="shippingMethod">Select Shipping Method:</label>
          <label htmlFor="shipping">
            Standard Ground
            <input
              type="radio"
              name="shippingMethod"
              value="Standard Ground"
              checked={this.state.shippingMethod === 'Standard Ground'}
              onChange={this.handleSelect}
            />
          </label>
          <label htmlFor="shipping">
            1-Day
            <input
              type="radio"
              name="shippingMethod"
              value="1-Day"
              checked={this.state.shippingMethod === '1-Day'}
              onChange={this.handleSelect}
            />
          </label>
          <label htmlFor="gift">Is This a Gift?</label>
          <label htmlFor="gift">
            Yes
            <input
              type="radio"
              name="gift"
              value="yes"
              checked={this.state.gift === 'yes'}
              onChange={this.handleSelect}
            />
          </label>
          <label htmlFor="gift">
            No
            <input
              type="radio"
              name="gift"
              value="no"
              checked={this.state.gift === 'no'}
              onChange={this.handleSelect}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  checkedOut: cart => dispatch(checkoutThunk(cart))
})
const mapStateToProps = state => ({
  order: state.order
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
