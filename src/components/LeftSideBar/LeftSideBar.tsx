import { useState } from "react"
import Spinner from "../Spinner/Spinner"
import "./LeftSideBar.css"
import SpinnerContentList from "../SpinnerContentList/SpinnerContentList";
import { DiscountContent, UserInfo, UserInfoError } from "../../types/SpinnerContentType";
import { v4 as uuidv4 } from "uuid";
import DiscountInput from "../DiscountInput/DiscountInput";
import UserInfoModal from "../UserInfoModal/UserInfoModal";



const intial_contents: Map<string, DiscountContent> = new Map();
intial_contents.set(uuidv4(), { discountAmount: "20", discountType: "%", discountColor: "red" })
intial_contents.set(uuidv4(), { discountAmount: "30", discountType: "%", discountColor: "blue" })
intial_contents.set(uuidv4(), { discountAmount: "40", discountType: "fixed", discountColor: "orange" })
intial_contents.set(uuidv4(), { discountAmount: "10", discountType: "%", discountColor: "green" })
intial_contents.set(uuidv4(), { discountAmount: "15", discountType: "%", discountColor: "blue" })
intial_contents.set(uuidv4(), { discountAmount: "13", discountType: "%", discountColor: "red" })
intial_contents.set(uuidv4(), { discountAmount: "25", discountType: "%", discountColor: "orange" })

interface LeftSideBarProps {
    userInfoModalRef: React.MutableRefObject<HTMLDialogElement | null>
    handleSubmit: () => void;
    userInfo: UserInfo,
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
    userInfoErr: UserInfoError,
    winnerList: UserInfo[],
    setWinnerList: React.Dispatch<React.SetStateAction<UserInfo[]>>
    spinnerRef: React.MutableRefObject<HTMLCanvasElement | null>
}


export default function LeftSideBar({ userInfoModalRef, handleSubmit, userInfo
    , setUserInfo, userInfoErr, winnerList, setWinnerList, spinnerRef }: LeftSideBarProps) {
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [discounts, setDiscounts] = useState<Map<string, DiscountContent>>(intial_contents);
    //const userInfoModalRef = useRef<HTMLDialogElement | null>(null);


    function handleUserInfoModalOpen() {
        userInfoModalRef.current?.showModal();
    }

    return (
        <>
            <UserInfoModal

                handleSubmit={handleSubmit}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                userInfoError={userInfoErr}
                userInfoModalRef={userInfoModalRef}

            />
            <section className={`left-side-bar-container ${isEditClicked ? 'edit-bg' : 'normal-bg'}`}>
                <div className="header">
                    <h2 className={`header-text ${isEditClicked ? 'text-dark' : 'text-light'}`}>Wheel Of Fortune</h2>
                </div>
                {isEditClicked ? (
                    <>
                        <div className="spinner-list-container">
                            <div className="spinner-content-header">
                                <a className="go-back-btn" onClick={() => { setIsEditClicked(!isEditClicked) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        style={{ fill: "rgba(0, 0, 0, 1)" }}>
                                        <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>
                                </a>
                                <div>
                                    <h3>Discount List:</h3>
                                </div>

                            </div>
                            <div className="spinner-content-container">
                                <SpinnerContentList spinnerContent={discounts} />
                            </div>
                        </div>
                        <div className="discount-input-container">
                            <DiscountInput discount={discounts} setDiscount={setDiscounts} />
                        </div>

                    </>
                ) : (

                    <>


                        <div className="spinner-edit-btn-container">
                            <a className="spinner-edit-btn" onClick={() => setIsEditClicked(!isEditClicked)}>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAaRJREFUaEPtmF0SwjAIhOPN9GTqydSTqcyYmUpJYCn56Uzzog/b9NtASMMp7Xycds6fDgOjI3hEICgC55TSNaVEv3ncv39u2vwzRIAgCV4aqonRBmrwpkiMNGCBV02MMlCCp5ShIaXU5btHnjzPRhiowedNK2kInkz8jd4GLPAZUNKueHsaQKvNVAYsG3ZZMkv6IRGwwC+rTWkTi2dC6xTyVBvoQGtpwLJhLdGpnsatDFjga9VGPcCyoIUBBJ44UH3TcwCFQfWr/REZARQG1Yufq1EGUBhUX7wWRBhAYVB99U6z1QAKg+q1C9mmrgQKg+pVeBJ4I4DCoHoTvNcACoPqzfAeAygMqofgUQMoDKqH4REDKAyqd8FbDaAwqN4NbzXwFt5Q+sTtCm8xQK2+BzMwDbzFAF/RqeCjDHRPm2VGaCcxz3/eHRsKr0VAyn8ynFvgvB1uvgZuKjvs4VoELBduzqK2wyPhtQigBrrDawak+l9awCHwWwxQp/j1a3evWt7RaVKbz7oHpgHmZrQy2nMxXe86DLiWLfChIwKBi+maavcR+ACyln8xYpqIoQAAAABJRU5ErkJggg==" />
                            </a>
                        </div>
                        <div className="spinner-container">
                            <Spinner spinnerRef={spinnerRef} userInfo={userInfo}
                                setWinnerList={setWinnerList}
                                winnerList={winnerList}
                                discounts={discounts} />
                        </div>
                        <div className="spin-wheel-btn-container">
                            <a className="spin-wheel-btn" onClick={handleUserInfoModalOpen}>
                                <p className="spin-wheen-btn-text">Try your luck 🎲</p>
                            </a>
                        </div>
                    </>
                )}
            </section>
        </>
    )
}