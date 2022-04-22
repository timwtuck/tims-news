
 
 export const displayPageStatusFeedback = (pageStatus, notFoundMsg) => {

    if (pageStatus === "loading")
        return <h2>Page Loading...</h2>;

    if (pageStatus === "not found")
        return <h2>{notFoundMsg}</h2>;
        
    if (pageStatus === "error")
        return <h2>Something went wrong, please refresh page</h2>;
 }

 export const handleError = (err, setPageStatus) => {

    if(err.response.status === 404)
        setPageStatus('not found')
    else
        setPageStatus('error'); 
 }