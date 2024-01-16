import { DiscountContent } from "../../types/SpinnerContentType"
import "./SpinnerContentList.css"
interface SpinnerContentListProps {
    spinnerContent: Map<string, DiscountContent>
    discountListRef: React.MutableRefObject<HTMLTableRowElement | null>
}

export default function SpinnerContentList({ spinnerContent, discountListRef }: SpinnerContentListProps) {
    return (
        <table >
            <thead>
                <tr>
                    <th>Discount</th>
                    <th>Type</th>
                    <th>Color</th>
                </tr>
            </thead>
            <tbody>
                {[...spinnerContent.entries()].map((entry) => (
                    <tr ref={discountListRef} key={entry[0]}>
                        <td>{entry[1].discountAmount}</td>
                        <td>{entry[1].discountType}</td>
                        <td style={{ display: "flex", justifyContent: "center" }}><div style={{ width: "2rem", alignSelf: "center", height: "2rem", backgroundColor: entry[1].discountColor }}></div></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}