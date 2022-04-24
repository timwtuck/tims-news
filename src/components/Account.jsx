import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import { getArticleByUser } from "../api";
import DisplayArticles from "./DisplayArticles";

const Account = ({user}) => {

    const articlesLimit = 5;
    const [articles, setArticles] = useState([]);
    const [totalCount, setTotalCount] = useState([]);
    const [page, setPage] = useState(1);
    const [pageStatus, setPageStatus] = useState('loading');
    const [loadMoreStatus, setLoadMoreStatus] = useState('idle');

    return (
        <main className="account-page">
            <h2 className="account-banner">Hello {user}!</h2>
            {pageStatus === 'loaded' &&
            <>
                <section className="account-info">
                    <p>Username: {user}</p>
                    <p>Password: ********</p>
                    <p>Total Articles: </p>
                    <button>Logout</button>
                </section>
            </>}
            <section className="account-articles">
                {pageStatus === 'loaded' && <h3>My Articles: </h3>}
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