import { Link } from "react-router-dom";

const Account = ({user}) => {

    return (
        <>
            <h2>Hello {user}!</h2>
            <Link to='/'>Home Page</Link>
        </>
    )
}

export default Account;