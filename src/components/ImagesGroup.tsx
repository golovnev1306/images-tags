import React, { FC } from 'react'
import ImagesList from './ImagesList'
import { GroupImages } from '../types'

type ImagesGroupProps = {
  groupImages: GroupImages
}

const ImagesGroup: FC<ImagesGroupProps> = ({ groupImages }) => (
  <div className="images__group">
    <h5>{groupImages.tag}</h5>
    <ImagesList images={groupImages.images} />
  </div>
)

export default ImagesGroup
