import React, { useState } from 'react';
import Img_mov from '../Components/Img-mov/Img_mov';
import Logo_info from '../Components/Logo_info/Logo_info';
import Last from '../Components/Footer/Footer';
import Contact from '../Components/contact/Contact';
import TodoApp from '../Components/todo/TodoApp';
import Todo_btn from '../Components/todo-btn/Todo_btn';
import InternshipSearch from '../Components/FindUs/FindUs'
import Marquee_page from '../Components/Marqueee/Marquee_page';
import PastIntern from '../Components/Home/pastIntern';
import InternSeva from '../Components/Home/home'
import Chatbot from '../Components/chatbot/Chatbot'
import Sugg_card from '../Components/suggestion card/Sugg_card';
// import Navbar from '../Components/Navbar/Navbar';
const Home = ({user}) => {
  const [showTodo, setShowTodo] = useState(false);
  const [todos, setTodos] = useState([]); // state moved here

  const openTodo = () => setShowTodo(true);
  const closeTodo = () => setShowTodo(false);

  return (
    <div >
      <Logo_info user={user} />
      {/* <Navbar setShowLogin={setShowLogin} /> */}
      {/* <Img_mov /> */}
      <InternshipSearch/>
      <InternSeva></InternSeva>
      <PastIntern></PastIntern>
      <Sugg_card></Sugg_card>
      <Marquee_page />
      {/* <Contact /> */}
      <Last />

      {/* floating button */}
      <Todo_btn onOpen={openTodo} />

      {/* popup */}
      {showTodo && (
        <TodoApp
          todos={todos}
          setTodos={setTodos}
          onClose={closeTodo}
        />
      )}
      <Chatbot />
    </div>
  );
};

export default Home;
