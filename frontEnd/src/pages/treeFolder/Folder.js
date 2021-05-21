import React, { Component, Suspense } from 'react'
import {
    CCol,
    CContainer, CDataTable, CRow,
} from '@coreui/react'
import TreeFolder from './component/TreeFolder';
import Document from '../project/components/Document';
import ButtonGroupFolder from './component/ButtonGroupFolder';
import getLastPath from '../listProject/untils/until';
import './styles/folder.scss'
import Loading from '../../components/loadingAnimation';
import NavBar from '../../components/navbar/NavBar';

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)


export default class Folder extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.callApi()
    }

    callApi() {
        if (!this.props.project) {
            this.props.getFolderTree(getLastPath())
        }
        // if (!this.props.comment) {
        //     this.props.getComment(getLastPath())
        // }
    }

    render() {
        const { tree, fileContent, fileName, loading } = this.props
        return (
            <main className="c-main" style={{
                marginBottom: "100px"
            }}>
                <NavBar></NavBar>
        <CContainer fluid>
                    <Suspense fallback={loading}>
                        {loading ? <Loading></Loading> : <></>}
                        <CRow>
                            <CCol xs="3" sm="3" md="3" className="folder">
                                {tree && <table>
                                    <tr style={{ height: "10px" }}>
                                        <th>{tree.name}.zip</th>
                                    </tr>
                                    <tr>
                                        <td >
                                            <div id="scroll">
                                                <TreeFolder id={getLastPath()} tree={tree.tree} name={tree.name} getFile={this.props.getFile}></TreeFolder>
                                            </div>
                                        </td>
                                    </tr>
                                </table>}
                            </CCol>
                            <CCol xs="9" sm="9" md="9" >
                                {
                                    fileContent && <Document fileContent={fileContent} fileName={fileName}></Document>
                                }
                            </CCol>
                        </CRow>
                        <ButtonGroupFolder id={getLastPath()} download={this.props.download}></ButtonGroupFolder>
                    </Suspense>
                </CContainer>
            </main>
        )
    }
}

