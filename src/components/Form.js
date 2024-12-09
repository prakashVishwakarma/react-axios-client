import React from 'react'
import Button from './Button'

const Form = () => {
    return (
        <div>

            <form className="form">
                {/* <p className="form-title">Sign in to your account</p> */}
                <div className="input-container">
                    <input type="text" placeholder="Enter Title" />
                    <span>
                    </span>
                </div>
                <div className="input-container">
                    <input type="text" placeholder="Enter Description" />
                </div>
                {/* <button type="submit" className="submit">
                    Sign in
                </button> */}
                <Button/>

                {/* <p className="signup-link">
                    No account?
                    <a href="">Sign up</a>
                </p> */}
            </form>

        </div>
    )
}

export default Form
