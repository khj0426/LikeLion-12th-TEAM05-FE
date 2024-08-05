import { createFileRoute, redirect } from '@tanstack/react-router'
import { Card, Spinner } from 'flowbite-react'
import { Input, Button } from '@/_components'
import { useNavigate } from '@tanstack/react-router'
import { UserContext } from '@/_context/userInfoContext'
import { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { useGetLikedCuration, useGetCreatedCuration } from '@/_hooks/query'
import { loginSchema } from '@/pages/login/loginForm'
import { z, ZodError } from 'zod'
import { useChangeUserInfo } from '@/_hooks/mutation'

import { useInfinityQueryObserver } from '@/_hooks'
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
    const {
      data: likedCurations,
      hasNextPage: hasNextLikedCurations,
      fetchNextPage: fetchNewLikedCurations,
    } = useGetLikedCuration()
    const {
      data: createdCurations,
      hasNextPage: hasNextCreatedCuration,
      fetchNextPage: fetchNewCreatedCurations,
    } = useGetCreatedCuration()
    const { target: createdCurationTarget } = useInfinityQueryObserver({
      threshold: 0.1,
      fetchNextPage: fetchNewCreatedCurations,
      hasNextPage: hasNextCreatedCuration,
    })

    const { target: likedCurationTarget } = useInfinityQueryObserver({
      threshold: 0.1,
      fetchNextPage: fetchNewLikedCurations,
      hasNextPage: hasNextLikedCurations,
    })

    const navigate = useNavigate()
    const onClickCuration = (id: string) => {
      navigate({
        to: '/curation-detail',
        search: {
          id: Number(id),
        },
      })
    }
    return (
      <main className="w-[80%] mx-auto my-4">
        <header className="flex justify-center mb-4">
          <h2 className="text-2xl font-bold">🐊 마이페이지</h2>
        </header>
        <section className="flex justify-center gap-[30px] flex-wrap my-[60px] w-full">
          <article className="flex flex-col text-center justify-center mx-auto">
            <h3 className="font-bold text-xl mb-2">🐸 나의 산책로 모아보기</h3>
            <Card className="bg-white w-[350px] h-auto flex flex-col justify-center items-center p-4 shadow-lg rounded-lg">
              <div className="w-full max-h-[300px] overflow-y-auto p-4">
                {createdCurations?.pages.flat().map((item, index) => (
                  <div key={index} className="w-[full]">
                    {item.response?.curations?.map((curation) => (
                      <div
                        key={curation.id}
                        className="flex justify-between items-center text-black cursor-pointer dark:text-white p-2 mb-2 border-b border-gray-300 hover:bg-gray-100 transition duration-200 line-clamp-2"
                      >
                        <span
                          className="flex"
                          onClick={(e) => {
                            e.stopPropagation()
                            onClickCuration(String(curation.id))
                          }}
                        >
                          {curation.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
                {hasNextCreatedCuration && <Spinner />}
                <div ref={createdCurationTarget} className="h-10"></div>
              </div>
            </Card>
          </article>

          <article className="flex flex-col text-center justify-center mx-auto max-h-[700px]">
            <h3 className="font-bold text-xl mb-2">🦎 내가 좋아하는 산책로</h3>
            <Card className="line-clamp-2 bg-white w-[350px] h-auto flex flex-col justify-center items-center p-4 shadow-lg rounded-lg">
              {likedCurations?.pages.flat().map((item, index) => (
                <div key={index}>
                  {item.response?.curations?.map((curation) => (
                    <div
                      onClick={() => onClickCuration(curation.id + '')}
                      key={curation.id}
                      className="text-black cursor-pointer dark:text-white p-2 mb-2 border-b border-gray-300 hover:bg-gray-100 transition duration-200"
                    >
                      {curation.name}
                    </div>
                  ))}
                </div>
              ))}
              <div ref={likedCurationTarget} className="h-10"></div>
            </Card>
          </article>

          <article className="flex flex-col text-center justify-center mx-auto">
            <h3 className="text-xl font-bold mb-2">🦖 정보 수정하기</h3>
            <Card className="bg-white flex flex-col justify-center items-center p-4 shadow-lg rounded-lg line-clamp-2">
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
                    loginSchema.parse(formData)
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
