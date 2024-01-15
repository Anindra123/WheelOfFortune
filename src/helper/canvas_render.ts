import { DiscountContent } from "../types/SpinnerContentType";

export default function clearCanvas(
  canvasContext: CanvasRenderingContext2D | null | undefined
) {
  const canvas = canvasContext;
  canvas?.clearRect(0, 0, 600, 600);
}

export function draw_segment(
  canvasContext: CanvasRenderingContext2D | null | undefined,
  discountContent: DiscountContent,
  lastAngle: number,
  angle: number,
  centerX: number,
  centerY: number
) {
  const canvas = canvasContext;
  const currentValue =
    discountContent.discountAmount + " " + discountContent.discountType;
  const size = 300;
  canvas?.save();
  canvas?.beginPath();
  canvas?.moveTo(centerX, centerY);
  canvas?.arc(centerX, centerY, size, lastAngle, angle, false);
  canvas?.lineTo(centerX, centerY);
  canvas?.closePath();
  if (canvas?.fillStyle) {
    canvas.fillStyle = discountContent.discountColor;
    canvas.strokeStyle = "gray";
    canvas.lineWidth = 5;
  }
  canvas?.fill();
  canvas?.stroke();
  canvas?.save();
  canvas?.translate(centerX, centerY);
  canvas?.rotate((lastAngle + angle) / 2);
  if (canvas?.fillStyle) {
    canvas.fillStyle = "black";
    canvas.font = "bold 20pt Arial";
  }

  canvas?.fillText(currentValue.substring(0, 21), 100, 0);
  canvas?.restore();
}

export function draw_wheel(
  segments: [string, DiscountContent][],
  canvasContext: CanvasRenderingContext2D | null | undefined,
  angleCurrent: number,
  segments_length: number,
  centerX: number,
  centerY: number
) {
  const canvas = canvasContext;
  const size = 300;
  let lastAngle = angleCurrent;
  const circle_degrees = Math.PI * 2;

  if (canvas) {
    canvas.lineWidth = 1;
    canvas.strokeStyle = "gray";
    canvas.textBaseline = "middle";
  }

  for (let index = 1; index <= segments_length; index++) {
    const angle = circle_degrees * (index / segments_length) + angleCurrent;
    draw_segment(
      canvasContext,
      segments[index - 1][1],
      lastAngle,
      angle,
      centerX,
      centerY
    );
    lastAngle = angle;
  }

  canvas?.beginPath();
  canvas?.arc(centerX, centerY, 50, 0, circle_degrees, false);
  canvas?.closePath();
  if (canvas) {
    canvas.fillStyle = "red";
    canvas.lineWidth = 5;
    canvas.strokeStyle = "gray";
  }

  canvas?.fill();
  canvas?.stroke();

  canvas?.beginPath();
  canvas?.arc(centerX, centerY, size, 0, circle_degrees, false);
  canvas?.closePath();

  if (canvas) {
    // canvas.fillStyle = "red";
    canvas.lineWidth = 10;
    canvas.strokeStyle = "gray";
  }
  canvas?.stroke();
}

export function drawNeedle(
  canvasContext: CanvasRenderingContext2D | null | undefined,
  centerX: number,
  centerY: number,
  angleCurrent: number,
  segments_length: number,
  segments: [string, DiscountContent][]
) {
  const canvas = canvasContext;
  canvas?.beginPath();
  canvas?.moveTo(centerX + 200, centerY);
  canvas?.lineTo(1500, -100);
  canvas?.lineTo(2500, 1000);
  canvas?.closePath();

  if (canvas) canvas.fillStyle = "white";
  canvas?.fill();
  const angleChange = angleCurrent + Math.PI / 3.5;

  let currentIndex =
    segments_length -
    Math.floor((angleChange / (Math.PI * 2)) * segments_length);
  if (currentIndex < 0) currentIndex = currentIndex + segments_length;
  return (
    segments[currentIndex][1].discountAmount +
    " " +
    segments[currentIndex][1].discountType
  );
}

export function initalize_canvas(
  spinnerContainer: Element | null,
  canvas: HTMLCanvasElement | null
) {
  // let canvas: HTMLCanvasElement | null = document.querySelector(
  //   ".discount-content-container"
  // );

  if (navigator.userAgent.indexOf("MSIE") !== -1) {
    canvas = document.createElement("canvas");
    canvas.setAttribute("width", "500");
    canvas.setAttribute("height", "500");
    canvas.setAttribute("className", "discount-content-container");
    spinnerContainer?.appendChild(canvas);
  }
  // canvas?.addEventListener("click", spin);
  return canvas?.getContext("2d");
}
