import React from 'react'
import {
    CCol,
    CRow,
    CLink,
    CLabel,
    CFormGroup,
    CInputRadio,
    CInput,
    CButton,
    CBreadcrumb,
    CBreadcrumbItem,
    CNav,
    CNavLink,
    CBadge
} from '@coreui/react'
import Bold from '../../listProject/components/Bold'
import Line from './Line'
import { freeSet, brandSet } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import Avatar from './Avatar'
import '../stylesheets/layer.scss'
import Header from './Header'
import ConfigComponent from './Config'
import ReadMe from './Readme'
import ListDocument from '../../document/ListDocument'
import ListDocumentContainer from '../../document/ListDocumentContainer'


const color = {
    childNavBar: "rgb(224 226 228)",
    line: "#859690"
}

const css = {
    CNavLinkActive: { color: "black", borderBottom: "2px solid", fontWeight: "bold" },
    CNavLink: { color: "black" },
    borderColor: { borderStyle: "solid", padding: "10px 0px", borderWidth: "1px", borderRadius: "4px" }
}

const Layer = ({
    id,
    name,
    user,
    content,
    language,
    technologi,
    techLabel,
    projectMeta,
    langueVersionLabel,
    download,
    starCount,
    numberVote
}) => {
    const [tab, setTab] = React.useState("config");
    return (
        <>
            <Header name={name} user={user} tab={tab} setTab={setTab} />
            {tab == "config" ?
                <>
                    <ConfigComponent
                        id = {id}
                        language={language}
                        technologi={technologi}
                        techLabel={techLabel}
                        projectMeta={projectMeta}
                        langueVersionLabel={langueVersionLabel} 
                        download = {download}
                        />
                    <ReadMe content={content}
                        language={language}
                        technologi={technologi} />

                </>: 
                <ListDocumentContainer>
                </ListDocumentContainer>
            }
        </>
    )
}

export default Layer
