import { connect } from 'react-redux'
// import Checkout from './Checkout'
import { getListProject, getListProjectFilterStar, ratingProject, getNumberRs, getResult, sorted, viewMore } from '../../redux/action/listProjectAction'
import { getLabel } from '../../redux/action/postProjectAction'
// import {getCartByUserId} from '../../redux/action/cartAction'
import ListProject from './ListProject'

const mapStoreToProps = state => ({
  projects: state.projects.projects,
  loading: state.projects.loading,
  filterStar: state.projects.filterStar,
  label: state.projects.label,
  numberRs: state.projects.numberRs,
  lastAction: state.projects.lastAction,
  requestBody: state.projects.requestBody,
  quantity: state.projects.quantity,
  index: state.projects.index
})

const mapDispatchToProps = dispatch => ({
  getListProject: () => dispatch(getListProject()),
  ratingProject: (userStar, index, id) => dispatch(ratingProject(userStar, index, id)),
  getListProjectFilterStar: (star) => dispatch(getListProjectFilterStar(star)),
  getLabel: () => dispatch(getLabel()),
  getNumberRs: (state) => dispatch(getNumberRs(state)),
  getResult: (state) => dispatch(getResult(state)),
  sorted: (flag) => dispatch(sorted(flag)),
  viewMore: (lastAction, filterStar, requestBody, index) => dispatch(viewMore(lastAction, filterStar, requestBody, index)),
})

export default connect(mapStoreToProps, mapDispatchToProps)(ListProject)