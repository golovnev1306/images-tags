import React, {
  ChangeEvent, FC, MouseEvent, useEffect, useState,
} from 'react'
import { connect } from 'react-redux'
import { AppDispatch, AppState } from '../types'
import { clearThunk, getImagesThunk, imagesActions } from '../redux/images-reducer'
import { getIsGroup, getTag } from '../selectors'
import Header from './Header'

const HeaderContainer: FC<MapStateProps & MapDispatchProps> = ({
  tag, setTag, downloadImages, clear, isGroup, setIsGroup,
}) => {
  const [isLoad, setIsLoad] = useState(false)
  const [isDelayMode, setIsDelayMode] = useState(false)
  const [interval, changeInterval] = useState(-1)

  useEffect(() => {
    if (isDelayMode) {
      changeInterval(setInterval(downloadHandler, 5000))
      return () => {
        clearInterval(interval)
      }
    }
    if (interval !== -1) {
      clearInterval(interval)
      changeInterval(-1)
    }
    return () => {}
  }, [isDelayMode])

  const changeHandler = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (ev.target.value.match('^[a-zA-Z,]*$') != null) {
      if (isDelayMode) {
        if (ev.target.value !== 'delay') {
          setIsDelayMode(false)
        }
      }
      setTag(ev.target.value)
    }
  }
  const downloadHandler = async (e: MouseEvent) => {
    if (e !== undefined) {
      e.preventDefault()
    }
    setIsLoad(true)
    if (tag === 'delay' && !isDelayMode) {
      setIsDelayMode(true)
      await downloadImages(true)
    } else {
      await downloadImages(isDelayMode ?? true)
    }
    setIsLoad(false)
  }

  const clearHandler = () => {
    clear()
  }

  const setIsGroupHandler = () => {
    setIsGroup(!isGroup)
  }

  return (
    <Header
      changeHandler={changeHandler}
      setIsGroupHandler={setIsGroupHandler}
      clearHandler={clearHandler}
      downloadHandler={downloadHandler}
      isLoad={isLoad}
      isGroup={isGroup}
      tag={tag}
    />
  )
}

type MapStateProps = {
  tag: string
  isGroup: boolean
}

type MapDispatchProps = {
  setTag: (tag: string) => void
  downloadImages: (isRandom?:boolean) => void
  clear: () => void
  setIsGroup: (isGroup: boolean) => void
}

const mapStateToProps = (state: AppState): MapStateProps => ({
  tag: getTag(state),
  isGroup: getIsGroup(state),
})

const mapDispatchToProps = (dispatch: AppDispatch): MapDispatchProps => ({
  setTag: (tag) => dispatch(imagesActions.setTag(tag)),
  downloadImages: (isRandom) => dispatch(getImagesThunk(isRandom)),
  clear: () => dispatch(clearThunk()),
  setIsGroup: (isGroup) => dispatch(imagesActions.setIsGroup(isGroup)),
})

export default connect<MapStateProps, MapDispatchProps, {}, AppState>(
  mapStateToProps, mapDispatchToProps,
)(HeaderContainer)
