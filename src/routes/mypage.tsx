import { createFileRoute, redirect } from '@tanstack/react-router'
import Swal from 'sweetalert2'

export const Route = createFileRoute('/mypage')({
  beforeLoad: () => {
    if (!localStorage.getItem('accessToken')) {
      Swal.fire('로그인이 필요합니다!')
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: () => <div>Hello /mypage!</div>,
})
