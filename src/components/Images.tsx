import React, { FC } from 'react'
import { connect } from 'react-redux'
import { AppState, GroupImages, Image } from '../types'
import { getGroupedImages, getImages, getIsGroup } from '../selectors'
import ImagesList from './ImagesList'
import ImagesGroup from './ImagesGroup'

const Images: FC<MapStateProps> = ({
  images, groupedImages, isGroup,
}) => (
  <div className="images">
    <h4>
      Список gif
      {images.length === 0 && ' пуст'}
    </h4>
    {!isGroup ? (<ImagesList images={images} />) : (
      <div className="images__groups">

        { groupedImages.map((groupImages) => (
          <ImagesGroup key={groupImages.tag} groupImages={groupImages} />
        )) }
      </div>
    )}

  </div>
)

type MapStateProps = {
  images: Image[]
  groupedImages: GroupImages[]
  isGroup: boolean
}

const mapStateToProps = (state: AppState): MapStateProps => ({
  images: getImages(state),
  groupedImages: getGroupedImages(state),
  isGroup: getIsGroup(state),
})

export default connect<MapStateProps, {}, {}, AppState>(
  mapStateToProps,
)(Images)
