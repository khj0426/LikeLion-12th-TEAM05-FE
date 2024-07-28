import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

import { Button, Input } from '@/_components'
import { useContext } from 'react'
import { CurationSelectContext } from '@/_context/curationSelectContext'
import { useCuration } from '@/_hooks/mutation/useCuration'
import Swal from 'sweetalert2'

export const Route = createFileRoute('/curation-select')({
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
    const curation = useContext(CurationSelectContext)
    const navigate = useNavigate({
      from: '/curation-select',
    })
    const { mutate } = useCuration()

    const handleButtonClick = () => {
      if (curation.id) {
        navigate({
          to: '/curation-create',
          search: {
            name: curation.title,
            id: curation.id,
            content: curation.content,
          },
        })
        return
      }

      mutate(
        { name: curation.title, content: curation.content },
        {
          onSuccess: (data) => {
            curation?.setCurationSelect?.({
              ...curation,
              id: data?.id + '',
            })
            navigate({
              to: '/curation-create',
              search: {
                name: curation.title,
                id: data?.id,
                content: curation.content,
              },
            })
          },
        },
      )
    }

    return (
      <main className="relative flex flex-col max-h-[700px] justify-center items-center gap-[50px] p-5">
        <h1 className="text-2xl font-bold">🐸 산책로 큐레이션 만들기</h1>

        <div className="flex flex-col gap-[15px] w-full max-w-[400px]">
          <label htmlFor="qurationName" className="flex flex-col">
            큐레이션 이름
            <Input
              id="qurationName"
              className="w-[350px] mt-2"
              placeholder="ex)일산 산책로 맛집"
              onChange={(e) =>
                curation?.setCurationSelect?.({
                  ...curation,
                  title: e.target.value,
                })
              }
            />
          </label>
        </div>

        <div className="flex flex-col gap-[15px] w-full max-w-[400px]">
          <label htmlFor="qurationDescription" className="flex flex-col">
            큐레이션 설명
            <Input
              id="qurationDescription"
              placeholder="ex)파주,일산러의 파주 일산 산책로 모음집"
              className="w-[350px] mt-2"
              onChange={(e) =>
                curation.setCurationSelect?.({
                  ...curation,
                  content: e.target.value,
                })
              }
            />
          </label>
        </div>

        <div className="flex flex-col gap-[15px] w-full max-w-[400px]">
          <label htmlFor="curationPlace" className="flex flex-col">
            산책로 장소
            <Button variant={'primary'} size="xl" onClick={handleButtonClick}>
              산책로 추가하러 가기
            </Button>
          </label>
        </div>
      </main>
    )
  },
})
