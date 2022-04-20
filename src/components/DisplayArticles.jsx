import {useState, useEffect} from 'react';
import Article from './Article';
import { Link } from 'react-router-dom';
import { getArticles } from '../api';

const DisplayArticles = ({query}) => {

    const articlesLimit = 5;
    const [articles, setArticles] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [toDisplay, setToDisplay] = useState(articlesLimit);
    
    useEffect(() => {

        // get the query path
        let path = `/articles?sort_by=${query.sortBy}&order=${query.order}&limit=${toDisplay}`;
        path += query.topic ? `&topic=${query.topic}` : '';

        // grab the articles, and set states
        getArticles(path)
            .then(res => {
                setArticles(res.articles);
                setTotalCount(res.total_count);
            });
    }, [query, toDisplay]);

    function onDisplayMore(e) {
        setToDisplay(toDisplay + articlesLimit);
    }

    return (
        <section className="display-articles">

            {articles.map(article => 
                <Link key={article.article_id} className="article__link" to={`/articles/${article.article_id}`}>
                    <Article 
                        cssClass="article-thumbnail" article={article} thumbnail={true}/>
                </Link>)}

            <button hidden={toDisplay >= totalCount ? "hidden" : ""} 
                onClick={onDisplayMore}>Display More</button>

        </section>
    );
}

export default DisplayArticles;