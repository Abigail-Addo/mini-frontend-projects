import { Link } from 'react-router-dom'
// import Button from 'react-bootstrap/Button';


const Navbar = () => {

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/add-new-item">
                            Add New Item
                        </Link>
                    </li>
                </ul>


            </nav>

        </>
    )
}

export default Navbar
