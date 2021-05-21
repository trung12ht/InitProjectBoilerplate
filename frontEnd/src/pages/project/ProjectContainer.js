import { connect } from 'react-redux'
// import Checkout from './Checkout'
import { comment, getComment, getProject, ratingProject, download } from '../../redux/action/projectAction'
// import {getCartByUserId} from '../../redux/action/cartAction'
import Project from './Project'

const mapStoreToProps = state => ({
  project: state.project.project,
  loading: state.project.loading,
  comment: state.project.comment
})

const mapDispatchToProps = dispatch => ({
  getProject: (id) => dispatch(getProject(id)),
  ratingProject: (userStar, index, id) => dispatch(ratingProject(userStar, index, id)),
  getComment: (id) => dispatch(getComment(id)),
  commentCallBack: (content, projectId) => dispatch(comment(content, projectId)),
  download: (id) => dispatch(download(id)),
})

export default connect(mapStoreToProps, mapDispatchToProps)(Project)