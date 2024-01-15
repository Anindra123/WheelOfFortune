import { useEffect } from "react"
import { DiscountContent, UserInfo } from "../../types/SpinnerContentType"
import "./Spinner.css"
import clearCanvas, { drawNeedle, draw_wheel } from "../../helper/canvas_render";

interface SpinnerProps {
    discounts: Map<string, DiscountContent>,
    winnerList: UserInfo[],
    userInfo: UserInfo,
    setWinnerList: React.Dispatch<React.SetStateAction<UserInfo[]>>
    spinnerRef: React.MutableRefObject<HTMLCanvasElement | null>
}

export default function Spinner({ discounts, winnerList
    , userInfo, setWinnerList, spinnerRef }: SpinnerProps) {

    const segments = [...discounts.entries()];
    const segments_length = segments.length;
    const SPINNER_CONTAINER = document.querySelector(".spinner");

    let currentSegment = '';
    let timerHandle = 0;
    const timerDelay = segments_length;

    let angleCurrent = 0;
    let angleDelta = 0;
    let canvasContext: CanvasRenderingContext2D | null | undefined = null;
    const downDuration = 500;
    let maxSpeed = Math.PI / segments_length;
    const downTime = segments_length * downDuration;
    let spinStart = 0;
    const centerX = 250;
    const centerY = 250;


    function renderWheel() {
        clearCanvas(canvasContext);
        draw_wheel(segments, canvasContext
            , angleCurrent
            , segments_length
            , centerX
            , centerY);
        currentSegment = drawNeedle(canvasContext, centerX, centerY
            , angleCurrent, segments_length, segments);
    }

    function onTimerTick() {

        renderWheel();
        const duration = new Date().getTime() - spinStart;

        let progress = 0;
        let finished = false;

        progress = duration / downTime;
        angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
        if (progress >= 1) finished = true;


        angleCurrent += angleDelta;
        while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;

        if (finished) {

            clearInterval(timerHandle);
            const temp_winners = [...winnerList];
            console.log(userInfo);
            userInfo.discount = currentSegment;
            temp_winners.push(userInfo);
            setWinnerList(temp_winners)
            timerHandle = 0;
            angleDelta = 0;
        }


    }

    function spin() {

        if (timerHandle === 0) {
            spinStart = new Date().getTime();
            maxSpeed = Math.PI / segments_length;
            timerHandle = setInterval(onTimerTick, timerDelay);
        }
    }





    function wheelRender() {
        clearCanvas(canvasContext);
        draw_wheel(segments, canvasContext
            , angleCurrent
            , segments_length
            , centerX
            , centerY);
        currentSegment = drawNeedle(canvasContext, centerX, centerY
            , angleCurrent, segments_length, segments);
    }

    function initalize_canvas() {
        let canvas: HTMLCanvasElement | null = document
            .querySelector(".discount-content-container");

        if (navigator.userAgent.indexOf("MSIE") !== -1) {
            canvas = document.createElement("canvas");
            canvas.setAttribute("width", "500");
            canvas.setAttribute("height", "500");
            canvas.setAttribute("className", "discount-content-container");
            SPINNER_CONTAINER?.appendChild(canvas);

        }
        canvas?.addEventListener("click", spin, false);
        canvasContext = canvas?.getContext('2d');
    }


    function intialize_wheel() {

        initalize_canvas();
        wheelRender();
    }


    useEffect(() => {
        intialize_wheel();
        console.log(userInfo);
        setTimeout(() => {
            window.scrollTo(0, 1)
        }, 0)
    }, [])

    return (
        <div className="spinner">
            <canvas ref={spinnerRef} width={"500"} height={"500"} className="discount-content-container">


            </canvas>
        </div >
    )
}