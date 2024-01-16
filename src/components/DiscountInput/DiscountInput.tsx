import { useState } from "react"
import { DiscountContent } from "../../types/SpinnerContentType"
import { v4 as uuidv4 } from "uuid";
import "./DiscountInput.css"

interface DiscountInputProps {
    discount: Map<string, DiscountContent>;
    setDiscount: React.Dispatch<React.SetStateAction<Map<string, DiscountContent>>>
}

export default function DiscountInput({ discount, setDiscount }: DiscountInputProps) {

    const [discountInfo, setDiscountInfo] = useState<DiscountContent>({
        discountAmount: "",
        discountColor: "red",
        discountType: "%"
    });

    function handleSubmit() {
        const tempDiscount = new Map(discount);
        tempDiscount.set(uuidv4(), discountInfo);

        setDiscount(tempDiscount);
    }

    return (
        <div className="input-form">
            <div className="input-group">
                <div className="input-label-container">
                    <label className="input-label">Discount Amount</label>
                </div>
                <div className="input-container">
                    <input type="text" className="input-text" placeholder="0-100" onChange={(e) =>
                        setDiscountInfo({ ...discountInfo, discountAmount: e.currentTarget.value })
                    } />
                </div>
            </div>
            <div className="input-group">
                <div className="input-label-container">
                    <label className="input-label">Discount Type</label>
                </div>
                <div className="input-container">
                    <select className="input-select" value={discountInfo.discountType} onChange={(e) => {
                        console.log(e.target.value);
                        setDiscountInfo({ ...discountInfo, discountType: e.target.value })
                    }}>
                        <option value="%">%</option>
                        <option value="fixed">Fixed</option>
                    </select>
                </div>
            </div>
            <div className="input-group">
                <div className="input-label-container">
                    <label className="input-label">Pick color:</label>
                </div>
                <div className="radio-group-container">
                    <input type="radio" value={"red"} id="color-radio" name="color" className="red"
                        checked={discountInfo.discountColor === "red"}
                        onChange={(e) =>
                            setDiscountInfo({ ...discountInfo, discountColor: e.currentTarget.value })} />
                    <input type="radio" value={"green"} id="color-radio" name="color" className="green" onChange={(e) => setDiscountInfo({ ...discountInfo, discountColor: e.currentTarget.value })} />
                    <input type="radio" value={"blue"} id="color-radio" name="color" className="blue"
                        onChange={(e) => setDiscountInfo({
                            ...discountInfo,
                            discountColor: e.currentTarget.value
                        })}
                    />
                    <input type="radio" value={"orange"} id="color-radio" name="color" className="orange" onChange={(e) => {
                        setDiscountInfo({ ...discountInfo, discountColor: e.currentTarget.value })
                    }} />
                </div>
            </div>
            <div className="button-container">
                <a className="save-button" onClick={handleSubmit}>
                    Add
                </a>
            </div>
        </div>
    )
}