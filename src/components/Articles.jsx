import {useState, useEffect} from 'react';
import DisplayArticles from "./DisplayArticles";
import SearchBar from "./SearchBar";

const Articles = ({api}) => {

    const [query, setQuery] = useState({
        topic:'',
        order:'desc',
        sortBy:'votes'
    }); 

    return (
        <main>
            <SearchBar api={api} setQuery={setQuery}/>
            <DisplayArticles api={api} query={query}/>
        </main>
    );

}

export default Articles;