import { AppDispatch, Image, ReturnActionsType } from '../types'
import giphy from '../api/giphy'
import store from './store'
import { appActions } from './app-reducer'
import { getRandomTag } from '../utils'

const initialState = {
  images: [] as Image[],
  tag: '',
  isGroup: false,
}

type InitialState = typeof initialState

const imagesReducer = (
  state = initialState,
  action: ReturnActionsType<typeof imagesActions>,
): InitialState => {
  switch (action.type) {
    case 'ADD_IMAGE': return { ...state, images: [...state.images, action.image] }
    case 'SET_TAG': return { ...state, tag: action.tag }
    case 'SET_IMAGES': return { ...state, images: action.images }
    case 'SET_IS_GROUP': return { ...state, isGroup: action.isGroup }
    default: return state
  }
}

export const imagesActions = {
  addImage: (image: Image) => ({ type: 'ADD_IMAGE', image } as const),
  setTag: (tag: string) => ({ type: 'SET_TAG', tag } as const),
  setImages: (images: Image[]) => ({ type: 'SET_IMAGES', images } as const),
  setIsGroup: (isGroup: boolean) => ({ type: 'SET_IS_GROUP', isGroup } as const),
}

export const getImagesThunk = (isRandom = false) => async (
  dispatch: AppDispatch,
  getState: typeof store.getState,
) => {
  let { tag } = getState().images
  if (isRandom) {
    tag = getRandomTag()
  }
  if (!tag) {
    dispatch(appActions.setMessage({
      text: 'заполните поле \'тег\'',
      type: 'danger',
    }))
    return
  }

  const tags = tag.split(',').filter((i) => i !== '')
  const urls = [] as string[]
  try {
    const promises = tags.map(giphy.getImage)
    const results = await Promise.all(promises)

    results.forEach((result) => {
      if (!Array.isArray(result.data.data)) {
        urls.push(result.data.data.image_url)
      } else {
        dispatch(appActions.setMessage({
          text: tags.length > 1 ? 'По одному тегу из составного не найдено gif'
            : `По тегу "${tag}" ничего не найдено`,
          type: 'danger',
        }))
      }
    })

    if (urls.length) {
      dispatch(imagesActions.addImage({
        urls,
        tag,
        id: Date.now(),
      }))
    }
  } catch (e) {
    dispatch(appActions.setMessage({
      text: 'Произошла http ошибка',
      type: 'danger',
    }))
  }
}

export const clearThunk = () => (dispatch: AppDispatch) => {
  dispatch(imagesActions.setImages([]))
  dispatch(imagesActions.setTag(''))
}

export default imagesReducer
