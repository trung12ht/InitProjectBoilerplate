import React from 'react'
import {
    CCol,
    CRow,
    CLink} from '@coreui/react'
import Line from './Line'
import Bold from '../../listProject/components/Bold'
import ListRecomment from './ListRecomment'

const Recomment = () => {
    return (
        <>
            <div>
                <CRow>
                    <CCol xs="8" sm="8" md="8" id="recommend" style={{
                        paddingTop: "30px",
                    }}>
                        <CLink style={{
                            float: "right"
                        }}>More recomments</CLink>
                        <Bold text="Recomments:" />
                        <Line height="1px" style={{
                        }} />
                    </CCol>
                    <CCol xs="8" sm="8" md="8">
                        <ListRecomment />
                    </CCol>
                </CRow>
            </div>

        </>
    )
}

export default Recomment
