import React, { useState } from "react"
import Team from "./Team"

function Game(){
    return (
        <main className="game">
            <input 
                placeholder="Type here..."
            />

            <div className="game__team-list">
                <Team />
            </div>
        </main>
    )
}

export default Game