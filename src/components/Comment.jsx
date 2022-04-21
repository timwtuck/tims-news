
const Comment = ({comment, user, deleteComment}) => {

    return (
        <section className="comment">
            <p className="comment__author">Posted by: {comment.author}</p>
            <p className="comment__body">{comment.body}</p>
            <div className="comment__votes">
                <button>↑</button>
                <p>votes: {comment.votes}</p>
                <button>↓</button>
            </div>
            {user===comment.author && <button className="comment__delete"
                onClick={() => deleteComment(comment.comment_id)}>delete</button>}
        </section>
    )
}

export default Comment;