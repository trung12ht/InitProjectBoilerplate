import React from 'react'
import {
    CCol,
    CRow} from '@coreui/react'
import '../stylesheets/layer.scss'
import Document from './Document'
import TabBar from './TabBar'


const color = {
    childNavBar: "rgb(224 226 228)",
    line: "#859690"
}

const css = {
    CNavLinkActive: { color: "black", borderBottom: "2px solid", fontWeight: "bold" },
    CNavLink: { color: "black" },
    borderColor: { borderStyle: "solid", padding: "10px 0px", borderWidth: "1px", borderRadius: "4px" }
}

const ListDocument = ({
}) => {
    return (
        <>
            {/* Document */}
            <CRow>
                <CCol xs="2" sm="2" md="2" >
                    <TabBar/>
                </CCol>
                <CCol xs="9" sm="9" md="9" >
                    <Document fileContent={["222", "333"]} fileName={"readme.md"}/>
                </CCol>
            </CRow>

        </>
    )
}

export default ListDocument
