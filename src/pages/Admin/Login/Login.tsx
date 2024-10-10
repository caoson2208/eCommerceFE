import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { schema, Schema } from '../../../utils/rules'
import { isAxiosUnprocessableEntityError } from '../../../utils/utils'
import { ErrorResponse } from '../../../types/utils.type'
import { AppContext } from '../../../contexts/app.context'
import Input from '../../../components/Input'
import authApi from '../../../apis/auth.api'
import Button from '../../../components/Button'
import GoogleLoginButton from '../../../components/GoogleLoginButton'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.login(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data: any) => {
        const user = data.data.data.user
        if (user.roles.includes('Admin')) {
          setIsAuthenticated(true)
          setProfile(user)
          navigate('/admin')
        } else {
          setError('email', {
            message: 'Bạn không có quyền truy cập',
            type: 'Server'
          })
        }
      },
      onError: (error: any) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='flex py-48 items-center justify-center'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-6 '>
          <div className='lg:col-span-2 lg:col-start-3'>
            <form className='rounded-2xl bg-white p-10 shadow-2xl' onSubmit={onSubmit} noValidate>
              <div className='text-2xl pb-5 mb-5 text-center'>Đăng nhập</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                errorMessage={errors.password?.message}
                placeholder='Mật khẩu'
                autoComplete='on'
                value='admin@123'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex w-full rounded-lg items-center justify-center bg-[#1e6ddb] py-4 px-2 text-lg text-white hover:bg-[#1e6ddb]/80'
                  isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                >
                  <div className='flex items-center'>
                    <svg
                      className='w-6 h-6 mr-2'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
                      <circle cx='8.5' cy='7' r='4' />
                      <path d='M20 8v6M23 11h-6' />
                    </svg>
                    Đăng nhập
                  </div>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
