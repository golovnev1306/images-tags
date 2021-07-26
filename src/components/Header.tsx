import React, { ChangeEvent, FC, MouseEvent } from 'react'
import {
  Button, Col, Container, Form, FormControl, Row,
} from 'react-bootstrap'
import { ButtonVariant } from 'react-bootstrap/types'

type HeaderProps = {
  changeHandler: (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  downloadHandler: (e: MouseEvent) => void
  clearHandler: () => void
  setIsGroupHandler: () => void
  tag: string
  isGroup: boolean
  isLoad: boolean
}

const Header: FC<HeaderProps> = ({
  changeHandler, tag, downloadHandler, isLoad, clearHandler, isGroup, setIsGroupHandler,
}) => (
  <header>
    <div className="header">
      <Container className="header__container">
        <Form>
          <Row className="justify-content-center">
            <Col className="header__item header__item_input" xs={12} md={3}>
              <FormControl
                type="text"
                placeholder="Введите тег"
                value={tag}
                onChange={changeHandler}
              />
            </Col>
            <ColWithButton
              btnBody="Загрузить"
              variant="success"
              action={downloadHandler}
              isLoad={isLoad}
              loadingText="Загрузка..."
              type="submit"
            />

            <ColWithButton
              btnBody="Очистить"
              variant="danger"
              action={clearHandler}
            />

            <ColWithButton
              btnBody={isGroup ? 'Разгруппировать' : 'Группировать'}
              variant="primary"
              action={setIsGroupHandler}
            />
          </Row>
        </Form>
      </Container>
    </div>
  </header>
)

type ColWithButtonProps = {
  btnBody: string
  variant: ButtonVariant
  action?: (e: MouseEvent) => void
  isLoad?: boolean
  loadingText?: string
  type?: string
}

const ColWithButton: FC<ColWithButtonProps> = ({
  btnBody, variant, action, isLoad, loadingText, type,
}) => (
  <Col className="header__item" xs={12} md={2}>
    <Button className="header__btn" variant={variant} onClick={action} disabled={isLoad} type={type}>
      {isLoad ? loadingText : btnBody}
    </Button>
  </Col>
)

export default Header
