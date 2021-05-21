import React from 'react'
import {
    CDropdownToggle,
    CDropdown} from '@coreui/react'

const ViewMore = ({quantity, viewMore, lastAction, filterStar, requestBody, index}) => {
    return (
        <>
        {
            quantity>0&&<div className="pt-3 text-center">
            <CDropdown className="m-1" onClick={() => viewMore(lastAction, filterStar, requestBody, index)}>
                <CDropdownToggle color="info">
                    Xem thêm {quantity} dự án
                </CDropdownToggle>
            </CDropdown>
        </div>
        }
        
        </>
    )
}

export default ViewMore
