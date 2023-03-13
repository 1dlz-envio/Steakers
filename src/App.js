import React from 'react';
import { useState, useEffect } from 'react';
import { randomColor } from 'randomcolor';
import Draggable from 'react-draggable';
import './App.css';

const App = () => {

  const [item, setItem] = useState(''); //зберігаємо окрему нотатку
  debugger
  const [items, setItems] = useState(

    JSON.parse(localStorage.getItem('Items')) || []
  ) // парсимо в стейт масив з локал стореджа або якщо він породній створюємо новий масив

  useEffect(
    () => {
      localStorage.setItem('items', JSON.stringify(items))
    }, [items]
  ) //при зміні items usaeEffect відправляє items в localStorage та перемальовує сторінку

  const newItem = () => {
    if (item.trim() !== '') {
      const newItem = {
        id: items.length + 1,
        item: item,
        color: randomColor({
          luminosity: 'light'
        }
        ),
        defautPos: {
          x: -100,
          y: -100,
        }
      };
      setItems((items) => [...items, newItem]); //копіюємо масив items та додаємо в нього newItems
      setItem('')
    } else {
      alert('You are not enter any word... Write something')
      setItem('')
    }
  } // функція котра створює новий об'єкт з введеного значення в input  

  const deleteItem = (id) => {
    let newItems = [...items].filter(item => item.id !== id);
    setItems(newItems);
  } //функція, що приймає значення id з item на котрий натиснули. Копіює масив items за виключенням item з id на котрий натиснули.

  const updatePos = (data, index) => {
    const newArray = [...items];
    newArray[index].defautPos = { x: data.x, y: data.y }
    setItems(newArray);
  }

  const keyPress = (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      newItem();
    }
  }


  return (
    <div className='App'>
      <section className='wrapper'>
        <input type='text' value={item}
          className='input'
          placeholder='Enter something...'
          onChange={(e) => { setItem(e.target.value) }} onKeyDown={(e) => keyPress(e)}></input>
        <button className='button' onClick={newItem}>Enter</button>
      </section>
      {
        items.map((item, index) => {
          return (
            <Draggable key={index} defaultPosition={item.defautPos} onStop={(_, data) => { updatePos(data, index) }}>
              <div className='todo__item' style={{ backgroundColor: item.color }}>
                {`${item.item}`}
                <button className='delete' onClick={() => deleteItem(item.id)}>
                  X
                </button>
              </div>
            </Draggable>
          )
        })
      }
    </div>
  )
}

export default App;
