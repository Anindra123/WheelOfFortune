
import { useState } from 'react'
import './App.css'
import LeftSideBar from './components/LeftSideBar/LeftSideBar'
import MiddleContent from './components/MiddleContent/MiddleContent'
import { UserInfo } from './types/SpinnerContentType'
// import { EMAIL_REGEX } from './constants/Constants'
// import { DiscountContext } from './context/DiscountContext'



function App() {
  const [winnersList, setWinnersList] = useState<UserInfo[]>([])



  return (
    <>
      <div className='main-content'>


        <LeftSideBar
          winnerList={winnersList}

          setWinnerList={setWinnersList}
        />

        <MiddleContent winnerList={winnersList} />

      </div>
    </>
  )
}

export default App
