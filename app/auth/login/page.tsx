import { UserAuthForm } from '@/components/user-auth-form'

export default function LoginPage() {
  return (
    <div className='min-h-screen'>
      <div className='container flex h-screen w-screen flex-col items-center justify-center'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <h1 className='text-center text-2xl font-semibold tracking-tight'>
            Sign in to your account
          </h1>

          <UserAuthForm />
        </div>
      </div>
    </div>
  )
}
