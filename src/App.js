import React, { Component } from 'react';
import List from './List';
import './App.css';
import STORE from './STORE';

//given resource
/*: for the "Add Random Card" button, this function generates a random new card 
inside the event handler for adding to state*/
const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
  + Math.random().toString(36).substring(2, 4);
  return {
    id, 
    title: 'Random Card ' + id,
    content: 'lorem ipsum',
  }
}

//given resource
/*to remove key value pairs from an object, use this function, which returns a new object*/
function omit(obj, keyToOmit) {
  return Object.defineProperties(obj).reduce(
    (newObj, [key, value]) => key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}


class App extends Component {
  state = {
    store: STORE,
  };

  /*implement the event handlers for the buttons as methods in the App component as it has access to setState.*/
  /*When the "delete" button is clicked on any card, remove all reference of that card from state.*/
  handleDeleteCard = (cardId) => {
    const { lists, allCards} = this.state.store;

    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id !== cardId)
    }));

    //given resource
    //to remove the cardId
    const newCards = omit(allCards, cardId);

    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    })
  };

  /*implement the event handlers for the buttons as methods in the App component as it has access to setState*/
  /*When the "add random card" button is clicked, generate a random card and 
  add it to the state and the appropriate list*/
  handleAddCard = (listId) => {
    const newCard = newRandomCard();

    const newLists = this. state.store.lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cardIds: [...list.cardIds.newCard.id]
        };
      }
      return list;
    })

    this.setState({
      store: {
        lists: newLists,
        allCards: {
          ...this.state.store.allCards,
          [newCard.id]: newCard
        }
      }
    })
  };

  render () {
    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'><h1>Trelloyes</h1></header>
        <div className='App-list'>
          {store.lists.map(list => ( 
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onClickDelete={this.handleDeleteCard}
              onClickAdd={this.handleAddCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
