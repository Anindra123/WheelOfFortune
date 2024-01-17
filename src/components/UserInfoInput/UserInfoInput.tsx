import React, { useEffect, useRef } from "react"
import "./UserInfoInput.css"
import { UserInfo, UserInfoError } from "../../types/SpinnerContentType"
// import { EMAIL_REGEX } from "../../constants/Constants"
interface UserInfoModalProps {
    userInfo: UserInfo,
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
    userInfoError: UserInfoError,
    handleSubmit: () => void,
    isActive: boolean,
}

export default function UserInfoInput({ handleSubmit,
    userInfo, userInfoError, setUserInfo

    , isActive }: UserInfoModalProps) {

    const confirmButtonRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        function handleKeyPress(e: KeyboardEvent) {
            if (e.key === "Enter") {
                confirmButtonRef.current?.click();
            }
        }

        document.body.addEventListener("keydown", handleKeyPress)
        return () => document.body.removeEventListener("keydown", handleKeyPress)
    })

    return (
        <div className={`main-dialog ${isActive && 'active'}`}>

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
                        <input placeholder="e.g. John Doe"
                            className={`dialog-input ${userInfoError.nameErr.length > 0 && "error-input"}`}
                            type="text"
                            onChange={(e) => setUserInfo({ ...userInfo, name: e.currentTarget.value })}
                            value={userInfo.name}
                        />
                        <span className="error-message">{userInfoError.nameErr}</span>
                    </div>

                </div>

                <div className="dialog-input-group">
                    <div className="dialog-input-label-container">
                        <label className="dialog-input-label">
                            Your Email:
                        </label>
                    </div>
                    <div className="dialog-input-container">
                        <input placeholder="e.g. john@mail.com"
                            className={`dialog-input ${userInfoError.emailErr.length > 0 && "error-input"}`}
                            type="email"
                            onChange={(e) => setUserInfo({ ...userInfo, email: e.currentTarget.value })}
                            value={userInfo.email}
                        />
                        <span className="error-message">{userInfoError.emailErr}</span>
                    </div>

                </div>


                <div className="dialog-footer-container">
                    <a ref={confirmButtonRef} className="input-confirm-button" onClick={handleSubmit}>
                        Confirm</a>
                </div>
            </div>

        </div>
    )
}