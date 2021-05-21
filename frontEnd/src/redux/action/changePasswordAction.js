import serverCall, { postForm } from '../../modules/serverCall'

export const changePassword = (data) => dispatch => {
    dispatch({
        type: CHANGE_PASSWORD_BEGIN,
    })
    return postForm({
        data: data, 
        url: `/userProfile/changePassword`
    })
        .then(res => {
            dispatch({
                type: CHANGE_PASSWORD_SUCCESS,
                payload: res
            })
            return res
        })
        .catch(error => {
            dispatch({
                type: CHANGE_PASSWORD_FAIL,
                payload: { error }
            })
            return error
        })
}

export const CHANGE_PASSWORD_BEGIN = 'CHANGE_PASSWORD_BEGIN'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL'