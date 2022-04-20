import {useState, useEffect} from 'react';

const Article = ({article}) => {

    return (
        <section className="article" data-id={article.article_id}>
            <h3>{article.title}</h3>
            <p className="article__body">{article.body}</p>
            <p className="article__author">posted by: {article.author}</p>
            <p className="article__comment-count">Comments: {article.comment_count}</p>
            <p className="article__votes">votes: {article.votes}</p>
        </section>
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
            {articles.map(article => <Article article={article}/>)}
            <button hidden={toDisplay >= totalCount ? "hidden" : ""} 
                onClick={onDisplayMore}>Display More</button>
        </section>
    );
}

export default DisplayArticles;