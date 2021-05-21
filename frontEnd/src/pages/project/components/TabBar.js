import { CCol, CRow } from '@coreui/react'
import React from 'react'
import '../stylesheets/tabbar.scss'

const TabBar = ({
    documents,
    id,
    getDocument,
    rootName
}) => {
    const [state, setState] = React.useState(0);

    const handleClick = (i) => {
        getDocument(id, documents[i].name, rootName);
        setState(i);
    }

    return (
        <>
            
            {documents&&documents.map((d,i) => {
                return <CCol xs="12" sm="12" md="12" className={i==state?"activeDocument":"unactive"} onClick={() => handleClick(i)}>
                    {d.name}
                </CCol>
            })}
        </>
    )
}

export default TabBar
