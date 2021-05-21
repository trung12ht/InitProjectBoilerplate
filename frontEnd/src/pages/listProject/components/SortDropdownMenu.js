import React from 'react'
import {
    CCol,
    CRow,
    CFormGroup,
    CDropdownMenu,
    CDropdownToggle,
    CLabel,
    CInputRadio,
    CDropdown} from '@coreui/react'

const SortDropdownMenu = ({sorted}) => {

    const toValue = (string) => {
        return {
            "name": string.split("-")[1],
            "type": string.split("-")[0]
        }
    }

    return (
        <>
            <CDropdown inNav>
                <CDropdownToggle color="primary" style={{color:"blue"}}>Sắp xếp</CDropdownToggle>
                <CDropdownMenu>
                    <CRow>
                        <CCol xs="12" sm="12" md="12">
                            <CFormGroup variant="checkbox">
                                <CInputRadio className="form-check-input" onClick={(e) => sorted(toValue(e.target.value))} id="new" name="radios" value="desc-date"/>
                                <CLabel variant="checkbox" htmlFor="new">Mới nhất</CLabel>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="12" md="12">
                            <CFormGroup variant="checkbox">
                                <CInputRadio className="form-check-input" onClick={(e) => sorted(toValue(e.target.value))} id="old" name="radios" value="asc-date" />
                                <CLabel variant="checkbox" htmlFor="old">Cũ nhất</CLabel>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="12" md="12">
                            <CFormGroup variant="checkbox">
                                <CInputRadio className="form-check-input" onClick={(e) => sorted(toValue(e.target.value))} id="mvote" name="radios" value="desc-vote" />
                                <CLabel variant="checkbox" htmlFor="mvote">Đánh giá tốt nhất</CLabel>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="12" md="12">
                            <CFormGroup variant="checkbox">
                                <CInputRadio className="form-check-input" id="lvote" name="radios" value="asc-vote" onClick={(e) => sorted(toValue(e.target.value))}/>
                                <CLabel variant="checkbox" htmlFor="lvote">Đánh giá tệ nhất</CLabel>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="12" md="12">
                            <CFormGroup variant="checkbox">
                                <CInputRadio className="form-check-input" id="mview" name="radios" value="desc-view" onClick={(e) => sorted(toValue(e.target.value))}/>
                                <CLabel variant="checkbox" htmlFor="mview">Nhiều lượt xem</CLabel>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="12" md="12">
                            <CFormGroup variant="checkbox">
                                <CInputRadio className="form-check-input" id="lview" name="radios" value="asc-view" onClick={(e) => sorted(toValue(e.target.value))}/>
                                <CLabel variant="checkbox" htmlFor="lview">Ít lượt xem</CLabel>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="12" md="12">
                            <CFormGroup variant="checkbox">
                                <CInputRadio className="form-check-input" id="muse" name="radios" value="desc-use" onClick={(e) => sorted(toValue(e.target.value))}/>
                                <CLabel variant="checkbox" htmlFor="muse">Nhiều lượt sử dụng</CLabel>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="12" md="12">
                            <CFormGroup variant="checkbox">
                                <CInputRadio className="form-check-input" id="luse" name="radios" value="asc-use" onClick={(e) => sorted(toValue(e.target.value))}/>
                                <CLabel variant="checkbox" htmlFor="luse">Ít lượt sử dụng</CLabel>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CDropdownMenu>
            </CDropdown>
        </>
    )
}

export default SortDropdownMenu