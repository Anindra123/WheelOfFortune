import React from "react"
import "./UserInfoModal.css"
interface UserInfoModalProps {
    userInfoModalRef: React.MutableRefObject<HTMLDialogElement | null>
}

export default function UserInfoModal({ userInfoModalRef }: UserInfoModalProps) {
    return (
        <dialog className="main-dialog" ref={userInfoModalRef}>

            <div>
                <a className="modal-close-btn"
                    onClick={() => { userInfoModalRef.current?.close() }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                        style={{ fill: "#fff" }} ><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                </a>
            </div>

            <div className="main-dialog-container">

                <div className="dialog-header-container">
                    <div>
                        <h2 className="dialog-header">Spin the wheel</h2>
                    </div>
                </div>
                <div className="dialog-description-container">
                    <h3 className="dialog-description">
                        Enter your name and email to win exclusive discounts
                    </h3>
                </div>
                <div className="dialog-input-group">
                    <div className="dialog-input-label-container">
                        <label className="dialog-input-label">
                            Your Name:
                        </label>
                    </div>
                    <div className="dialog-input-container">
                        <input className="dialog-input" type="text" />
                    </div>

                </div>

                <div className="dialog-input-group">
                    <div className="dialog-input-label-container">
                        <label className="dialog-input-label">
                            Your Email:
                        </label>
                    </div>
                    <div className="dialog-input-container">
                        <input className="dialog-input" type="email" />
                    </div>

                </div>

                <div className="dialog-footer-container">
                    <a className="input-confirm-button">
                        Confirm</a>
                </div>
            </div>

        </dialog>
    )
}