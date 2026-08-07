export interface Ad {
  adId: string
  message: string
  reward: number
  expiresIn: number
  encrypted: string | null
  probability: string
}

export interface AdsResponse {
  success: boolean
  data: Ad[]
}
