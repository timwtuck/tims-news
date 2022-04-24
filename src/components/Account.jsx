import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import { getArticleByUser } from "../api";
import DisplayArticles from "./DisplayArticles";

const Account = ({user, setUser}) => {

    const [pageStatus, setPageStatus] = useState('loading');

    return (
        <main className="account-page">
            <h2 className="generic-banner">Hello {user}!</h2>
            {pageStatus === 'loaded' &&
            <>
                <section className="account-info">
                    <p>Username: {user}</p>
                    <p>Password: ********</p>
                    <p>Total Articles: </p>
                    <Link to='/login' onClick={() => setUser(null)}><button>Logout</button></Link>
                </section>
            </>}
            <section className="account-articles">
                {pageStatus === 'loaded' && <h2>My Articles: </h2>}
                <DisplayArticles query={{
                    author:user,
                    sortBy: 'votes',
                    order:'desc'
                    }} setParentPageStatus={setPageStatus}/>
            </section>
        </main>
    )
}

export default Account;