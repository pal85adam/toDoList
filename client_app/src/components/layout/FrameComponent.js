import React from 'react'

const FrameComponent = (props) => {
    return (
        <section className="container">
            {props.children}
        </section>
    )
}

export default FrameComponent
