import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
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

const SearchBar = ({setSearchParams}) => { 

    const [topics, setTopics] = useState([{slug:''}]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedSortBy, setSelectedSortBy] = useState('Newest');
    let navigate = useNavigate();

    useEffect(() => {
        getTopics()
            .then(topics => setTopics(topics))
    }, []);

    function onSearch(e) {

        e.preventDefault();

        const order = /(Newest|Least Comments)/.test(selectedSortBy) ? 'asc' : 'desc';
        const sortBy = selectedSortBy === 'Hottest' ? 'votes' : 
            /Comments/.test(selectedSortBy) ? 'comment_count' : 'created_at';
        
            console.log(order, sortBy)
        let path = `/articles?sort_by=${sortBy}&order=${order}`;
        path += selectedTopic ? `&topic=${selectedTopic}` : '';

        navigate(path);
    }

    return (
        <form className="search-bar" onSubmit={onSearch}>
            <DropDown setState={setSelectedTopic} id="topic">
                {topics.map(topic => 
                    <option value={topic.slug} id={topic.slug} key={topic.slug}>{topic.slug}</option>)}
            </DropDown>
            <DropDown setState={setSelectedSortBy} id="sort-by">
               <option>Hottest</option>
               <option>Newest</option>
               <option>Oldest</option>
               <option>Most Comments</option>
               <option>Least Comments</option>
            </DropDown>
            <button>Search</button>
        </form>
    )
}

export default SearchBar;