import './styles.scss';
import {NavLink} from 'react-router-dom';

export function Navbar() {
    return (
        <nav className="navbar_nav">
            <ul className="navbar_ul">
                <li className="navbar_li"><NavLink className="navbar_link" exact to="/" activeClassName="selected">Projects</NavLink></li>
                <li className="navbar_li"><NavLink className="navbar_link" to="/tasks" activeClassName="selected">Tasks</NavLink></li>
            </ul>
        </nav>
    )
}