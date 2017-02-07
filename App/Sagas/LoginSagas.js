import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import firebase from 'firebase'

// attempts to login
export function * login ({ username, password }) {
  const firebaseAuth = firebase.auth()
  try {
    const { email, uid } = yield call(
      [firebaseAuth, firebaseAuth.signInWithEmailAndPassword],
      username,
      password
    )
    yield put(LoginActions.loginSuccess({ email, uid }))
  }
  catch (error) {
    yield put(LoginActions.loginFailure(error))
  }
}
