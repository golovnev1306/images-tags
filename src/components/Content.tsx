import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import Images from './Images'

const Content: FC = () => (
  <main>
    <div className="content">
      <Container>
        <Images />
      </Container>
    </div>
  </main>
)

export default Content
