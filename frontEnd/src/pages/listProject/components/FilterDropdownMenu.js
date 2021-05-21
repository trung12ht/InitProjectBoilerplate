import React from 'react'
import {
    CCol,
    CRow,
    CFormGroup,
    CInputCheckbox,
    CDropdownMenu,
    CDropdownToggle,
    CLabel,
    CDropdown,
    CButton,
    CCollapse,
} from '@coreui/react'
import '../stylesheets/FilterDropdownMenu.css'

const FilterDropdownMenu = ({ label, getNumberRs, getResult, numberRs }) => {

    var arrayLanguage = [];
    label.langVersion.map((e) => {
        arrayLanguage.push({
            name: e,
            value: e,
            checked: false
        })
    })

    var arrayTech = [];
    label.techVersion.map((e) => {
        arrayTech.push({
            name: e,
            value: e,
            checked: false
        })
    })
    const [state, setState] = React.useState(
        {
            "language": arrayLanguage,
            "technologi": arrayTech,
            "documentation": [
                {
                    "name": "Phát triển nhanh",
                    "value": "fastDev",
                    "checked": false
                },
                {
                    "name": "Chi tiết",
                    "value": "detail",
                    "checked": false
                },
            ],
            "package": [
                {
                    "name": "Maven",
                    "value": "maven",
                    "checked": false
                },
                {
                    "name": "npm",
                    "value": "npm",
                    "checked": false
                },
            ],
            "numChecked": 0,
            "result": 0
        }
    )

    const removeChecked = () => {
        state.language.map(item => {
            item.checked = false;
        })
        state.technologi.map(item => {
            item.checked = false;
        })
        state.documentation.map(item => {
            item.checked = false;
        })
        state.package.map(item => {
            item.checked = false;
        })
        setState({ ...state, numChecked: 0, result: state.result });
    }

    const toArray = (state) => {
        let arrayLang = [];
        let arrayTech = [];
        state.language.map((e) => {
            if (e.checked == true) {
                arrayLang.push(e.value)
            }
        })
        state.technologi.map((e) => {
            if (e.checked == true) {
                arrayTech.push(e.value)
            }
        })
        return {
            "language": arrayLang,
            "technologi": arrayTech
        }
    }

    const handleClick = (item) => {
        item.checked = !item.checked
        let value;
        if (item.checked) {
            value = state.numChecked + 1
        } else {
            value = state.numChecked - 1
        }
        getNumberRs(toArray(state))
        var resultVal
        if (value != 0)
            resultVal = Math.floor(Math.random() * 1000)
        else resultVal = state.result
        setState({ ...state, numChecked: value, result: resultVal });
    }

    return (
        <>
            <CDropdown inNav>
                <CDropdownToggle color="primary" style={{ color: "blue" }}>Bộ lọc</CDropdownToggle>
                <CDropdownMenu className="FilterDropdownMenu">
                    <CRow>
                        <CCol xs="12" sm="12" md="12">
                            <CRow>
                                <CCol xs="6" sm="6" md="6">Ngôn ngữ</CCol>
                                <CCol xs="6" sm="6" md="6">Công nghệ</CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="6" sm="6" md="6">
                                    {state.language.map(item => {
                                        return <CFormGroup variant="custom-checkbox" inline>
                                            <CInputCheckbox custom id={item.value} name={item.value} value={item.value} checked={item.checked} onClick={() => handleClick(item)} />
                                            <CLabel variant="custom-checkbox" htmlFor={item.value}>{item.name}</CLabel>
                                        </CFormGroup>;
                                    })}
                                </CCol>
                                <CCol xs="6" sm="6" md="6">
                                    {state.technologi.map(item => {
                                        return <CFormGroup variant="custom-checkbox" inline>
                                            <CInputCheckbox custom id={item.value} name={item.value} value={item.value} checked={item.checked} onClick={() => handleClick(item)} />
                                            <CLabel variant="custom-checkbox" htmlFor={item.value}>{item.name}</CLabel>
                                        </CFormGroup>;
                                    })}
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="6" sm="6" md="6">Cách viết tài liệu</CCol>
                                <CCol xs="6" sm="6" md="6">Quản lý package</CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="6" sm="6" md="6">
                                    {state.documentation.map(item => {
                                        return <CFormGroup variant="custom-checkbox" inline>
                                            <CInputCheckbox custom id={item.value} name={item.value} value={item.value} checked={item.checked} onClick={() => handleClick(item)} />
                                            <CLabel variant="custom-checkbox" htmlFor={item.value}>{item.name}</CLabel>
                                        </CFormGroup>;
                                    })}
                                </CCol>
                                <CCol xs="6" sm="6" md="6">
                                    {state.package.map(item => {
                                        return <CFormGroup variant="custom-checkbox" inline>
                                            <CInputCheckbox custom id={item.value} name={item.value} value={item.value} checked={item.checked} onClick={() => handleClick(item)} />
                                            <CLabel variant="custom-checkbox" htmlFor={item.value}>{item.name}</CLabel>
                                        </CFormGroup>;
                                    })}
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCollapse show={state.numChecked != 0} style={{ width: '100%' }}>
                            <CCol xs="12" sm="12" md="12"><CButton block color="info" onClick={() => getResult(toArray(state))}>Có {numberRs} kết quả</CButton></CCol>
                            <CCol xs="12" sm="12" md="12"><CButton block color="link" onClick={() => removeChecked()}>Bỏ tất cả lựa chọn</CButton></CCol>
                        </CCollapse>
                    </CRow>
                </CDropdownMenu>
            </CDropdown>
        </>
    )
}

export default FilterDropdownMenu
