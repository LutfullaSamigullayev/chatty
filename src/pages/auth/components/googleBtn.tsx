import { Icons } from '../../../icons'
import './authStyles.css'

export function GoogleBtn() {
  return (
    <button className="login-btn google">
          <Icons.google />
          Log In with Google
        </button>
  )
}
