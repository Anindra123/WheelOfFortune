import { useEffect, useRef, useState } from "react"
import Spinner from "../Spinner/Spinner"
import "./LeftSideBar.css"
import SpinnerContentList from "../SpinnerContentList/SpinnerContentList";
import { DiscountContent, UserInfo, UserInfoError } from "../../types/SpinnerContentType";
import { v4 as uuidv4 } from "uuid";
import DiscountInput from "../DiscountInput/DiscountInput";
import UserInfoInput from "../UserInfoInput/UserInfoInput";
import { EMAIL_REGEX } from "../../constants/Constants";



const intial_contents: Map<string, DiscountContent> = new Map();
intial_contents.set(uuidv4(), { discountAmount: "20", discountType: "%", discountColor: "red" })
intial_contents.set(uuidv4(), { discountAmount: "30", discountType: "%", discountColor: "blue" })
intial_contents.set(uuidv4(), { discountAmount: "40", discountType: "fixed", discountColor: "orange" })
intial_contents.set(uuidv4(), { discountAmount: "10", discountType: "%", discountColor: "green" })
intial_contents.set(uuidv4(), { discountAmount: "15", discountType: "%", discountColor: "blue" })
intial_contents.set(uuidv4(), { discountAmount: "13", discountType: "%", discountColor: "red" })
intial_contents.set(uuidv4(), { discountAmount: "25", discountType: "%", discountColor: "orange" })

interface LeftSideBarProps {
    winnerList: UserInfo[],
    setWinnerList: React.Dispatch<React.SetStateAction<UserInfo[]>>
}

export default function LeftSideBar({ winnerList, setWinnerList }: LeftSideBarProps) {
    const [isEditClicked, setIsEditClicked] = useState(false);
    const spinnerRef = useRef<HTMLCanvasElement | null>(null);
    const discountListRef = useRef<HTMLTableRowElement | null>(null);
    const [discounts, setDiscounts] = useState<Map<string, DiscountContent>>(intial_contents);
    const [formOpen, setFormOpen] = useState(false);
    const [spinDuration, setSpinDuration] = useState(0);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: "", email: "",
        discount: ""
    });


    const [userInfoError, setUserInfoError] = useState<UserInfoError>({
        nameErr: "", emailErr: ""
    })

    function handleSubmit() {
        let hasError = false;
        const temp_err = { ...userInfoError };
        temp_err.nameErr = "";
        temp_err.emailErr = "";


        if (userInfo.name.length === 0) {
            temp_err.nameErr = "Name is required";
            hasError = true;
        }

        if (userInfo.email.length === 0) {
            temp_err.emailErr = "Email is required";
            hasError = true;
        }
        else if (!EMAIL_REGEX.test(userInfo.email)) {
            temp_err.emailErr = "Email is not valid";
            hasError = true;
        }

        setUserInfoError(temp_err);

        if (!hasError) {
            setFormOpen(!formOpen);
            const temp_user_info = { ...userInfo };
            temp_user_info.discount = "";
            const temp_winners = [...winnerList];
            temp_winners.push(temp_user_info);
            setWinnerList(temp_winners);

            spinnerRef.current?.click();
        }

    }

    useEffect(() => {

        if (winnerList.length > 0) {
            const temp_winners = [...winnerList];
            temp_winners[temp_winners.length - 1].discount = userInfo.discount;
            setWinnerList(temp_winners);
        }

    }, [userInfo.discount])

    useEffect(() => {
        discountListRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });


    }, [discounts]);

    return (
        <>

            <section className={`left-side-bar-container ${isEditClicked ? 'edit-bg' : 'normal-bg'} ${formOpen && 'active'}`}>
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
                            <div className="spinner-content-container" >
                                <SpinnerContentList discountListRef={discountListRef}
                                    spinnerContent={discounts} />
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
                            <Spinner
                                setUserInfo={setUserInfo}
                                spinnerRef={spinnerRef}
                                userInfo={userInfo}
                                spinDuration={spinDuration}
                                discounts={discounts} />
                            <UserInfoInput

                                setSpinDuration={setSpinDuration}
                                setUserInfo={setUserInfo}
                                isActive={formOpen}
                                userInfo={userInfo}
                                handleSubmit={handleSubmit}
                                userInfoError={userInfoError}
                            />

                        </div>
                        <div className="spin-wheel-btn-container">
                            <a className="spin-wheel-btn" onClick={() => setFormOpen(!formOpen)}>
                                <p className="spin-wheen-btn-text">{formOpen ? "Close" : "Try your luck 🎲"}</p>
                            </a>
                        </div>
                    </>
                )}
            </section>
        </>
    )
}