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

export const patchArticleVote = (articleId, changeBy) => {

    return api.patch(`/articles/${articleId}`, {inc_votes: changeBy});
}

export const getArticleComments = (articleId) => {

    return api.get(`/articles/${articleId}/comments`)
        .then(res => res.data.comments);
}

export const getUsers = () => {

    return api.get('/users')
        .then(res => res.data.users);
}

export const postComment = (articleId, comment) => {

    return api.post(`/articles/${articleId}/comments`, comment)
        .then(res => res.data.comment);
}

export const deleteComment = (commentId) => {

    return api.delete(`/comments/${commentId}`);
}

export const patchCommentVote = (commentId, changeBy) => {

    return api.patch(`/comments/${commentId}`, {inc_votes: changeBy});
}