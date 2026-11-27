import React, { useContext, createContext } from 'react';
export const h = React.createElement;
export const C = createContext();
export const use = () => useContext(C);
export const A = n => '/assets/' + n + '.jpg';
