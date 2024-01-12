import { DiscountContent } from "../../types/SpinnerContentType"
import "./SpinnerContentList.css"
interface SpinnerContentListProps {
    spinnerContent: Map<string, DiscountContent>
}

export default function SpinnerContentList({ spinnerContent }: SpinnerContentListProps) {

    return (
        <table>
            <thead>
                <th>Discount</th>
                <th>Type</th>
                <th>Color</th>
            </thead>
            <tbody>
                {[...spinnerContent.entries()].map((entry) => (
                    <tr>
                        <td>{entry[1].discountAmount}</td>
                        <td>{entry[1].discountType}</td>
                        <td style={{ display: "flex", justifyContent: "center" }}><div style={{ width: "2rem", alignSelf: "center", height: "2rem", backgroundColor: entry[1].discountColor }}></div></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}