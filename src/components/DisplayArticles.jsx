import {useState, useEffect} from 'react';
import Article from './Article';
import { Link } from 'react-router-dom';
import { getArticles } from '../api';
import { displayPageStatusFeedback, handleError } from '../utils';

const DisplayArticles = ({query, setParentPageStatus}) => {
  
    const articlesLimit = 5;
    const [articles, setArticles] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [pageStatus, setPageStatus] = useState('loading');
    const [loadMoreStatus, setLoadMoreStatus] = useState('idle');
    
    // initial loading of articles
    useEffect(() => {

        setPageStatus('loading');
        setPage(1);

        // get the query path
        let path = `/articles?sort_by=${query.sortBy}&order=${query.order}&limit=${articlesLimit}`;
        path += query.topic ? `&topic=${query.topic}` : '';
        path += query.author ? `&author=${query.author}` : '';

        // grab the articles, and set states
        getArticles(path)
            .then(res => {
                setArticles(res.articles);
                setTotalCount(res.totalCount);
                setPageStatus('loaded');
                if (setParentPageStatus)
                    setParentPageStatus('loaded');
            })
        .catch((err) => handleError(err, setPageStatus));
    }, [query]);
       
    // loading pagination
    function onDisplayMore(e) {

        setPage(page + 1);
        setLoadMoreStatus('loading');

        let path = `/articles?sort_by=${query.sortBy}&order=${query.order}&limit=${articlesLimit}&p=${page+1}`;
        path += query.topic ? `&topic=${query.topic}` : '';
        path += query.author ? `&author=${query.author}` : '';

        getArticles(path)
            .then(res => {
                setArticles([...articles, ...res.articles]);
                setLoadMoreStatus('idle')
            })
        .catch(() => {
                alert('Could not load more articles, please try again');
                setLoadMoreStatus('idle');
                setPage(page - 1);
        });
    }

    function displayButton() {

        if ((page*articlesLimit) < totalCount && pageStatus === "loaded"){
            const buttonText = loadMoreStatus === 'idle' ? "Display More ???" : "Loading...";
            return <button className="display-more-button" onClick={onDisplayMore}>{buttonText}</button>;
        }
    }

    return (
        <section className="display-articles">
            {displayPageStatusFeedback(pageStatus, 'Topic Not Found')}
            {pageStatus === 'loaded' &&
            <>
                <div className="article-results">
                    {!setParentPageStatus && <h2>{query.topic ? `Showing results for ${query.topic}` : 'Showing all categories'} </h2>}
                    <Link to='/post-article'><button>Post New Article</button></Link>
                </div>
                {articles.map(article => 
                <Link key={article.article_id} className="article__link" to={`/articles/${article.article_id}`}>
                    <Article 
                        cssClass="article-thumbnail" article={article} thumbnail={true}/>
                </Link>)}
                </>
            }
            {displayButton()}
        </section>
    );
}

export default DisplayArticles;