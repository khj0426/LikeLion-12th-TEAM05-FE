import { createFileRoute, redirect } from '@tanstack/react-router'
import { Card } from 'flowbite-react'
import { Input, Button } from '@/_components'
import { UserContext } from '@/_context/userInfoContext'
import { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { useGetLikedCuration } from '@/_hooks/query'
import { loginSchema } from '@/pages/login/loginForm'
import { z, ZodError } from 'zod'
import { useChangeUserInfo } from '@/_hooks/mutation'

export const Route = createFileRoute('/mypage')({
  beforeLoad: () => {
    if (!sessionStorage.getItem('accessToken')) {
      Swal.fire('로그인이 필요합니다!')
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: () => {
    const { email, name, setUserInfo } = useContext(UserContext)
    const { mutate } = useChangeUserInfo()

    const [error, setError] = useState<ZodError | null>(null)
    const [formData, setFormData] = useState<z.infer<typeof loginSchema>>({
      name,
      email,
      password: '',
    })
    const { data: likedCurations } = useGetLikedCuration()
    console.log(likedCurations)
    return (
      <main className="w-[80%] mx-auto my-4">
        <header className="flex justify-center mb-4">
          <h2 className="text-2xl font-bold">🐊 마이페이지</h2>
        </header>
        <section className="flex justify-center gap-[50px] flex-wrap my-[60px] w-full">
          <article className="flex flex-col text-center justify-center mx-auto">
            <h3 className="font-bold text-xl">🐸 나의 산책로 모아보기</h3>
            <Card className="bg-white w-[250px] h-[300px] flex justify-center items-center"></Card>
          </article>

          <article className="flex flex-col text-center justify-center mx-auto">
            <h3 className="font-bold text-xl">🦎 내가 좋아하는 산책로</h3>
            <Card className="bg-white w-[250px] h-[300px] flex justify-center items-center">
              {likedCurations?.curations?.map((curation) => (
                <div key={curation.id} className="text-black">
                  {curation.content}
                </div>
              ))}
            </Card>
          </article>

          <article className="flex flex-col text-center justify-center mx-auto">
            <h3 className="text-xl font-bold">🦖 정보 수정하기</h3>
            <Card className="bg-white flex flex-col justify-center items-center">
              <Input
                placeholder="이름"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                variant={'primary'}
                className="mb-2 w-full"
              />
              <p className="mt-2 text-sm text-red-600 dark:text-red-500 flex justify-center">
                <span className="font-medium">
                  {error?.flatten().fieldErrors['name']}
                </span>
              </p>
              <Input
                type="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="이메일"
                variant={'primary'}
                className="mb-2 w-full"
              />
              <p className="mt-2 text-sm text-red-600 dark:text-red-500 flex justify-center">
                <span className="font-medium">
                  {error?.flatten().fieldErrors['email']}
                </span>
              </p>
              <Input
                type="password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="비밀번호"
                variant={'primary'}
                className="mb-2 w-full"
              />
              <p className="mt-2 text-sm text-red-600 dark:text-red-500 flex justify-center">
                <span className="font-medium">
                  {error?.flatten().fieldErrors['password']}
                </span>
              </p>
              <Button
                variant="register"
                size="xs"
                onClick={() => {
                  try {
                    const zodParser = loginSchema.parse(formData)
                    mutate(
                      {
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                      },
                      {
                        onSuccess: (data) => {
                          if (data && data.name && data?.email) {
                            setUserInfo?.({
                              name: data.name,
                              email: data.email,
                            })
                            setFormData({
                              name: '',
                              email: '',
                              password: '',
                            })
                            setError(null)
                          }
                        },
                      },
                    )
                  } catch (e) {
                    if (e instanceof ZodError) {
                      setError(e)
                    }
                  }
                }}
              >
                수정하기
              </Button>
            </Card>
          </article>
        </section>
      </main>
    )
  },
})
