import { UserInfo } from "../../types/SpinnerContentType"
import "./WinnersList.css"

interface WinnersListProps {
    winnersList: UserInfo[];
}

export default function WinnersList({ winnersList }: WinnersListProps) {

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
                {/* <tr className="discount-winner-table-row">
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


                </tr> */}

                {
                    winnersList.map((winner, index) => (
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