

const Comment = ({comment}) => {

    return (
        <section className="comment">
            <p className="comment__author">Posted by: {comment.author}</p>
            <p className="comment__body">{comment.body}</p>
            <div className="comment__votes">
                <button>↑</button>
                <p>votes: {comment.votes}</p>
                <button>↓</button>
            </div>
        </section>
    )
}

export default Comment;