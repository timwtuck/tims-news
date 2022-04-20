import {Link} from 'react-router-dom';

const Article = ({article, cssClass}) => {

    return (
        <section className={cssClass}>
            <h3>{article.title}</h3>
            <p className={`${cssClass}__body`}>{article.body}</p>
            <p className={`${cssClass}__author`}>posted by: {article.author}</p>
            <p className={`${cssClass}__comment-count`}>Comments: {article.comment_count}</p>
            <p className={`${cssClass}__votes`}>votes: {article.votes}</p>
        </section>
    )
}

export default Article;