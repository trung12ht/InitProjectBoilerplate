import React from 'react'
import {
    CCol,
    CRow,
    CLink
} from '@coreui/react'
import FilterDropdownMenu from './FilterDropdownMenu';
import SortDropdownMenu from './SortDropdownMenu';
import Bold from './Bold';
import jumpTo, { reload } from '../../../modules/Navigation';
import { freeSet } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import getLastPath from '../untils/until';


const Filter = ({ filterStar, 
    getNumberRs,
    getResult,
    getListProject, getListProjectFilterStar, label, numberRs, sorted }) => {

    const callApi = () => {
        if (getLastPath() >= 1 && getLastPath() <= 3) {
            getListProjectFilterStar(getLastPath())
        } else {
            getListProject()
        }
    }
    return (
        <>
            <CRow>
                <CCol xs="6" sm="6" md="6">
                    <CRow>
                        Chọn đánh giá:
                        {
                            filterStar > 0 && filterStar < 4 ?
                                <CIcon content={freeSet.cilBackspace} onClick={() => { jumpTo("/list-project"); callApi() }} /> :
                                <></>
                        }

                        <CCol xs="3" sm="3" md="3">
                            {filterStar == 1 ? <Bold text="Dưới 3 sao" /> : <CLink onClick={() => { jumpTo("/list-project/1"); callApi() }}>Dưới 3 sao</CLink>}
                        </CCol>
                        <CCol xs="3" sm="3" md="3">
                            {filterStar == 2 ? <Bold text="3-4 sao" /> : <CLink onClick={() => { jumpTo("/list-project/2"); callApi() }}>3-4 sao</CLink>}
                        </CCol>
                        <CCol xs="3" sm="3" md="3">
                            {filterStar == 3 ? <Bold text="4-5 sao" /> : <CLink onClick={() => { jumpTo("/list-project/3"); callApi() }}>4-5 sao</CLink>}
                        </CCol>
                    </CRow>
                </CCol>
                <CCol xs="6" sm="6" md="6">
                    <CRow>
                        <CCol xs="6" sm="6" md="6"><FilterDropdownMenu numberRs = {numberRs} label={label} getNumberRs={getNumberRs} getResult={getResult} /></CCol>
                        <CCol xs="6" sm="6" md="6"><div className="float-right"><SortDropdownMenu sorted={sorted} /></div></CCol>
                    </CRow>
                </CCol>
            </CRow>
            <CRow>
            </CRow>

        </>
    )
}

export default Filter
