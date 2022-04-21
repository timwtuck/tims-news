import { Link } from "react-router-dom";

const Header = ({user}) => {

    return (
        <section className="header">
            <h1>Tim's News</h1>
            {user? <Link to='/account'>{user}'s Account</Link> 
                : <Link to='/login'>Login</Link>}
        </section>);
}

export default Header;