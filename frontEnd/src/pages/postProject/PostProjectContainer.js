import { connect } from 'react-redux'
import { getLabel, getListDocumentPost, postData, appendDocument, removeDocument, updateDocumentContent } from '../../redux/action/postProjectAction'
import PostProject from './PostProject'

const mapStoreToProps = state => ({
    loading: state.post.loading,
    label: state.post.label,
    data: state.post.data,
    documents: state.post.documents,
})

const mapDispatchToProps = dispatch => ({
    getLabel: () => dispatch(getLabel()),
    postData: (data, documents) => dispatch(postData(data, documents)),
    getListDocument: (language, technologi) => dispatch(getListDocumentPost(language, technologi)),
    appendDocument: (documentName) => dispatch(appendDocument(documentName)),
    removeDocument: (index) => dispatch(removeDocument(index)),
    updateDocumentContent: (listDocument) => dispatch(updateDocumentContent(listDocument)),
})

export default connect(mapStoreToProps, mapDispatchToProps)(PostProject)