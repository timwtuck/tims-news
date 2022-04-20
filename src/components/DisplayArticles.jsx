import {useState, useEffect} from 'react';
import Article from './Article';
import { Link } from 'react-router-dom';

const DisplayArticles = ({api, query}) => {

    const articlesLimit = 5;
    const [articles, setArticles] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [toDisplay, setToDisplay] = useState(articlesLimit);
    
    useEffect(() => {
        let path = `/articles?sort_by=${query.sortBy}&order=${query.order}&limit=${toDisplay}`;
        path += query.topic ? `&topic=${query.topic}` : '';

        api.get(path)
            .then(res => {
                setArticles(res.data.articles);
                setTotalCount(res.data.total_count);
            });
    }, [query, toDisplay]);

    function onDisplayMore(e) {
        setToDisplay(toDisplay + articlesLimit);
    }

    return (
        <section className="display-articles">

            {articles.map(article => 
                <Link className="article__link" to={`/articles/${article.article_id}`}>
                    <Article key={article.article_id} 
                        cssClass="article-thumbnail" article={article}/>
                </Link>)}

            <button hidden={toDisplay >= totalCount ? "hidden" : ""} 
                onClick={onDisplayMore}>Display More</button>

        </section>
    );
}

export default DisplayArticles;