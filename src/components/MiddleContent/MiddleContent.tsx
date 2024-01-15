import { UserInfo } from "../../types/SpinnerContentType";
import WinnersList from "../WinnersList/WinnersList"
import "./MiddleContent.css"

interface MiddleContentProps {
    winnersList: UserInfo[];
}

export default function MiddleContent({ winnersList }: MiddleContentProps) {
    return (
        <section className="middle-container">
            {/* <table className="discount-winner-table">
                <thead>
                    <tr>
                        <th className="discount-winner-table-head">Name</th>
                        <th className="discount-winner-table-head">Email</th>
                        <th className="discount-winner-table-head">Discount Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="discount-winner-table-row">
                        <td className="discount-winner-table-data">
                            John Doe
                        </td>
                        <td className="discount-winner-table-data">
                            john@mail.com
                        </td>
                        <td className="discount-winner-table-data">
                            40%
                        </td>


                    </tr>
                    <tr className="discount-winner-table-row">
                        <td className="discount-winner-table-data">
                            John Doe
                        </td>
                        <td className="discount-winner-table-data">
                            john@mail.com
                        </td>
                        <td className="discount-winner-table-data">
                            40%
                        </td>


                    </tr>
                    <tr className="discount-winner-table-row">
                        <td className="discount-winner-table-data">
                            John Doe
                        </td>
                        <td className="discount-winner-table-data">
                            john@mail.com
                        </td>
                        <td className="discount-winner-table-data">
                            40%
                        </td>


                    </tr>


                </tbody>
            </table> */}
            <WinnersList winnersList={winnersList} />
        </section>
    )
}