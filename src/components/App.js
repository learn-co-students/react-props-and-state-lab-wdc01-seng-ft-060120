import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  updateState = (data, type) => {
    this.setState({
      pets: [...data],
      filters: {
        type: type,
      },
    });
  };

  onChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value,
      },
    });
  };

  onFindPetsClick = () => {
    console.log("button clicked");

    let type = this.state.filters.type;

    if (type === "cat") {
      type = "?type=cat";
    } else if (type === "dog") {
      type = "?type=dog";
    } else if (type === "micropig") {
      type = "?type=micropig";
    }

    fetch("/api/pets" + type)
      .then((resp) => resp.json())
      .then((pets) => {
        this.setState({
          pets: [...pets],
        });
      });
  };

  onAdoptPet = (petId) => {
    console.log("this is the pet id:", petId);
    console.log("PETS BEFORE MAP", this.state.pets);

    let updatedPetsList = this.state.pets.map((pet) => {
      if (pet.id === petId) {
        pet.isAdopted = true;
        return pet;
      } else {
        return pet;
      }
    });

    this.setState({
      pets: updatedPetsList,
    });
  };

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
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
