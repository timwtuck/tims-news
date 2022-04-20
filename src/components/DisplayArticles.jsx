import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'

const Article = ({article}) => {

    return (
        <Link className="article__link" to={`/article/${article.article_id}`}>
            <section className="article">
                <h3>{article.title}</h3>
                <p className="article__body">{article.body}</p>
                <p className="article__author">posted by: {article.author}</p>
                <p className="article__comment-count">Comments: {article.comment_count}</p>
                <p className="article__votes">votes: {article.votes}</p>
            </section>
        </Link>
    )
}



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
            {articles.map(article => <Article key={article.article_id} article={article}/>)}
            <button hidden={toDisplay >= totalCount ? "hidden" : ""} 
                onClick={onDisplayMore}>Display More</button>
        </section>
    );
}

export default DisplayArticles;