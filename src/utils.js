
 
 export const displayPageStatusFeedback = (pageStatus) => {

    if (pageStatus === "loading")
        return <h2>Page Loading...</h2>;
        
    if (pageStatus === "error")
        return <h2>Something went wrong, please refresh page</h2>;
 }