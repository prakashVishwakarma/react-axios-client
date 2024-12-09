import React from 'react'
import Button from './Button'

const Card = () => {
    return (
        <div className="card">
            <div className="card-content">
                <p className="card-title">Card hover effect</p>
                <p className="card-para">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <Button/>
                <Button/>
            </div>
        </div>

    )
}

export default Card
