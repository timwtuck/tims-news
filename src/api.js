import axios from 'axios';

const api = axios.create({
        baseURL: "https://timmyt-news.herokuapp.com/api" 
    });

export const getTopics = () => {

    return api.get('/topics')
        .then((res) => [{slug:''}, ...res.data.topics]);
}

export const getArticles = (path) => {

     return api.get(path)
            .then(res =>{ return {
                articles: res.data.articles,
                totalCount: res.data.total_count
            }
        });
}

export const getArticleById = (articleId) => {

    return api.get(`/articles/${articleId}`)
            .then(res => res.data.article);
} 

export const patchVote = (articleId, changeBy) => {

    return api.patch(`/articles/${articleId}`, 
        {'inc_votes': changeBy });
}