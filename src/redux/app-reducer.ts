import { AppDispatch, Message, ReturnActionsType } from '../types'

const initialState = {
  isInitialized: false,
  message: {
    type: 'success',
    text: '',
  } as Message,
}

type InitialState = typeof initialState

const appReducer = (
  state = initialState,
  action: ReturnActionsType<typeof appActions>,
): InitialState => {
  switch (action.type) {
    case 'SET_IS_INITIALIZED':
      return { ...state, isInitialized: action.isInitialized }
    case 'SET_MESSAGE':
      return { ...state, message: action.message }
    default:
      return state
  }
}

export const appActions = {
  setIsInitialized: (isInitialized: boolean) => ({ type: 'SET_IS_INITIALIZED', isInitialized } as const),
  setMessage: (message: Message) => ({ type: 'SET_MESSAGE', message } as const),
}

export const initAppThunk = () => (dispatch: AppDispatch) => {
  dispatch(appActions.setIsInitialized(true))
}

export default appReducer
