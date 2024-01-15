
import { useRef, useState } from 'react'
import './App.css'
import LeftSideBar from './components/LeftSideBar/LeftSideBar'
import MiddleContent from './components/MiddleContent/MiddleContent'
import { UserInfo, UserInfoError } from './types/SpinnerContentType'
import { EMAIL_REGEX } from './constants/Constants'

function App() {
  const [winnersList, setWinnersList] = useState<UserInfo[]>([{ name: "Johndoe", email: "john@mail.com", discount: "40%" }])

  const userInfoModalRef = useRef<HTMLDialogElement | null>(null);
  const spinnerRef = useRef<HTMLCanvasElement | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "", email: "",
    discount: ""
  })

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
      console.log(userInfo);
      userInfoModalRef.current?.close();
      spinnerRef.current?.click();
    }

  }
  return (
    <>
      <div className='main-content'>
        <LeftSideBar
          winnerList={winnersList}
          setWinnerList={setWinnersList}
          handleSubmit={handleSubmit}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          userInfoErr={userInfoError}
          userInfoModalRef={userInfoModalRef}
          spinnerRef={spinnerRef}
        />
        <MiddleContent winnersList={winnersList} />
      </div>
    </>
  )
}

export default App
