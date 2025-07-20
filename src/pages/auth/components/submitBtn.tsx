import { authPage } from '../../../types'
import './authStyles.css'

export function SubmitBtn({page}: authPage) {
  return (
    <button className="login-btn-submit" type="submit">{page == 'login' ? 'LOG IN' : 'SIGN UP'}</button>
  )
}
