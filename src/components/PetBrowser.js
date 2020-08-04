import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  
  mapPets = (pet) =>
  {
    return <Pet pet={pet} onAdoptPet={this.props.onAdoptPet}/>
  }

  render() {
    console.log(this.props.pets)
    return (
      <div className="ui cards">
        {this.props.pets.map(this.mapPets)}
      </div>);
  }
}


export default PetBrowser
