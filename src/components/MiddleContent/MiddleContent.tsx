import { UserInfo } from "../../types/SpinnerContentType";
import WinnersList from "../WinnersList/WinnersList"
import "./MiddleContent.css"

interface MiddleContentProps {
    winnerList: UserInfo[]
}

export default function MiddleContent({ winnerList }: MiddleContentProps) {
    return (
        <section className="middle-container">
            <WinnersList winnerList={winnerList} />
        </section>
    )
}