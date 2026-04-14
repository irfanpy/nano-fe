import AuthSplitLayout from '@components/auth/AuthSplitLayout'
import LoginForm from '@components/auth/LoginForm'

export default function LoginPage() {
  return (
    <AuthSplitLayout
      mode="login"
      title="Login"
      subtitle="Choose your role and enter your credentials to continue."
    >
      <LoginForm />
    </AuthSplitLayout>
  )
}
