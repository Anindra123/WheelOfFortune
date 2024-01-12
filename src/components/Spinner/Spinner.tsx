import { useState } from "react"
import { DiscountContent } from "../../types/SpinnerContentType"
import "./Spinner.css"

interface SpinnerProps {
    discounts: Map<string, DiscountContent>
}

export default function Spinner({ discounts }: SpinnerProps) {

    const width = 500 / discounts.size
    const height = 500 / discounts.size
    const rotate_degree = 500 / discounts.size;

    return (
        <div className="spinner">
            <div className="discount-content-container">

                {
                    [...discounts.entries()].map((discount, idx) => (
                        <div className="discount-content" style={{
                            backgroundColor: discount[1].discountColor, width: 50 + "%",
                            height: 50 + "%",
                            overflow: "hidden",
                            transformOrigin: "100% 100%",
                            transform: `rotate(${rotate_degree * idx}deg)`,
                            zIndex: `${idx * 100}`
                        }} id={discount[0]}>
                            <p className="discount-content-text">{discount[1].discountAmount}</p>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}