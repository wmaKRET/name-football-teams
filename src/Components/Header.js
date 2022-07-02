import React from "react"

function Header(props){
    return (
        <header className="header">
            <div className="header__team">
                <p className="header__team-title">Premier League</p>
            </div>
            <div className="header__team disabled">
                <p className="header__team-title">La Liga</p>
            </div>
        </header>
    )
}

export default Header