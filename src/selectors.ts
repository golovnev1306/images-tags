import { createSelector } from 'reselect'
import { AppState, GroupImages, Image } from './types'

export const getIsInitialized = (state: AppState) => state.app.isInitialized
export const getMessage = (state: AppState) => state.app.message
export const getTag = (state: AppState) => state.images.tag
export const getImages = (state: AppState) => state.images.images
export const getIsGroup = (state: AppState) => state.images.isGroup
export const getGroupedImages = createSelector<AppState, Image[], GroupImages[]>(
  [getImages], (images) => images.reduce((accum, current) => {
    let imageObjIndex = accum.findIndex((i) => i.tag === current.tag)
    if (imageObjIndex === -1) {
      imageObjIndex = accum.push({
        tag: current.tag,
        images: [],
      }) - 1
    }
    accum[imageObjIndex].images.push(current)
    return accum
  }, [] as GroupImages[]),
)
