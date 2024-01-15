// export function onTimerTick(
//   renderWheel: () => void,
//   spinStart: number,
//   downTime: number,
//   angleDelta: number,
//   maxSpeed: number,
//   angleCurrent: number,
//   setFinished: React.Dispatch<React.SetStateAction<boolean>>,
//   timerHandle: number,
//   currentSegment: string
// ) {
//   renderWheel();
//   const duration = new Date().getTime() - spinStart;

//   let progress = 0;
//   let finished = false;

//   progress = duration / downTime;
//   angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
//   if (progress >= 1) finished = true;

//   angleCurrent += angleDelta;
//   while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;

//   if (finished) {
//     setFinished(true);
//     clearInterval(timerHandle);
//     console.log(currentSegment);
//     timerHandle = 0;
//     angleDelta = 0;
//   }
// }

// export function spin(
//   spinStart: number,
//   maxSpeed: number,
//   segments_length: number,
//   timerHandle: number,
//   timerDelay: number,
//   renderWheel: () => void,
//   downTime: number,
//   angleDelta: number,
//   angleCurrent: number
// ) {
//   //isStarted = true;
//   if (timerHandle === 0) {
//     spinStart = new Date().getTime();
//     maxSpeed = Math.PI / segments_length;

//     // frames = 0;
//     timerHandle = setInterval(() => {
//       onTimerTick(renderWheel, spinStart, downTime, angleDelta, maxSpeed,angleCurrent,);
//     }, timerDelay);
//   }
// }
