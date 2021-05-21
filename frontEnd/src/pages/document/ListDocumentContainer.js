import { connect } from 'react-redux'
import { getDocument, getListDocument } from '../../redux/action/documentAction'
import ListDocument from './ListDocument'

const mapStoreToProps = state => ({
    loading: state.documents.loading,
    documents: state.documents.documents,
    document: state.documents.document,
    fileName: state.documents.fileName,
})

const mapDispatchToProps = dispatch => ({
    getListDocument: (projectId) => dispatch(getListDocument(projectId)),
    getDocument: (projectId, name, rootName) => dispatch(getDocument(projectId, name, rootName))
})

export default connect(mapStoreToProps, mapDispatchToProps)(ListDocument)