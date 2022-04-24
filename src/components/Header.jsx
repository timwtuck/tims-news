import { Link } from "react-router-dom";

const Header = ({user, setUser}) => {

    return (
        <section className="header">
            <h1>Tim's News</h1>
            <div className="header__account">
                <Link to='/'>Articles</Link>
                {user?  <>
                            <Link to='/account'>Account</Link> 
                            <Link to='/login' onClick={() => setUser(null)}>Logout</Link>
                        </>
                    :   <Link to='/login'>Login</Link>}
            </div>
        </section>);
}

export default Header;