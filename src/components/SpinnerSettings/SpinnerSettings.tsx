import "./SpinnerSettings.css"
interface SpinnerSettingsProps {
    spinDuration: number,
    setSpinDuration: React.Dispatch<React.SetStateAction<number>>
}

export default function SpinnerSettings({ spinDuration, setSpinDuration }: SpinnerSettingsProps) {


    return (

        <div className="input-form">
            <div className="input-group">
                <div className="input-label-container">
                    <label className="input-label">Spin Duration:</label>
                </div>
                <div className="input-container">
                    <input type="number" className="input-text" placeholder="0-500 seconds"
                        value={spinDuration} onChange={(e) =>
                            setSpinDuration(Number(e.currentTarget.value))} />
                </div>
            </div>

            {/* <div className="button-container">
                <a className="save-button" onClick={handleSave}>
                    Save
                </a>
            </div> */}
        </div>
    )

}