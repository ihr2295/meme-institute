// src/context/MemeContext.js
import React, { createContext, useReducer, useContext } from 'react';
import { fetchMemes } from '../api';

const MemeContext = createContext();

const memeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEMES':
      return { ...state, memes: action.payload };
    default:
      return state;
  }
};

export const MemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(memeReducer, { memes: [] });

  useEffect(() => {
    fetchMemes().then(response => {
      dispatch({ type: 'SET_MEMES', payload: response.data });
    });
  }, []);

  return (
    <MemeContext.Provider value={{ state, dispatch }}>
      {children}
    </MemeContext.Provider>
  );
};

export const useMemes = () => useContext(MemeContext);
