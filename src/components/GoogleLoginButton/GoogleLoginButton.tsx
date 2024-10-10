import React from 'react'
import { GoogleLogin } from '@react-oauth/google'

export const GoogleLoginButton: React.FC = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse)
      }}
      onError={() => console.error('Login Failed')}
    />
  )
}
