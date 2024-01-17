import { useEffect, useRef, useState } from "react"
import Spinner from "../Spinner/Spinner"
import "./LeftSideBar.css"
import SpinnerContentList from "../SpinnerContentList/SpinnerContentList";
import { DiscountContent, UserInfo, UserInfoError } from "../../types/SpinnerContentType";
import { v4 as uuidv4 } from "uuid";
import DiscountInput from "../DiscountInput/DiscountInput";
import UserInfoInput from "../UserInfoInput/UserInfoInput";
import { EMAIL_REGEX } from "../../constants/Constants";
import SpinnerSettings from "../SpinnerSettings/SpinnerSettings";



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
    // const [isEditClicked, setIsEditClicked] = useState(false);
    const spinnerRef = useRef<HTMLCanvasElement | null>(null);
    const discountListRef = useRef<HTMLTableRowElement | null>(null);
    const [discounts, setDiscounts] = useState<Map<string, DiscountContent>>(intial_contents);
    const [formOpen, setFormOpen] = useState(false);
    const [spinDuration, setSpinDuration] = useState(500);
    const [formState, setFormState] = useState("main");
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
        else if (winnerList.some((winner) => winner.email === userInfo.email)) {
            temp_err.emailErr = "User with this email already exist";
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

            <section className={`left-side-bar-container ${formState !== "main" ? 'edit-bg' : 'normal-bg'} ${formOpen && 'active'}`}>
                <div className="header">
                    <h2 className={`header-text ${formState !== "main" ? 'text-dark' : 'text-light'}`}>Wheel Of Fortune</h2>
                </div>

                {formState === "edit" && <>
                    <div className="spinner-list-container">
                        <div className="spinner-content-header">
                            <a className="go-back-btn" onClick={() => { setFormState("main") }}>
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
                        <DiscountInput
                            discount={discounts}
                            setDiscount={setDiscounts}
                        />
                    </div>

                </>}
                {formState === "settings" && <>
                    <div className="settings-input-container">
                        <div className="settings-input-header">
                            <a className="go-back-btn"
                                onClick={() => { setFormState("main") }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    style={{ fill: "rgba(0, 0, 0, 1)" }}>
                                    <path
                                        d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>
                            </a>
                        </div>
                        <SpinnerSettings spinDuration={spinDuration}
                            setSpinDuration={setSpinDuration} />
                    </div>
                </>}
                {formState === "main" && <>


                    <div className="spinner-edit-btn-container">
                        <a className="spinner-edit-btn" onClick={() => { setFormState("edit"); setFormOpen(false); }}>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAaRJREFUaEPtmF0SwjAIhOPN9GTqydSTqcyYmUpJYCn56Uzzog/b9NtASMMp7Xycds6fDgOjI3hEICgC55TSNaVEv3ncv39u2vwzRIAgCV4aqonRBmrwpkiMNGCBV02MMlCCp5ShIaXU5btHnjzPRhiowedNK2kInkz8jd4GLPAZUNKueHsaQKvNVAYsG3ZZMkv6IRGwwC+rTWkTi2dC6xTyVBvoQGtpwLJhLdGpnsatDFjga9VGPcCyoIUBBJ44UH3TcwCFQfWr/REZARQG1Yufq1EGUBhUX7wWRBhAYVB99U6z1QAKg+q1C9mmrgQKg+pVeBJ4I4DCoHoTvNcACoPqzfAeAygMqofgUQMoDKqH4REDKAyqd8FbDaAwqN4NbzXwFt5Q+sTtCm8xQK2+BzMwDbzFAF/RqeCjDHRPm2VGaCcxz3/eHRsKr0VAyn8ynFvgvB1uvgZuKjvs4VoELBduzqK2wyPhtQigBrrDawak+l9awCHwWwxQp/j1a3evWt7RaVKbz7oHpgHmZrQy2nMxXe86DLiWLfChIwKBi+maavcR+ACyln8xYpqIoQAAAABJRU5ErkJggg==" />
                        </a>
                        <a className="spinner-settings-btn"
                            onClick={() => {
                                setFormState("settings");
                                setFormOpen(false);
                            }
                            }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: "black" }}><path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"></path><path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z"></path></svg>
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
                </>}

            </section>
        </>
    )
}