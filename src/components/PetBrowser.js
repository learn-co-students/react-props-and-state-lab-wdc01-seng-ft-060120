import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  constructor(props) {
    super()
    this.onAdoptPet = props.onAdoptPet;
  }
  
  render() {
    return <div className="ui cards">{this.genPets(this.props.pets)}</div>
  }

  genPets = (pets) => {
    return pets.map(pet => <Pet onAdoptPet={this.onAdoptPet} key={pet.id} pet={pet} /> )
  }
}

export default PetBrowser
