import React, { useState, useEffect, useContext} from "react";
import { ThemeContext, themes } from "./ThemeContext";


// Wrapper component to provide context
//Passing in the function that updates current theme of the app
function ToggleTheme({setCurrentTheme}: {setCurrentTheme:any}) {
    //Get the current theme
    const currentTheme = useContext(ThemeContext);
   
    //Changes the theme
    const toggleTheme = () => {
      setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };
   
    return (
      //Everything Provider wraps around can access currentTheme through useContext
      <ThemeContext.Provider value={currentTheme}>
        <button onClick={toggleTheme}> Toggle Theme </button>
        {/* <ClickCounter /> */}
      </ThemeContext.Provider>
    );
   }
   
export default ToggleTheme;



export function ClickCounter() {
    //React re-renders the component whenever setClickCount is called
    const [count, setCount] = useState(0);
  
    const handleClick = () => {
        setCount(count + 1)
    };

    useEffect(() => {
        document.title = `You clicked ${count} times`; //document title is shown at the tab
    }, [count]);
  
    //To access the current theme
    const theme = useContext(ThemeContext);
    return (
       <div
         style={{
           background: theme.background,
           color: theme.foreground,
           padding: "20px",
         }}
       >
         <p>You clicked {count} times </p>
         <button
           onClick={() => setCount(count + 1)}
           style={{ background: theme.foreground, color: theme.background }}
         >
           Click me
         </button>
       </div>
     );
  }



