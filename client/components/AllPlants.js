//Plants component

import React from 'react'
import {connect} from 'react-redux'
import {getAllPlants} from '../store'
import SinglePlant from './SinglePlant'
//also need to import thunk from reducer

class AllPlants extends React.Component {
  componentDidMount() {
    this.props.getAllPlants()
  }
  render() {
    return (
      <div>
        <h1 id="all-plants">All the Plants</h1>
        <div className="plant-container">
          {this.props.plants && this.props.plants.length
            ? this.props.plants.map(plant => (
                <SinglePlant key={plant.id} plant={plant} />
              ))
            : console.log(this.props.plants)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  plants: state.plantReducer.plants
})
const mapDispatchToProps = dispatch => ({
  getAllPlants: () => dispatch(getAllPlants())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllPlants)
