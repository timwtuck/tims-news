
import { useState, useEffect } from "react";

const Votes = ({hideButtons, cssClass, votes, id, apiCall}) => {

    const [voteState, setVoteState] 
        = useState({upVote: false, downVote: false});
    const [savedVoteState, setSavedVoteState] 
        = useState({upVote: false, downVote: false, votes: votes})
    const [currVote, setCurrVote] = useState(votes);
    const [requestStatus, setRequestStatus] = useState(null);

    useEffect(() => {
        if (!requestStatus)
            return;

        if (requestStatus == 'error'){
            setVoteState({upVote: savedVoteState.upVote,
                downVote: savedVoteState.downVote});
            setCurrVote(savedVoteState.votes);
        } 
        else {
            setSavedVoteState({...voteState, votes: currVote});
        }

        setRequestStatus(null);
    });

    function shiftVotes(pressedButton, idleButton, shiftBy) {

        let changeBy = 0;

        // toggle the pressed button's votes
        if (!pressedButton)
            changeBy += shiftBy;
        else
            changeBy -= shiftBy;

        //also adjust for case the idle button's state is 'on'
        if (idleButton)
            changeBy += shiftBy;

        return changeBy;
    }

    function onChangeVote(upVotePressed) {

        let changeBy;

        if (upVotePressed){
            changeBy = shiftVotes(voteState.upVote, voteState.downVote, 1);
            setVoteState({upVote: !voteState.upVote, downVote: false});
        } else {
            changeBy = shiftVotes(voteState.downVote, voteState.upVote, -1);
            setVoteState({upVote: false, downVote: !voteState.downVote});
        }

        setCurrVote((currVote) => currVote + changeBy);

        apiCall(id, changeBy)
            .then(() => setRequestStatus('success'))
            .catch(() => {
                alert('Something went wrong, please try again');
                setRequestStatus('error');
            });
    }

    return (

        <div className={`${cssClass}`}>
            <button className={`${voteState.upVote?"":"not-"}voted`} 
                hidden={hideButtons?"hidden":""} onClick={() => onChangeVote(true)}>↑</button>
            <p>votes: {currVote}</p>
            <button className={`${voteState.downVote?"":"not-"}voted`} 
                hidden={hideButtons?"hidden":""} onClick={() => onChangeVote(false)}>↓</button>
        </div>
    );

}

export default Votes;