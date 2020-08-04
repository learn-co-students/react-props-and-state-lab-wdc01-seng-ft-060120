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

  onChangeType = ({target: { value }}) => { 
    this.setState({
      filters: {...this.state.filters, type: value
      }
    })
  }

  onFindPetsClick = () => {
    let url = '/api/pets';

    if (this.state.filters.type !== 'all'){
      url += `?type=${this.state.filters.type}`
    }
    
    fetch(url)
    .then(resp => resp.json())
    .then(returnValues => {
      this.setState({pets: returnValues})
    })
  }

  onAdoptPet = (id) => {
    const newPet = this.state.pets.map(pet => {
      return pet.id === id ? {...pet, isAdopted: true} : pet//if true set's isAdopted prop to :true, if not then returns just the pet?
    })
    this.setState({pets: newPet})
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
              <Filters onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
