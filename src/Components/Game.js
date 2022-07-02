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
            name={team.name}
            isGuessed={team.isGuessed}
        />
    ))

    return (
        <main className="game">
            <input
                placeholder="Type here..."
            />
            <div className="game__team-list">
                {teamElements}
            </div>
        </main>
    )
}

export default Game