import React, { FC, useEffect, useState } from 'react'
import './App.scss'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import Content from './components/Content'
import { AppDispatch, AppState, Message } from './types'
import { initAppThunk } from './redux/app-reducer'
import { getIsInitialized, getMessage } from './selectors'
import HeaderContainer from './components/HeaderContainer'

const App: FC<MapStateProps & MapDispatchProps> = ({ initApp, isInitialized, message }) => {
  useEffect(() => {
    initApp()
  }, [])

  const [isShowMsg, setIsShowMsg] = useState(false)
  useEffect(() => {
    if (message.text) {
      setIsShowMsg(true)
    }
  }, [message])

  return (
    <div className="App">
      {isInitialized ? (
        <>
          <HeaderContainer />
          <Content />
        </>
      ) : (<div>Идет загрузка приложения</div>)}

      <div className="message">
        <Alert
          variant={message.type}
          show={isShowMsg}
          onClose={() => { setIsShowMsg(false) }}
          dismissible
        >
          {message.text}
        </Alert>
      </div>
    </div>
  )
}

type MapStateProps = {
    isInitialized: boolean
    message: Message
}

type MapDispatchProps = {
    initApp: () => void
}

const mapStateToProps = (state: AppState): MapStateProps => ({
  isInitialized: getIsInitialized(state),
  message: getMessage(state),
})

const mapDispatchToProps = (dispatch: AppDispatch): MapDispatchProps => ({
  initApp: () => dispatch(initAppThunk()),
})

export default connect<MapStateProps, MapDispatchProps, {}, AppState>(
  mapStateToProps, mapDispatchToProps,
)(App)
