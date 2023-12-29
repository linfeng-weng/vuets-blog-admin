export default function countNumber(element: HTMLElement, duration: number = 1000) {
  let startNum = 0
  const endNum = Number(element.innerText)
  const singleNumTime = duration / endNum
  const timer = setInterval(() => {
    if (startNum >= endNum) {
      clearInterval(timer)
      element.innerText = String(endNum)
    } else {
      startNum++
      element.innerText = String(startNum)
    }
  }, singleNumTime)
}
