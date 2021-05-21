import { connect } from 'react-redux'
import { getListDocument, getLabel, postData, appendDocument, removeDocument, updateDocumentContent } from '../../redux/action/postProjectAction'
import { getProject } from '../../redux/action/projectAction'
import EditProject from './EditProject'

const mapStoreToProps = state => ({
    loading: state.post.loading,
    label: state.post.label,
    data: state.post.data,
    project: state.project.project,
    documents: state.post.documents,
    fileName: state.documents.fileName,
})

const mapDispatchToProps = dispatch => ({
    getListDocument: (projectId) => dispatch(getListDocument(projectId)),
    getProject: (id) => dispatch(getProject(id)),
    getLabel: () => dispatch(getLabel()),
    postData: (data, documents) => dispatch(postData(data, documents)),
    appendDocument: (documentName) => dispatch(appendDocument(documentName)),
    removeDocument: (index) => dispatch(removeDocument(index)),
    updateDocumentContent: (listDocument) => dispatch(updateDocumentContent(listDocument)),
})

export default connect(mapStoreToProps, mapDispatchToProps)(EditProject)