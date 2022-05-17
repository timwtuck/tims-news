import { useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import { getUsers } from "../api";

const Login = ({setUser}) => {

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getUsers()
            .then(users => setUsers(users));
    }, []);

    function onLogin(e) {
        e.preventDefault();

        const usersArr = users.map(user => user.username);

        if (!usersArr.includes(username)){
            setErrMsg('Username doesn\'t exist');
            return;
        }

        setUser(username);
        navigate('/account');
    }
    
    return (
        <>
        <h2 className="generic-banner">Login: </h2>
        <main className="login__main">
            <form className="login__form" onSubmit={onLogin}>
                <label className="login__form-username-label" htmlFor="username">Username: </label>
                <input className="login__form-username" value={username} onChange={(e)=> {setUsername(e.target.value); setErrMsg('');}} 
                    type="text" name="username" id="username"/>
                {/* <label className="login__form-password-label" htmlFor="password">Password: </label>
                <input className="login__form-password" value={password} onChange={(e)=>{setPassword(e.target.value); setErrMsg('');}} 
                    type="text" name="password" id="password"/> */}
                <button className="login__form-button">Login</button>
                <p className="login__form-error">{errMsg}</p>
            </form>
        </main>
        </>
    )

}

export default Login;