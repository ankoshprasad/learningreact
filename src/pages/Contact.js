import React from 'react';
import ReactDOM from 'react-dom/client';


class contact extends React.Component {

  constructor(props) {
    super(props);
    this.state = { favoritecolor: "red" };
  }

  render() {
    const shoot = (a) => {
      alert(a);
    }
    const items = [
      { id: 1, name: 'bread' },
      { id: 2, name: 'milk' },
      { id: 3, name: 'eggs' }
    ];
    return (
      <>
        <div>
          <h1>My Favorite Color is {this.state.favoritecolor}</h1>
          <div id="div1"></div>
          <div id="div2"></div>
          <button onClick={() => shoot("Goal!")}>Take the shot!</button>
        </div>
        <h1>Grocery List</h1>
        <ul>
          {items.map((item) => <li
            key
            ={item.id}>{item.name}</li>)}
        </ul>
      </>
    );
  }
}

export default contact;

