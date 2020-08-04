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

  //when new pet type selected
  onChangeHandler = (e) =>
  {
    const val = e.target.value;

    this.setState({filters: {type: val}});
  }

  //when find pets is clicked
  petClickHandler = () =>
  {
    const url = this.makeUrl();
    console.log("Fetching from url: ", `'${url}'`)
    fetch(url)
    .then(r => r.json())
    .then(json => {this.updatePetsState(json)})  
  }

  //when adopt pet is clicked
  adoptPetHandler = (id) =>
  {
    const newPets = this.state.pets.map(pet => {
      if (pet.id === id)
      {  
        pet.isAdopted = true;
        return pet
      }
      return pet
    })
    this.setState(newPets)
  }

  //set state.pets to the given array
  updatePetsState = (pets) =>
  {
    this.setState({pets: [...pets]})
  }

  //make a fetch url given the state
  makeUrl = () =>
  {
    const type = this.state.filters.type;
    const url = "/api/pets"

    return (this.state.filters.type === "all") ? url : (url + '?type=' + type)
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
              <Filters 
                onChangeType={this.onChangeHandler}
                onFindPetsClick={this.petClickHandler} 
                />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                onAdoptPet={this.adoptPetHandler}
                pets={this.state.pets}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
