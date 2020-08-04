import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
   console.log(this.props)
    const petDiv = this.props.pets.map(pet => ( 
      <Pet pet={pet} onAdoptPet={this.props.onAdoptPet} />
      )
    )

    return <div className="ui cards">{petDiv}
    </div>
  }
}

export default PetBrowser
