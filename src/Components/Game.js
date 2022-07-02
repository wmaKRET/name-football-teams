import React, { useEffect, useState } from "react"
import Team from "./Team"

function Game(props) {
    const [teamsArray, setTeamsArray] = useState([])

    const getData = () => {
        fetch('../data.json')
            .then(response => response.json())
            .then(data => setTeamsArray(data[props.league].teams))
            .catch(error => console.log(`Error: ${error}`))
    }

    useEffect(() => {
        getData()
    }, [])

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
            <div className="game__panel">
                <button
                    className="game__panel-btn"
                >START
                </button>
                <input
                    className="game__panel-input"
                    placeholder="Type here..."
                />
            </div>
            <div className="game__team-list">
                {teamElements}
            </div>
        </main>
    )
}

export default Game