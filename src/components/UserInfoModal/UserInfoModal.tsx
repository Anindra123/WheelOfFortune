import React from "react"
import "./UserInfoModal.css"
import { UserInfo, UserInfoError } from "../../types/SpinnerContentType"
// import { EMAIL_REGEX } from "../../constants/Constants"
interface UserInfoModalProps {
    userInfoModalRef: React.MutableRefObject<HTMLDialogElement | null>
    userInfo: UserInfo,
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
    userInfoError: UserInfoError,
    handleSubmit: () => void
}

export default function UserInfoModal({ handleSubmit,
    userInfoModalRef,
    userInfo, userInfoError, setUserInfo }: UserInfoModalProps) {

    // const [userInfo, setUserInfo] = useState<UserInfo>({
    //     name: "", email: "",
    //     discount: ""
    // })

    // const [userInfoError, setUserInfoError] = useState<UserInfoError>({
    //     nameErr: "", emailErr: ""
    // })

    // function handleSubmit() {
    //     let hasError = false;
    //     const temp_err = { ...userInfoError };
    //     temp_err.nameErr = "";
    //     temp_err.emailErr = "";


    //     if (userInfo.name.length === 0) {
    //         temp_err.nameErr = "Name is required";
    //         hasError = true;
    //     }

    //     if (userInfo.email.length === 0) {
    //         temp_err.emailErr = "Email is required";
    //         hasError = true;
    //     }
    //     else if (!EMAIL_REGEX.test(userInfo.email)) {
    //         temp_err.emailErr = "Email is not valid";
    //         hasError = true;
    //     }

    //     setUserInfoError(temp_err);

    //     if (!hasError) {
    //         console.log(userInfo);
    //     }

    // }

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
                        <input className={`dialog-input ${userInfoError.nameErr.length > 0 && "error-input"}`} type="text" onChange={(e) => setUserInfo({ ...userInfo, name: e.currentTarget.value })} />
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
                        <input className={`dialog-input ${userInfoError.emailErr.length > 0 && "error-input"}`} type="email" onChange={(e) => setUserInfo({ ...userInfo, email: e.currentTarget.value })} />
                        <span className="error-message">{userInfoError.emailErr}</span>
                    </div>

                </div>

                <div className="dialog-footer-container">
                    <a className="input-confirm-button" onClick={handleSubmit}>
                        Confirm</a>
                </div>
            </div>

        </dialog>
    )
}