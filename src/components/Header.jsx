import { Link } from "react-router-dom";

const Header = () => {

    return (
        <section className="header">
            <h1>Tim's News</h1>
            <Link to='/login'>Login</Link>
        </section>);
}

export default Header;