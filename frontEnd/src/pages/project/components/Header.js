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


const color = {
    childNavBar: "rgb(224 226 228)",
    line: "#859690"
}

const css = {
    CNavLinkActive: { color: "black", borderBottom: "2px solid", fontWeight: "bold" },
    CNavLink: { color: "black" },
    borderColor: { borderStyle: "solid", padding: "10px 0px", borderWidth: "1px", borderRadius: "4px" }
}

const Header = ({
    tab,
    name,
    user,
    setTab
}) => {
    return (
        <>
            {/* Navbar */}
            <CBreadcrumb style={{
                fontSize: "20px",
                border: "none",
                backgroundColor: color.childNavBar,
                marginBottom: "0px"
            }}>
                <div style={{ paddingRight: "10px" }}>
                    <CIcon content={freeSet.cilBook}></CIcon>
                </div>
                <CBreadcrumbItem>
                    <CLink>{user} </CLink>
                </CBreadcrumbItem>
                <CBreadcrumbItem active>{name}</CBreadcrumbItem>
            </CBreadcrumb>
            <CNav variant="tabs" style={{
                backgroundColor: color.childNavBar,
            }}>
                <CNavLink style={tab=="config"?css.CNavLinkActive:css.CNavLink} onClick={()=>setTab("config")}><CIcon content={freeSet.cilSettings} />Config</CNavLink>
                <CNavLink style={tab=="document"?css.CNavLinkActive:css.CNavLink} onClick={()=>setTab("document")}><CIcon content={brandSet.cibReadme} />Document</CNavLink>
                <CNavLink style={css.CNavLink} href="#review"><CIcon content={freeSet.cilHandPointUp} />Review</CNavLink>
                <CNavLink style={css.CNavLink} href="#recommend"><CIcon content={freeSet.cilCommentBubble} />Recommendation</CNavLink>
            </CNav>
        </>
    )
}

export default Header
