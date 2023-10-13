import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import SignUpForm from "../../components/sing-up-form/sign-up-form.component"

function SignIn() {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
    }

  return (
    <div>
        <button onClick={logGoogleUser}>Entrar com Google</button>
        <SignUpForm/>
    </div>
  )
}

export default SignIn;