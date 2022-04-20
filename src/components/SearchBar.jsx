import {useState, useEffect} from 'react';
import { getTopics } from '../api';

const DropDown = ({children, setState, id}) => {

    return (
        <>
            <label htmlFor={id}>Topics: </label>
            <select id={id} name={id} 
                onChange={(e) => setState(e.target.value)}>
                {children}
            </select>
        </>
    );
}

const SearchBar = ({setQuery}) => { 

    const [topics, setTopics] = useState([{slug:''}]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedSortBy, setSelectedSortBy] = useState('Newest');

    useEffect(() => {
        getTopics()
            .then(topics => setTopics(topics))
    }, []);

    function onSearch(e) {

        e.preventDefault();

        const query ={};
        query.topic = selectedTopic;
        query.order = selectedSortBy === 'Newest' ? 'asc' : 'desc';
        query.sortBy = selectedSortBy === 'Hottest' ? 'votes' : 'created_at';
        
        setQuery(query);
    }

    return (
        <form className="search-bar" onSubmit={onSearch}>
            <DropDown setState={setSelectedTopic} id="topic">
                {topics.map(topic => 
                    <option value={topic.slug} id={topic.slug} key={topic.slug}>{topic.slug}</option>)}
            </DropDown>
            <DropDown setState={setSelectedSortBy} id="sort-by">
               <option>Newest</option>
               <option>Oldest</option>
               <option>Hottest</option>
            </DropDown>
            <button>Search</button>
        </form>
    )
}

export default SearchBar;