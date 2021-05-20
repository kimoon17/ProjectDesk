import './styles.scss';
import {Link} from 'react-router-dom';

export function Navbar() {
    return (
        <nav className="navbar_nav">
            <ul className="navbar_ul">
                <li className="navbar_li"><Link className="navbar_link" to="/">Projects</Link></li>
                <li className="navbar_li"><Link className="navbar_link" to="/tasks">Tasks</Link></li>
            </ul>
        </nav>
    )
}