import { useContext } from 'react'
import Logo from '../../../public/login.svg?react'
import { z, ZodError } from 'zod'
import { ChangeEvent, useState } from 'react'
import { Button, Input } from '@/_components'
import { loginSchema } from '@/pages/login/loginForm'
import Swal from 'sweetalert2'
import { UserContext } from '@/_context/userInfoContext'

import { useSignIn } from '@/_hooks/mutation'
import { useNavigate } from '@tanstack/react-router'

export const SignInForm = () => {
  const { mutate } = useSignIn()
  const [formData, setFormData] = useState<z.infer<typeof loginSchema>>({
    name: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const { setUserInfo } = useContext(UserContext)
  const [error, setError] = useState<ZodError | null>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section className="flex flex-col gap-4 p-5">
      <div className="flex p-4 flex-col items-center justify-center w-full max-w-md mx-auto bg-white rounded-xl shadow-lg">
        <Logo className="w-40 h-40 mt-6" />
        <p className="mt-6 text-2xl text-SLATE font-bold">
          회원가입 하여 즐겨보세요
        </p>

        <div style={{ margin: '0 auto' }}>
          <Input
            placeholder="이름"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            className="w-[350px]"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500 flex justify-center">
            <span className="font-medium">
              {error?.flatten().fieldErrors['name']}
            </span>
          </p>
          <Input
            placeholder="이메일"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="w-[350px]"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500 flex justify-center">
            <span className="font-medium">
              {error?.flatten().fieldErrors['email']}
            </span>
          </p>
          <Input
            placeholder="비밀번호"
            id="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            className="w-[350px]"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500 flex justify-center">
            <span className="font-medium">
              {error?.flatten().fieldErrors['password']}
            </span>
          </p>

          <div className="flex justify-center">
            <Button
              onClick={() => {
                try {
                  loginSchema.parse(formData)
                  setError(null)
                  mutate(
                    {
                      name: formData.name,
                      password: formData.password,
                      email: formData.email,
                    },
                    {
                      onSuccess: () => {
                        if (setUserInfo)
                          setUserInfo({
                            name: formData.name,
                            email: formData.email,
                          })
                        Swal.fire('로그인에 성공했어요')
                        navigate({
                          to: '/',
                        })
                      },
                    },
                  )
                } catch (e) {
                  if (e instanceof ZodError) {
                    setError(e)
                  }
                }
              }}
              variant={'primary'}
              size="xs"
            >
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
