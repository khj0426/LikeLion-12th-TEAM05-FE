import People from '../../../../public/people.svg?react'

import { Banner } from 'flowbite-react'
import { Button } from '@/_components'
import { Link } from '@tanstack/react-router'
export const LoginBanner = () => {
  return (
    <Banner>
      <div className="flex w-full flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm  md:flex-row lg:max-w-7xl">
        <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
          <div className="mb-2 flex items-center border-gray-200 dark:border-gray-600 md:mb-0 md:mr-4 md:border-r md:pr-4">
            <People width={50} height={50} />
          </div>
          <p className="flex items-center text-sm text-gray-500 dark:text-gray-400 w-full font-bold">
            계정이 아직 없다면
          </p>
        </div>
        <div className="flex shrink-0 items-center">
          <Button>
            <Link to="/signin">회원가입</Link>
          </Button>
          <Button
            size="xs"
            onClick={() => {
              window.location.href =
                'https://accounts.google.com/o/oauth2/v2/auth?client_id=279343714696-d5f6vfgjl73t3rj8oinvnghkub63h4v1.apps.googleusercontent.com&redirect_uri=http://localhost:8080/login/oauth2/code/google&response_type=code&scope=email%20profile'
            }}
          >
            구글로 로그인
          </Button>
        </div>
      </div>
    </Banner>
  )
}
