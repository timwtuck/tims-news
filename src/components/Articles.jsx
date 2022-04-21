import {useState, useEffect} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import DisplayArticles from "./DisplayArticles";
import SearchBar from "./SearchBar";

const Articles = () => {

    let [searchParams, setSearchParams] = useSearchParams();
    const query = {};
    query.topic = searchParams.get('topic') || '';
    query.order = searchParams.get('order') || 'desc';
    query.sortBy = searchParams.get('sort_by') || 'votes';
  
    return (
        <main>
            <SearchBar setSearchParams={setSearchParams}/>
            <DisplayArticles query={query}/>
        </main>
    );

}

export default Articles;