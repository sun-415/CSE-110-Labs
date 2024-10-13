import React from 'react';

//Create the context
export const themes = { //themes object defines two theme
 light: {
   //uses dark text on light background
   foreground: '#000000',
   background: '#eeeeee',
 },
 dark: {
   //uses light text on dark background
   foreground: '#ffffff',
   background: '#222222',
 },
};

//Created to pass theme data 
export const ThemeContext = React.createContext(themes.light);