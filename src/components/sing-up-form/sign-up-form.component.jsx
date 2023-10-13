import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const resetFormFields = ()=> {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, {displayName})
      resetFormFields()
      console.log(user);
      setTimeout(
        alert('Usuário criado com sucesso! :)')
      , 100)
    } catch (error) {
      if(error.code === 'auth/email-already-in-use'){
        alert('Usuário não criado, este email já foi usado!')
      }else{
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <>
      <div className="sign-up-container">
        <h2>Don't have an account? </h2>
        <span> Sign up whith your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label='Display Name'
            type="text"
            required
            value={displayName}
            name="displayName"
          />

          <FormInput
            label='Email'
            type="email"
            required
            value={email}
            name="email"
            onChange={handleChange}
          />

          <FormInput
            label='Password'
            type="password"
            required
            value={password}
            name="password"
            onChange={handleChange}
          />

          <label>Confirm Password</label>
          <FormInput
            label='Confirm Password'
            type="password"
            required
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />

          <button type="submit">Sigm Up</button>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
