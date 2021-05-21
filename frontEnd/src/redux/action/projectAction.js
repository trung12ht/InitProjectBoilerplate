import serverCall from '../../modules/serverCall'
import jumpTo, {go} from '../../modules/Navigation'


export const getProject = (id) => dispatch => {
    dispatch({
        type: GET_PROJECT_BEGIN,
    })
    return serverCall({
        method: 'GET',
        url: `/project/` + id
    })
        .then(res => {
            console.log(res);
            dispatch({
                type: GET_PROJECT_SUCCESS,
                payload: res
            })
            return res
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: GET_PROJECT_FAIL,
                payload: { error }
            })
            return error
        })
}

export const ratingProject = (userStar, index, id) => dispatch => {
    dispatch({
        type: RATING_BEGIN,
    })
    return serverCall({
        method: 'POST',
        url: `/project/rating`,
        data: {
            "id": id,
            "userStar": userStar
        }
    })
        .then(res => {
            console.log(res);
            dispatch({
                type: RATING_SUCCESS,
                payload: res,
                userStar: userStar
            })
            dispatch(getProject(id));
            dispatch(getComment(id));
            return res
        })
        .catch(error => {
            dispatch({
                type: RATING_FAIL,
                payload: { error }
            })
            return error
        })
}

export const getComment = (id) => dispatch => {
    dispatch({
        type: GET_COMMENT_BEGIN,
    })
    return serverCall({
        method: 'GET',
        url: `/project/getComment/` + id,
    })
        .then(res => {
            dispatch({
                type: GET_COMMENT_SUCCESS,
                payload: res,
            })
            return res
        })
        .catch(error => {
            dispatch({
                type: GET_COMMENT_FAIL,
                payload: { error }
            })
            return error
        })
}

export const comment = (comment, projectId) => dispatch => {
    dispatch({
        type: COMMENT_BEGIN,
    })
    return serverCall({
        method: 'POST',
        url: `/project/comment`,
        data: {
            "comment": comment.value,
            "projectId": parseInt(projectId)
        }
    })
        .then(res => {
            dispatch({
                type: COMMENT_SUCCESS,
                payload: res,
            })
            dispatch(getComment(projectId));
            return res
        })
        .catch(error => {
            dispatch({
                type: COMMENT_FAIL,
                payload: { error }
            })
            return error
        })
}

export const download = (id) => dispatch => {
    dispatch({
        type: DOWNLOAD_BEGIN,
    })
    return serverCall({
        method: 'POST',
        url: `project/download`,
        data: {
            "projectId": parseInt(id)
        }
    })
        .then(
            res => {
            dispatch({
                type: DOWNLOAD_SUCCESS,
                payload: res,
            })
            window.open(res.data);
            return res
        })
        .catch(error => {
            dispatch({
                type: DOWNLOAD_FAIL,
                payload: { error }
            })
            return error
        })
}


export const GET_PROJECT_BEGIN = 'GET_PROJECT_BEGIN'
export const GET_PROJECT_SUCCESS = 'GET_PROJECT_SUCCESS'
export const GET_PROJECT_FAIL = 'GET_PROJECT_FAIL'

export const RATING_BEGIN = 'RATING_BEGIN'
export const RATING_SUCCESS = 'RATING_SUCCESS'
export const RATING_FAIL = 'RATING_FAIL'

export const GET_COMMENT_BEGIN = 'GET_COMMENT_BEGIN'
export const GET_COMMENT_SUCCESS = 'GET_COMMENT_SUCCESS'
export const GET_COMMENT_FAIL = 'GET_COMMENT_FAIL'

export const COMMENT_BEGIN = 'COMMENT_BEGIN'
export const COMMENT_SUCCESS = 'COMMENT_SUCCESS'
export const COMMENT_FAIL = 'COMMENT_FAIL'

export const DOWNLOAD_BEGIN = 'DOWNLOAD_BEGIN'
export const DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS'
export const DOWNLOAD_FAIL = 'DOWNLOAD_FAIL'