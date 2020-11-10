import React from 'react'
import {Link} from "react-router-dom"
import Headerstyles from "./header.module.scss"

export default function Header() {
    return (
        <div className={Headerstyles.header}>
            <div>
                <Link to="/">Games</Link>
            </div>
            <div>
                <Link to="/documentation">Documentation</Link>
            </div>
            <div className={Headerstyles.logo}>Reduxoku</div>
        </div>
    )
}
