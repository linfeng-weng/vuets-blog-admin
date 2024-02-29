/* 图片压缩 */

// 将上传的图片文件转为base64格式数据
const fileToDataURL = (file: Blob): Promise<any> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = (e) => resolve((e.target as FileReader).result)
    reader.readAsDataURL(file)
  })
}

// 用得到的base64数据创建图片元素
const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = dataURL
  })
}

// 将canvas图片对象转为blob对象
const canvasToBlob = (
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob | null> => {
  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), type, quality))
}

export const compressImage = async (file: File, type = 'image/webp', quality = 0.5) => {
  const fileName = file.name.replace(/\.[^.]+$/, '.webp') //更改后缀为.webp
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  const base64 = await fileToDataURL(file)
  const img = await dataURLToImage(base64)
  let scaleFactor = 1
  if (file.size > 1 * 1024 * 1024) scaleFactor = 0.5 // 大图像进行尺寸压缩
  const newWidth = img.width * scaleFactor
  const newHeight = img.height * scaleFactor
  canvas.width = newWidth
  canvas.height = newHeight
  context.clearRect(0, 0, newWidth, newHeight)
  context.drawImage(img, 0, 0, newWidth, newHeight)
  const blob = (await canvasToBlob(canvas, type, quality)) as Blob
  const newFile = new File([blob], fileName, { type })
  return newFile
}
