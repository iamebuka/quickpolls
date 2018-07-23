import React from 'react'

const LoadingScreen = () => {
    return (
        <div style={{ width: "100%", height:"100vh" ,position: "absolute", left: "0px", top: "0px" }}>

            <div style={{ margin: 'calc(90vh/2) auto', textAlign: "center" }}>Loading</div>
        </div>
    )
}

export default LoadingScreen