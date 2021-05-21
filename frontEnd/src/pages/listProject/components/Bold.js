import React from 'react'

const Bold = ({text, float}) => {

    return (
        < >
            <div style={{ fontWeight: 'bold' , float: float}}>
                {text}
            </div>
        </>
    )
}

export default Bold
