import { connect } from 'react-redux'
import { getFile, getFolderTree } from '../../redux/action/folderAction'
import { download } from '../../redux/action/projectAction'
import Folder from './Folder'

const mapStoreToProps = state => ({
    loading: state.folder.loading,
    tree: state.folder.tree,
    fileContent: state.folder.fileContent,
    fileName: state.folder.fileName
})

const mapDispatchToProps = dispatch => ({
    getFolderTree: (id) => dispatch(getFolderTree(id)),
    download: (id) => dispatch(download(id)),
    getFile: (id, url, fileName) => dispatch(getFile(id, url, fileName)),
})

export default connect(mapStoreToProps, mapDispatchToProps)(Folder)