import React from 'react'
import {
    CCol,
    CRow
} from '@coreui/react'
import '../project/stylesheets/layer.scss'
import Document from '../project/components/Document'
import TabBar from '../project/components/TabBar'
import { Component } from 'react'
import getLastPath from '../listProject/untils/until'


const color = {
    childNavBar: "rgb(224 226 228)",
    line: "#859690"
}

const css = {
    CNavLinkActive: { color: "black", borderBottom: "2px solid", fontWeight: "bold" },
    CNavLink: { color: "black" },
    borderColor: { borderStyle: "solid", padding: "10px 0px", borderWidth: "1px", borderRadius: "4px" }
}

export default class ListDocument extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.callApi()
    }

    callApi() {
        if (!this.props.documents) {
            this.props.getListDocument(getLastPath())
        }
    }

    render() {
        const { documents, document, fileName } = this.props
        return (
            <CRow>
                <CCol xs="2" sm="2" md="2" >
                    {documents && <TabBar documents={documents.document} id={getLastPath()} rootName = {documents.name} getDocument={this.props.getDocument} />}
                </CCol>
                <CCol xs="9" sm="9" md="9" >
                    {document && <Document fileContent={document} fileName={fileName} />}
                </CCol>
            </CRow>
        )
    }
}

