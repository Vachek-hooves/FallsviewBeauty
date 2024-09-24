import {useState, useEffect, useContext, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FallsContext = createContext({});

export const FallsProvider = ({children}) => {
  const value = {};

  return (
    <FallsContext.Provider value={value}>{children}</FallsContext.Provider>
  );
};

export const useCustomContext = () => {
  const thisContext = useContext(FallsContext);
  return thisContext
    ? thisContext
    : (() => {
        throw new Error('context using error');
      })();
};
