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
        <>
        <SearchBar query={query} setSearchParams={setSearchParams}/>
        <main>
            <section className="display-page">
                <DisplayArticles query={query}/>
            </section>
        </main>
        </>
    );

}

export default Articles;