import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import DisplayArticles from "./DisplayArticles";
import SearchBar from "./SearchBar";

const Articles = () => {

    const search = useLocation().search;
    const query = {};
    query.topic = new URLSearchParams(search).get('topic') || '';
    query.order = new URLSearchParams(search).get('order') || 'desc';
    query.sortBy = new URLSearchParams(search).get('sort_by') || 'votes';
  
    return (
        <main>
            <SearchBar/>
            <DisplayArticles query={query}/>
        </main>
    );

}

export default Articles;