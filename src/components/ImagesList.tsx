import React, { FC } from 'react'
import { connect } from 'react-redux'
import ImageByTag from './ImageByTag'
import { AppDispatch, AppState, Image } from '../types'
import { imagesActions } from '../redux/images-reducer'

type ImagesListProps = {
  images: Image[]
} & MapDispatchProps

const ImagesList: FC<ImagesListProps> = ({ images, setTag }) => (
  <div className="images__list">
    {images.map((i, index) => (
      <ImageByTag key={i.id} tabIndex={index} image={i} setTag={setTag} />
    ))}
  </div>
)

type MapDispatchProps = {
  setTag: (tag: string) => void
}

const mapDispatchToProps = (dispatch: AppDispatch): MapDispatchProps => ({
  setTag: (tag) => dispatch(imagesActions.setTag(tag)),
})

export default connect<{}, MapDispatchProps, {}, AppState>(
  null, mapDispatchToProps,
)(ImagesList)
