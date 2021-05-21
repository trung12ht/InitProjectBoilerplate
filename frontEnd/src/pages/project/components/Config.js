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
import '../stylesheets/layer.scss'
import ButtonGroup from './ButtonGroup'


const color = {
    childNavBar: "rgb(224 226 228)",
    line: "#859690"
}

const css = {
    CNavLinkActive: { color: "black", borderBottom: "2px solid", fontWeight: "bold" },
    CNavLink: { color: "black" },
    borderColor: { borderStyle: "solid", padding: "10px 0px", borderWidth: "1px", borderRadius: "4px" }
}

const ConfigComponent = ({
    id,
    language,
    technologi,
    techLabel,
    projectMeta,
    langueVersionLabel,
    download
}) => {

    const [state, setState] = React.useState(projectMeta);
    const [tech, setTech] = React.useState(techLabel[techLabel.length - 1]);
    const [langVersion, setLangVersion] = React.useState(langueVersionLabel[langueVersionLabel.length - 1]);
    const [techCheck, setTechCheck] = React.useState(0);
    const [langVersionCheck, setLangVersionCheck] = React.useState(0);


    const handleChange = (e, i) => {
        const newProjects = [...state];
        Object.assign(newProjects[i], {
            default: e.target.value
        })
        setState(newProjects);
    }

    return (
        <>
            {/* ConfigComponent */}
            <CRow style={{
                marginTop: "20px",
                padding: "10px 0px"
            }}>
                <CCol xs="8" sm="8" md="8"
                    style={{ borderRight: "1px solid", borderColor: color.line }}
                >
                    <CRow>
                        <CCol xs="6" sm="6" md="6">
                            <Bold text="Project: " />
                            Maven Project
                        </CCol>
                        <CCol xs="6" sm="6" md="6">
                            <Bold text="Language: " />
                            {language}
                        </CCol>
                        <CCol xs="12" sm="12" md="12">
                            <Bold text={technologi + ": "} />
                        </CCol>
                        <CCol xs="12" sm="12" md="12">
                            <CRow className="radioGroup">
                                {techLabel && techLabel.map((p, i) =>
                                    <CFormGroup variant="checkbox">
                                        <CInputRadio className="form-check-input" id={p} name="techLabel" value={p} checked={i==techCheck} onClick={() => {setTech(p); setTechCheck(i)}} />
                                        <CLabel variant="checkbox" htmlFor={p}>{p}</CLabel>
                                    </CFormGroup>
                                )}
                            </CRow>
                        </CCol>
                        <CCol xs="12" sm="12" md="12">
                            <Bold text="Project Meta: " />

                            {state && state.map((p, i) =>
                                <CRow>
                                    <CCol md="3">
                                        <CLabel htmlFor={p.label}>{p.label}</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput type="text" name={p.label} value={p.default} onChange={e => handleChange(e, i)} />
                                    </CCol>
                                </CRow>
                            )}
                            <CRow>
                                <CCol md="3">
                                    <CLabel htmlFor="email-input">
                                        <Bold text={language + ": "} />
                                    </CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CRow className="radioGroup">
                                        {langueVersionLabel && langueVersionLabel.map((p, i) =>
                                            <CFormGroup variant="checkbox">
                                                <CInputRadio className="form-check-input" name="langueVersionLabel" id={p} value={p} checked={i==langVersionCheck} onClick={() => {setLangVersion(p); setLangVersionCheck(i)}} />
                                                <CLabel variant="checkbox" htmlFor={p}>{p}</CLabel>
                                            </CFormGroup>
                                        )}
                                    </CRow>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CCol>
                <CCol xs="4" sm="4" md="4">
                    <CRow>
                        <CCol xs="6" sm="6" md="6">
                            <Bold text="Dependencies"></Bold>
                        </CCol>
                        <CCol xs="6" sm="6" md="6">
                            <CButton color="primary" variant="outline" style={{ float: "right" }}>Add Dependencies</CButton>
                        </CCol>
                        <Line height="1px"></Line>
                    </CRow>
                </CCol>
            </CRow>
            <ButtonGroup
                tech={tech}
                langVersion={langVersion}
                projectMeta={state}
                id={id}
                download={download}
            />
        </>
    )
}

export default ConfigComponent
