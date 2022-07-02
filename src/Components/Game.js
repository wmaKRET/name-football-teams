import React, { useEffect, useState } from "react"
import Team from "./Team"

function Game(props) {
    const TIMER_VALUE = 5

    const [teamsArray, setTeamsArray] = useState([])
    const [inputText, setInputText] = useState('')
    const [timeRemaining, setTimeRemaining] = useState(TIMER_VALUE)
    const [isTimeRunning, setIsTimeRunning] = useState(false)

    const getData = () => {
        fetch('../data.json')
            .then(response => response.json())
            .then(data => setTeamsArray(data[props.league].teams))
            .catch(error => console.log(`Error: ${error}`))
    }

    function handleChange(event){
        const {value} = event.target
        setInputText(value)
        console.log(inputText)
    }

    function startGame(){
        setTimeRemaining(TIMER_VALUE)
        setIsTimeRunning(true)
        setInputText('')
    }

    function endGame(){
        setIsTimeRunning(false)
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
         if (isTimeRunning && timeRemaining > 0){
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
         } else if (timeRemaining === 0) endGame()
    }, [timeRemaining, isTimeRunning])

    const teamElements = teamsArray.map(team => (
        <Team 
            key={team.id_team}
            nr={team.id_team}
            name={team.name}
            isGuessed={team.isGuessed}
        />
    ))

    return (
        <main className="game">
            <div className="game__hud">
                <p>Time Remaining: {timeRemaining}</p>
                <p>0/20 Guessed</p>
            </div>
            <div className="game__panel">
                <button
                    className="game__panel-btn"
                    onClick={startGame}
                    disabled={isTimeRunning}
                >START
                </button>
                <input
                    value={inputText}
                    className="game__panel-input"
                    placeholder="Type here..."
                    onChange={handleChange}
                    disabled={!isTimeRunning}
                />
            </div>
            <div className="game__team-list">
                {teamElements}
            </div>
        </main>
    )
}

export default Game