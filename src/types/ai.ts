export interface IAiImage {
  // prompt: string //提示词
  input: string //提示词
  // negative_prompt?: string //反向提示词
  size?: string // 图片长宽，默认1024*1024
  n?: number //生成图片数量，默认1
  steps?: number //迭代轮次，默认20
  sampler_index?: string //采样方式，默认值：Euler a
  seed?: number //随机种子，不设置时，自动生成随机数
  cfg_scale?: number //提示词相关性，说明：默认值为5，取值范围0-30
  style?: string //生成风格，默认'base'
}
