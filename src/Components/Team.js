import React from "react"

function Team(props){
    return (
        <div className="game__team-list-item">
            <p>{props.nr}.&nbsp;</p>
            <p className={props.isGuessed 
                            ? "showTeamName" 
                            : props.isGameOver 
                                ? "showTeamNameGameOver"
                                : "hideTeamName"
            }>
                {props.name}
            </p>
        </div>
    )
}

export default Team