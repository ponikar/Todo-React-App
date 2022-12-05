import React, { useState, useEffect } from 'react';
import {
  AppStyles,
  HeaderStyles,
  FormStyles,
  ButtonStyles,
} from './App.styles';
import ListItems from './ListItems';
import swal from 'sweetalert';
import Footer from './Footer/Footer';

const App = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({ text: '', key: '' });

  // this is where persistance is done in local storage .....
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
      const data = await (await fetch("https://jsonplaceholder.typicode.com/todos"));
      setItems(data.map(d => ({ ...d, text: d.title, key: d.id })));
  }

  useEffect(() => {
    localStorage.setItem('todoslist', JSON.stringify(items));
  });

  const handleInput = (e) => {
    setCurrentItem({
      text: e.target.value,
      key: Date.now(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentItem.text === '') {
      swal('Oops!', 'Please enter some text!', 'error');
    } else {
      const checkItem = currentItem;
      setItems([...items, checkItem]);
      setCurrentItem({ text: '', key: '' });
    }
  };

  const deleteItems = (key) => {
    const filteredItems = items.filter((item) => item.key !== key);
    setItems(filteredItems);
  };

  return (
    <>
      <AppStyles>
        <HeaderStyles>
          <form className='to-do-form' onSubmit={handleSubmit}>
            <FormStyles
              type='text'
              placeholder='Add Tasks...'
              value={currentItem.text}
              onChange={handleInput}
            />
            <ButtonStyles type='submit'>Add</ButtonStyles>
          </form>
        </HeaderStyles>
        <ListItems items={items} deleteItems={deleteItems} />
      </AppStyles>
      <Footer />
    </>
  );
};
export default App;
