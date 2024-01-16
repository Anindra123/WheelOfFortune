import { UserInfo } from "../../types/SpinnerContentType"
import "./WinnersList.css"


interface WinnerListProps {
    winnerList: UserInfo[];
}

export default function WinnersList({ winnerList }: WinnerListProps) {

    return (

        <table className="discount-winner-table">
            <thead>
                <tr>
                    <th className="discount-winner-table-head">Name</th>
                    <th className="discount-winner-table-head">Email</th>
                    <th className="discount-winner-table-head">Discount Amount</th>
                </tr>
            </thead>
            <tbody>

                {
                    winnerList.map((winner, index) => (
                        <tr key={index} className="discount-winner-table-row">
                            <td className="discount-winner-table-data">
                                {winner.name}
                            </td>
                            <td className="discount-winner-table-data">
                                {winner.email}
                            </td>
                            <td className="discount-winner-table-data">
                                {winner.discount}
                            </td>


                        </tr>
                    ))
                }


            </tbody>
        </table>
    )
}