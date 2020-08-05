import React from "react"

class Pet extends React.Component {
  render() {
    const { id: petId, age, weight, name, type, gender, isAdopted} = this.props.pet
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {gender === "male" ? "♂ " : "♀ "}
            {name}
          </a>
          <div className="meta">
            <span className="date">{type}</span>
          </div>
          <div className="description">
            <p>Age: {age}</p>
            <p>Weight: {weight} pounds</p>
          </div>
        </div>
        <div className="extra content">
          {isAdopted === false ?
          <button onClick={() => this.props.onAdoptPet(petId)} className="ui primary button" > Adopt pet </button> :
          <button className="ui disabled button">Already adopted</button>
          }
        </div>
      </div>
    )
  }
}

export default Pet