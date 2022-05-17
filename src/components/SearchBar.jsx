import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopics } from '../api';

const DropDown = ({children, setState, state, id, label}) => {

    return (
        <>
            <label htmlFor={id}>{label}: </label>
            <select id={id} name={id} value={state}
                onChange={(e) => setState(e.target.value)}>
                {children}
            </select>
        </>
    );
}

const SearchBar = ({query, setSearchParams}) => { 
    
    let sortBy;
    if(query.sortBy === 'created_at')
        sortBy = query.order === 'asc'? 'Oldest' : 'Newest';
    else if (query.sortBy === 'comment_count')
        sortBy = query.order === 'asc' ? 'Least Comments' : 'Most Comments';
    else
        sortBy = 'Hottest';

    const [topics, setTopics] = useState([{slug:''}]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedSortBy, setSelectedSortBy] = useState('Newest');
    let navigate = useNavigate();

    useEffect(() => {
        getTopics()
            .then(topics => {

                setSelectedTopic(query.topic);
                setSelectedSortBy(sortBy);

                setTopics([{slug:''}, ...topics]);

            })
    }, []);

    function onSearch(e) {

        e.preventDefault();

        const order = /(Oldest|Least Comments)/.test(selectedSortBy) ? 'asc' : 'desc';
        const sortBy = selectedSortBy === 'Hottest' ? 'votes' : 
            /Comments/.test(selectedSortBy) ? 'comment_count' : 'created_at';
        
        let path = `/articles?sort_by=${sortBy}&order=${order}`;
        path += selectedTopic ? `&topic=${selectedTopic}` : '';

        navigate(path);
    }

    return (
        <form className="search-bar" onSubmit={onSearch}>
            <div className="search-bar-container">
                <DropDown setState={setSelectedTopic} state={selectedTopic} id="topic" label="Topics">
                    {topics.map(topic => 
                        <option value={topic.slug} id={topic.slug} key={topic.slug}>{topic.slug}</option>)}
                </DropDown>
                <DropDown setState={setSelectedSortBy} state={selectedSortBy} id="sort-by" label="Sort by">
                <option>Hottest</option>
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Most Comments</option>
                    <option>Least Comments</option>
                </DropDown>
                <button>Search</button>
            </div>
        </form>
    )
}

export default SearchBar;