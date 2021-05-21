import React from 'react'

// const css = {
//     size: "50px"
// }

const Avatar = ({ src, size }) => {

    let sizeAvatar = size?size:"40px"

    return (
        < >
            <img src={src?src:"https://www.w3schools.com/howto/img_avatar.png"} style={{
                margin: "5px",
                verticalAlign: 'bold',
                width: sizeAvatar,
                height: sizeAvatar,
                borderRadius: sizeAvatar,
            }}>
            </img>
        </>
    )
}

export default Avatar
