import React from "react"

function Team(props){
    return (
        <div className="list__team">
            <p className="list__team-title">{props.name}</p>
        </div>
    )
}

export default Team