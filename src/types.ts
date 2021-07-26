import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { Variant } from 'react-bootstrap/types'
import { rootReducer } from './redux/store'

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppState, void, AnyAction>

type ReturnACType<T> = T extends { [key: string]: infer U } ? U : never
export type ReturnActionsType<
    T extends {[key: string]: (...args: any[]) => any}
    > = ReturnType<ReturnACType<T>>

export type Image = {
    tag: string
    urls: string[]
    id: number
}

export type GroupImages = {
    tag: string
    images: Image[]
}

export type ImageResponse = {
    data: {
        image_url: string
    } | []
}

export type Message = {
    type: Variant,
    text: string,
}
