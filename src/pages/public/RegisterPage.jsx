import AuthSplitLayout from '@components/auth/AuthSplitLayout'
import RegisterForm from '@components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <AuthSplitLayout
      mode="register"
      title="Create Your Account"
      subtitle="Set up a Trusted Home profile as admin, user, or service provider."
    >
      <RegisterForm />
    </AuthSplitLayout>
  )
}
