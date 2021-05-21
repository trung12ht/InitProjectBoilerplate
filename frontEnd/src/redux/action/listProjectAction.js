import serverCall from '../../modules/serverCall'

export const getListProject=()=>dispatch=>{
  dispatch({
    type:GET_LIST_PROJECT_BEGIN,
  })
  return serverCall({
    method:'GET',
    url:`/project/listProject`
  })
  .then(res=>{
    dispatch({
      type: GET_LIST_PROJECT_SUCCESS,
      payload: res
    })
    return res
  })
  .catch(error=>{
    dispatch({
      type: GET_LIST_PROJECT_FAIL,
      payload: {error}
    })
    return error
  })
}

export const getListProjectFilterStar=(star)=>dispatch=>{
  dispatch({
    type:GET_FILTER_STAR_BEGIN,
  })
  return serverCall({
    method:'GET',
    url:`/project/filterStar/`+star,
  })
  .then(res=>{
    dispatch({
      type: GET_FILTER_STAR_SUCCESS,
      payload: res,
      filterStar: star
    })
    return res
  })
  .catch(error=>{
    dispatch({
      type: GET_FILTER_STAR_FAIL,
      payload: {error},
      filterStar: star
    })
    return error
  })
}

export const ratingProject=(userStar, index, id)=>dispatch=>{
  dispatch({
    type:RATING_PROJECT_BEGIN,
  })
  return serverCall({
    method:'POST',
    url:`/project/rating`,
    data: {
      "id": id,
      "userStar": userStar
    }
  })
  .then(res=>{
    console.log(res);
    dispatch({
      type: RATING_PROJECT_SUCCESS,
      payload: res,
      index: index,
      userStar: userStar
    })
    return res
  })
  .catch(error=>{
    console.log(error);
    dispatch({
      type: RATING_PROJECT_FAIL,
      payload: {error}
    })
    return error
  })
}

export const getNumberRs=(state)=>dispatch=>{
  dispatch({
    type:GET_NUMBER_RS_BEGIN,
  })
  return serverCall({
    method:'POST',
    url:`project/getNumberRs`,
    data: state
  })
  .then(res=>{
    dispatch({
      type: GET_NUMBER_RS_SUCCESS,
      payload: res,
    })
    return res
  })
  .catch(error=>{
    dispatch({
      type: GET_NUMBER_RS_FAIL,
      payload: {error}
    })
    return error
  })
}

export const getResult=(state)=>dispatch=>{
  dispatch({
    type:GET_RESULT_BEGIN,
  })
  return serverCall({
    method:'POST',
    url:`project/getResult`,
    data: state
  })
  .then(res=>{
    dispatch({
      type: GET_RESULT_SUCCESS,
      payload: res,
      requestBody: state
    })
    return res
  })
  .catch(error=>{
    dispatch({
      type: GET_RESULT_FAIL,
      payload: {error}
    })
    return error
  })
}

export const sorted=(state)=>dispatch=>{
  dispatch({
    type:SORTED_BEGIN,
  })
  return serverCall({
    method:'POST',
    url:`project/sorted`,
    data: state
  })
  .then(res=>{
    dispatch({
      type: SORTED_SUCCESS,
      payload: res,
      requestBody: state
    })
    return res
  })
  .catch(error=>{
    dispatch({
      type: SORTED_FAIL,
      payload: {error}
    })
    return error
  })
}

export const viewMore=(lastAction, filterStar, requestBody, index)=>dispatch=>{
  if (index == null || index == 0) index = 1
  dispatch({
    type:VIEW_MORE_BEGIN,
  })
  return serverCall({
    method:'POST',
    url:`project/viewMore`,
    data: {
      lastAction: lastAction,
      filterStar: filterStar,
      requestBody: requestBody,
      index: index
    }
  })
  .then(res=>{
    dispatch({
      type: VIEW_MORE_SUCCESS,
      payload: res,
      index: index,
    })
    return res
  })
  .catch(error=>{
    dispatch({
      type: VIEW_MORE_FAIL,
      payload: {error}
    })
    return error
  })
}

export const GET_NUMBER_RS_BEGIN='GET_NUMBER_RS_BEGIN'
export const GET_NUMBER_RS_SUCCESS='GET_NUMBER_RS_SUCCESS'
export const GET_NUMBER_RS_FAIL='GET_NUMBER_RS_FAIL'

export const VIEW_MORE_BEGIN='VIEW_MORE_BEGIN'
export const VIEW_MORE_SUCCESS='VIEW_MORE_SUCCESS'
export const VIEW_MORE_FAIL='VIEW_MORE_FAIL'

export const SORTED_BEGIN='SORTED_BEGIN'
export const SORTED_SUCCESS='SORTED_SUCCESS'
export const SORTED_FAIL='SORTED_FAIL'

export const GET_RESULT_BEGIN='GET_RESULT_BEGIN'
export const GET_RESULT_SUCCESS='GET_RESULT_SUCCESS'
export const GET_RESULT_FAIL='GET_RESULT_FAIL'

export const GET_LIST_PROJECT_BEGIN='GET_LIST_PROJECT_BEGIN'
export const GET_LIST_PROJECT_SUCCESS='GET_LIST_PROJECT_SUCCESS'
export const GET_LIST_PROJECT_FAIL='GET_LIST_PROJECT_FAIL'

export const GET_FILTER_STAR_BEGIN='GET_FILTER_STAR_BEGIN'
export const GET_FILTER_STAR_SUCCESS='GET_FILTER_STAR_SUCCESS'
export const GET_FILTER_STAR_FAIL='GET_FILTER_STAR_FAIL'

export const RATING_PROJECT_BEGIN='RATING_PROJECT_BEGIN'
export const RATING_PROJECT_SUCCESS='RATING_PROJECT_SUCCESS'
export const RATING_PROJECT_FAIL='RATING_PROJECT_FAIL'