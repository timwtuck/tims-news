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

    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
        let path = `/articles?sort_by=${query.sortBy}&order=${query.order}`;
        path += query.topic ? `&topic=${query.topic}` : '';

        api.get(path)
            .then(res => setArticles(res.data.articles));
    }, [query])

    return (
        <section className="display-articles">
            {articles.map(article => <Article article={article}/>)}
        </section>
    );
}

export default DisplayArticles;