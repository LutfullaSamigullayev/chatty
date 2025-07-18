import { Icons } from "../../icons";

export function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1 className="login-title">Welcome back to the CodeSquid Community</h1>
        <button className="login-goole">
          <Icons.google />
          Log In with Google
        </button>
        <form>
          <label htmlFor="username">Email or Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Email or Username"
          />

          {/* <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Pochta manzilingizni kiriting" /> */}
          <label htmlFor="password">Password</label>
          <div>
            <input type="password" id="password" name="password" />
            <button type="button" aria-label="Toggle password visibility">
              <Icons.eyeOpen />
            </button>
          </div>
          <button type="submit">LOG IN</button>
          <p>Own an Account? <a href="#">JUMP RIGHT IN</a></p>
        </form>
      </div>
    </div>
  );
}
