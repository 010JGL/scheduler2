import { useState } from "react";

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  
  // need history to compare states
  const [history, setHistory] = useState([initial]); 

  function transition(newMode, replace = false) {
    
    if(replace){
      setHistory(prev => prev.slice(0, -1));
      setHistory(prev => [...prev, newMode]);
      }else{
        setHistory(prev => [...prev, newMode]); 
      }
      setMode(newMode);
  }


  function back() {
    if(history.length > 1) {
      setHistory(history.slice(0, -1));
      setMode(history[history.length-2]);
    }
  }

  return { mode, transition, back};
}