import axios from 'axios'
import {runInNewContext} from 'vm'

// ACTION TYPES
const GET_CART_ITEMS = 'GET_CART_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CLEAR_CART = 'CLEAR_CART'
const CREATE_CART = 'CREATE_CART'
const EDIT_ITEM = 'EDIT_ITEM'

// INITIAL STATE
const defaultCart = {
  orderId: null,
  plants: []
}

// ACTION CREATORS

const getCartItems = cart => ({
  type: GET_CART_ITEMS,
  cart
})

export const addItem = cartItem => ({
  type: ADD_ITEM,
  cartItem
})

const removeItem = plantId => ({
  type: REMOVE_ITEM,
  plantId
})

export const clearMyCart = cart => ({
  type: CLEAR_CART,
  cart
})

export const createCart = cart => ({
  type: CREATE_CART,
  cart
})

const editedItem = plant => ({
  type: EDIT_ITEM,
  plant
})

// THUNK CREATORS

// getCart Thunk
export const getCart = () => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/cart`)
    dispatch(getCartItems(res.data))
  } catch (err) {
    console.log('there was an error getting the cart', err)
  }
}

//addItem Thunk
export const addItemThunk = (plant, qty) => async dispatch => {
  try {
    plant.orderQty = Number(qty)
    const res = await axios.post(`/api/orders/add/`, plant)
    dispatch(addItem(res.data))
  } catch (err) {
    console.log('there was an error adding an item', err)
  }
}

// removeItem Thunk
export const removeItemThunk = plant => async dispatch => {
  try {
    plant.orderQty = 0
    const res = await axios.post(`/api/orders/remove/`, plant)

    dispatch(removeItem(res.data))
  } catch (err) {
    console.log('there was an error removing an item', err)
  }
}

//createCart Thunk
export const createCartThunk = () => async dispatch => {
  //guest
  try {
    const res = await axios.post('/api/orders/', defaultCart)
    dispatch(createCart(res.data))
  } catch (err) {
    console.log('there was an error creating a cart', err)
  }
}

//clearCart Thunk
export const clearCart = () => async dispatch => {
  try {
    const res = await axios.post(`/api/orders/clear/`)
    dispatch(clearMyCart(res.data))
  } catch (err) {
    console.log('there was an error clearing the cart', err)
  }
}

//editItem Thunk

export const editItem = (plant, qty) => async dispatch => {
  try {
    plant.orderQty = Number(qty)
    const res = await axios.post('/api/orders/edit/', plant)
    dispatch(editedItem(res.data))
  } catch (err) {
    console.log('there was an error editing the item', err)
  }
}

// REDUCER

const cart = (state = defaultCart, action) => {
  switch (action.type) {
    case GET_CART_ITEMS: {
      return {
        ...state,
        plants: [...action.cart.plants]
      }
    }
    case ADD_ITEM: {
      return {
        ...state,
        plants: [...state.plants, action.cartItem]
      }
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        plants: state.plants.filter(
          plant => plant.id !== Number(action.plantId)
        )
      }
    }
    case CLEAR_CART: {
      return {
        ...defaultCart,
        orderId: action.cart.id
      }
    }
    case CREATE_CART: {
      return {
        ...state,
        orderId: action.cart.id
      }
    }
    case EDIT_ITEM: {
      return {
        ...state,
        plants: [
          ...state.plants.filter(plant => plant.id !== action.plant.id),
          action.plant
        ]
      }
    }
    default: {
      return state
    }
  }
}

export default cart
