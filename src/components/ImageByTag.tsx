import React, { FC } from 'react'
import { Image } from '../types'

type ImageByTagProps = {
  tabIndex: number
  image: Image
  setTag: (tag: string) => void
}

const ImageByTag: FC<ImageByTagProps> = ({
  setTag, image, tabIndex,
}) => (
  <div
    className="images__item"
    onClick={() => setTag(image.tag)}
    onKeyDown={() => setTag(image.tag)}
    role="button"
    tabIndex={tabIndex}
    key={image.id}
  >
    {image.urls.map((url) => (
      <img
        className="images__image"
        src={url}
        alt={url}
        key={url}
      />
    ))}

  </div>
)

export default ImageByTag
