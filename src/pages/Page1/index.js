import React from 'react'
import { ROOT } from 'navigation/CONSTANTS'
import { Link } from 'react-router-dom'

//export {Math as default} from "./Math";
export const Page1 = () => {
    return (
        <div>
            <Link to={ROOT}>Home</Link>
        </div>
    )
}
