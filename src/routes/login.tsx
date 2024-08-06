import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/pages/login/loginForm'
import { useEffect, useContext } from 'react'
import { UserContext } from '@/_context/userInfoContext'
import { useNavigate } from '@tanstack/react-router'

interface UserInfo {
  name: string
  email: string
}

interface UserContextType {
  setUserInfo: (userInfo: UserInfo) => void
}

export const Route = createFileRoute('/login')({
  component: () => {
    const params = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const code = params.get('code')
    const context = useContext(UserContext) as UserContextType

    useEffect(() => {
      const googleLogin = async () => {
        if (code) {
          try {
            const response = await fetch(
              `https://hayeongyou.shop/login?code=${code}`,
              {
                method: 'GET', // GET 메서드 사용
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )

            if (!response.ok) {
              throw new Error('Network response was not ok')
            }

            const data = await response.json()

            sessionStorage.setItem('accessToken', data.accessToken)

            if (context && context.setUserInfo) {
              context.setUserInfo({
                name: 'user',
                email: '123123@naver.com',
              })
              navigate({ to: '/' })
            }
          } catch (error) {
            console.error('Login error:', error)
          }
        }
      }
      googleLogin()
    }, [code, context, navigate])

    const handleSubmit = async () => {
      if (code) {
        try {
          const response = await fetch(
            'http://your-backend-url/api/auth/google',
            {
              method: 'POST', // POST 메서드로 설정
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ code }),
            },
          )

          if (!response.ok) {
            throw new Error('Network response was not ok')
          }

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
