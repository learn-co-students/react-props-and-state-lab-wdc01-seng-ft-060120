import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChange} onFindPetsClick={this.handleClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdopt} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
        filters: {type: e.target.value}
    })
  }

  handleClick = () => {
    const queryParams = this.state.filters.type
    
    let queryStr;
    if (queryParams != "all") {
      queryStr = `?type=${queryParams}`
    } else {
      queryStr = ''
    }
    let URL = `/api/pets${queryStr}`
    

    fetch(`${URL}`)
      .then(resp => resp.json())
      .then(pets => this.updatePets(pets))
      .catch(console.log)
  }

  updatePets = (pets) => {
    console.log('BEFORE: ', this.state);
    this.setState({
      pets: pets
    })
    console.log("AFTER:", this.state);
  }

  handleAdopt = (petId) => {
    const petIndex = this.state.pets.findIndex(pet => pet.id == petId)
    let newState = [...this.state.pets]
    newState[petIndex] = {...newState[petIndex], isAdopted: !newState[petIndex].isAdopted}
    this.setState({
      pets: newState
    })
  }
}

export default App
