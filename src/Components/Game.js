import React, { useEffect, useState, useRef } from "react"
import Team from "./Team"

function Game(props) {
    const TIMER_VALUE = 100
    const HOW_MANY_TEAMS = 20

    const [teamsArray, setTeamsArray] = useState([])
    const [inputText, setInputText] = useState('')
    const [timeRemaining, setTimeRemaining] = useState(TIMER_VALUE)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [teamsGuessed, setTeamsGuessed] = useState(0)
    const [isGameOver, setIsGameOver] = useState(false)
    const inputRef = useRef(null)

    const getData = () => {
        fetch('../data.json')
            .then(response => response.json())
            .then(data => setTeamsArray(data[props.league].teams))
            .catch(error => console.log(`Error: ${error}`))
    }

    function handleChange(event){
        const {value} = event.target
        setInputText(value)
    }

    function startGame(){
        getData()
        setIsGameOver(false)
        setTimeRemaining(TIMER_VALUE)
        setIsTimeRunning(true)
        setInputText('')
        inputRef.current.disabled = false
        inputRef.current.focus()
    }

    function endGame(){
        setIsTimeRunning(false)
        setIsGameOver(true)
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

    useEffect(() => {
        if (teamsArray.some(team => team.name === inputText)) {
            setTeamsArray(prevTeamsArray => prevTeamsArray
                .map(team => team.name === inputText 
                        ? {...team, isGuessed: true}
                        : team))
            setInputText('')            
        }
    }, [inputText])

    useEffect(() => {
        const howManyTeamsGuessed = teamsArray.filter(team => team.isGuessed).length
        if (howManyTeamsGuessed === HOW_MANY_TEAMS) endGame()
        setTeamsGuessed(howManyTeamsGuessed)
    }, [teamsArray])

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
                <p>{teamsGuessed}/{HOW_MANY_TEAMS} Guessed</p>
            </div>
            <div className="game__panel">
                <button
                    className="game__panel-btn"
                    onClick={startGame}
                    disabled={isTimeRunning}
                >{isGameOver ? 'RESTART' : 'START'}
                </button>
                <input
                    ref={inputRef}
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