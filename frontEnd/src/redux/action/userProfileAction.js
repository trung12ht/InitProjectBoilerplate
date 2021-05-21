import serverCall, { postForm } from '../../modules/serverCall'

export const getInfo = () => dispatch => {
    dispatch({
        type: GET_INFO_BEGIN,
    })
    return serverCall({
        method: 'GET',
        url: `/userProfile/getInfo`
    })
        .then(res => {
            dispatch({
                type: GET_INFO_SUCCESS,
                payload: res,
            })
            return res
        })
        .catch(error => {
            dispatch({
                type: GET_INFO_FAIL,
                payload: { error }
            })
            return error
        })
}

export const updateProfile = (data) => dispatch => {
    dispatch({
        type: UPDATE_PROFILE_BEGIN,
    })
    return postForm({
        data: data,
        url: `/userProfile/updateProfile`
    })
        .then(res => {
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: res
            })
            return res
        })
        .catch(error => {
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                payload: { error }
            })
            return error
        })
}

export const GET_INFO_BEGIN = 'GET_INFO_BEGIN'
export const GET_INFO_SUCCESS = 'GET_INFO_SUCCESS'
export const GET_INFO_FAIL = 'GET_INFO_FAIL'


export const UPDATE_PROFILE_BEGIN = 'UPDATE_PROFILE_BEGIN'
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'
export const UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL'