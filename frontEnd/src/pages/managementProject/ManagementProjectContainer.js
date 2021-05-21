import { connect } from 'react-redux'
import { deleteProject, getListProject } from '../../redux/action/managementProjectAction'
import ManagementProject from './ManagementProject'


const mapStoreToProps = state => ({
    loading: state.managementProject.loading,
    projects: state.managementProject.projects,
})

const mapDispatchToProps = dispatch => ({
    getListProject: () => dispatch(getListProject()),
    deleteProject: (projectId) => dispatch(deleteProject(projectId)),
})

export default connect(mapStoreToProps, mapDispatchToProps)(ManagementProject)