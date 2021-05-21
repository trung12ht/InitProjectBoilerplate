import serverCall, { postForm } from '../../modules/serverCall'

export const getUserInfo = (userId) => dispatch => {
    dispatch({
        type: GET_USER_INFO_BEGIN,
    })
    return serverCall({
        method: 'GET',
        url: `/getUserInfo/` + userId
    })
        .then(res => {
            dispatch({
                type: GET_USER_INFO_SUCCESS,
                payload: res,
            })
            return res
        })
        .catch(error => {
            dispatch({
                type: GET_USER_INFO_FAIL,
                payload: { error }
            })
            return error
        })
}

export const followUser = (userId) => dispatch => {
    dispatch({
        type: FOLLOW_USER_BEGIN,
    })
    return postForm({
        data: data,
        url: `/followUser/` + userId
    })
        .then(res => {
            dispatch({
                type: FOLLOW_USER_SUCCESS,
                payload: res
            })
            return res
        })
        .catch(error => {
            dispatch({
                type: FOLLOW_USER_FAIL,
                payload: { error }
            })
            return error
        })
}

export const GET_USER_INFO_BEGIN = 'GET_USER_INFO_BEGIN'
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS'
export const GET_USER_INFO_FAIL = 'GET_USER_INFO_FAIL'

export const FOLLOW_USER_BEGIN = 'FOLLOW_USER_BEGIN'
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS'
export const FOLLOW_USER_FAIL = 'FOLLOW_USER_FAIL'