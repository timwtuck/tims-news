import {useState, useEffect} from 'react';
import DisplayArticles from "./DisplayArticles";
import SearchBar from "./SearchBar";

const Articles = () => {

    const [query, setQuery] = useState({
        topic:'',
        order:'desc',
        sortBy:'votes'
    }); 

    return (
        <main>
            <SearchBar setQuery={setQuery}/>
            <DisplayArticles query={query}/>
        </main>
    );

}

export default Articles;