import React, {useState} from "react"
import Header from "./Components/Header"
import Game from "./Components/Game"

function App() {
  const [whichLeague, setWichLeague] = useState(0)

  return (
    <>
      <Header />
      <Game 
        league={whichLeague}
      />
    </>
  )
}

export default App
