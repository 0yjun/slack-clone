import Login from '@pages/Login';
import SignUp from '@pages/SignUp';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  console.log('hello');
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/next" element={<SignUp />} />
    </Routes>
  );
};

export default App;
