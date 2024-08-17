import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authAction';
import { useHistory } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    history.push('/GameBoard');
  }



  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
