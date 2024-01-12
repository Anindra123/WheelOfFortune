import "./DiscountInput.css"
export default function DiscountInput() {

    return (
        <div className="input-form">
            <div className="input-group">
                <div className="input-label-container">
                    <label className="input-label">Discount Amount</label>
                </div>
                <div className="input-container">
                    <input type="number" className="input-text" placeholder="0-100" />
                </div>
            </div>
            <div className="input-group">
                <div className="input-label-container">
                    <label className="input-label">Discount Type</label>
                </div>
                <div className="input-container">
                    <select className="input-select" defaultValue="%">
                        <option value="%">%</option>
                        <option value="fixed">Fixed</option>
                    </select>
                </div>
            </div>
            <div className="input-group">
                <div className="input-label-container">
                    <label className="input-label">Pick color:</label>
                </div>

            </div>
            <div className="button-container">
                <a className="save-button">
                    Save
                </a>
            </div>
        </div>
    )
}