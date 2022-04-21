import { useState } from "react";


const AddComment = ({user, onPostComment}) => {

    const [text, setText] = useState('');

    return (
        <section className="add-comment">
            <p>Add Comment: </p>
            <textarea value={text} 
                onChange={(e) => setText(e.target.value)}/>
            <button onClick={() => {onPostComment(text, setText); setText('')}}>Post Comment</button>
        </section>  
    )
}

export default AddComment;