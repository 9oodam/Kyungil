import './App.css';
import Top from './components/Top'
import Middle from './components/Middle'
import Bottom from './components/Bottom'
import React, {useState, useEffect} from 'react'

function App() {
  const [activeC, setActiveC] = useState("off");
  const [activeL, setActiveL] = useState("off");

  function isActiveC() {
    if(activeC == "off") {
        setActiveC("on");
    }else {
        setActiveC("off");
    }
  }

  function isActiveL() {
    if(activeL == "off") {
        setActiveL("on");
    }else {
        setActiveL("off");
    }
  }

  useEffect(() => {
    console.log("color mark : ", activeC);
  }, [activeC])

  useEffect(() => {
    console.log("lunar date : ", activeL);
  }, [activeL])

  return (
    <div className="App">
      <div className="Container">
        <header className="App-header">
          <Top isActiveC={isActiveC} activeC={activeC} isActiveL={isActiveL} activeL={activeL} />
        </header>

        <div className="App-body">
          <Middle activeC={activeC} activeL={activeL} />
        </div>

        <footer className="App-footer">
          <Bottom />
        </footer>
      </div>
    </div>
  );
}

export default App;
