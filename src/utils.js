
 export const displayPageStatusFeedback = (pageStatus, notFoundMsg) => {

    if (pageStatus === "loading")
        return <h2>Page Loading...</h2>;

    if (pageStatus === "not found")
        return <h2>{notFoundMsg}</h2>;

    if (pageStatus === "bad request")
        return <h2>400: Bad Request</h2>;
        
    if (pageStatus === "error")
        return <h2>Something went wrong, please refresh page</h2>;
 }

 export const handleError = (err, setPageStatus) => {

    console.log(err)
    if(err.response.status === 404)
        setPageStatus('not found')
    else if (err.response.status === 400)
        setPageStatus('bad request')
    else
        setPageStatus('error'); 
 }
