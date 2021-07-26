import axios from 'axios'
import constants from '../constants'
import { ImageResponse } from '../types'

const instance = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
})

export default {
  getImage: (tag: string) => instance.get<ImageResponse>(`random?api_key=${constants.API_KEY}&tag=${tag}`),
}
