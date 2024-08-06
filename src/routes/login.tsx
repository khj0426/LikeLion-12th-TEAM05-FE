import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/pages/login/loginForm'
import { useEffect } from 'react'

export const Route = createFileRoute('/login')({
  component: () => {
    // URL의 쿼리 파라미터에서 code를 추출
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    useEffect(() => {
      const code = params.get('code')
      console.log(code)
    }, [typeof window !== 'undefined' && code])

    const handleSubmit = async (formData) => {
      // 로그인 처리 로직

      // 만약 code가 존재하면 백엔드로 전송
      if (code) {
        try {
          const response = await fetch(
            'http://your-backend-url/api/auth/google',
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ code }),
            },
          )

          const data = await response.json()
          console.log('Success:', data)
          // 추가적인 처리 (예: 리디렉션)
        } catch (error) {
          console.error('Error:', error)
        }
      }
    }

    return <LoginForm onSubmit={handleSubmit} />
  },
})
