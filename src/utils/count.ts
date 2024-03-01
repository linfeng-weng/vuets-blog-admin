export default function countNumber(element: HTMLElement, duration: number = 1000) {
  const startNum = 0
  const endNum = Number(element.innerText)
  const range = endNum - startNum
  let startTime: number

  const animateCount = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    const currentNumber = Math.floor(progress * range + startNum)
    element.innerText = String(currentNumber)

    if (progress < 1) {
      requestAnimationFrame(animateCount)
    } else {
      element.innerText = String(endNum)
    }
  }

  requestAnimationFrame(animateCount)
}
