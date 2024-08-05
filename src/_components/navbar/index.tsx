import Walk from '../../../public/walk.svg?react'
import { Navbar, Popover } from 'flowbite-react'
import { Link } from '@tanstack/react-router'
import { useThemeMode } from 'flowbite-react'
import { UserContext } from '@/_context/userInfoContext'
import { useContext } from 'react'
import { DarkThemeToggle } from 'flowbite-react'
import { useLogout } from '@/_hooks/mutation'

export const NavBar = () => {
  const { mutate: logout } = useLogout()
  const { name } = useContext(UserContext)
  const { toggleMode } = useThemeMode()

  const handleLogout = () => {
    logout()
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('refreshToken')
    sessionStorage.removeItem('walkmate-name')
    window.location.reload()
  }

  const renderUserPopover = () => (
    <Popover
      aria-labelledby="default-popover"
      content={
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
          <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
            <h3
              role="button"
              aria-label="logout_button"
              tabIndex={0}
              onClick={handleLogout}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogout()
                }
              }}
              id="default-popover"
              className="font-semibold text-gray-900 dark:text-white mb-[15px]"
            >
              로그아웃
            </h3>
            <Link
              id="default-popover"
              className="font-semibold text-gray-900 dark:text-white mt-4"
              to="/mypage"
            >
              마이페이지
            </Link>
          </div>
        </div>
      }
    >
      <span className="text-white-200 flex items-center font-bold">{name}</span>
    </Popover>
  )

  return (
    <Navbar fluid rounded className="bg-primary dark:bg-ONYX">
      <Navbar.Brand className="flex items-center gap-3">
        <Walk width={50} height={50} />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          <Link to="/" className="text-white-200 flex items-center font-bold">
            WalkMate
          </Link>
        </span>
      </Navbar.Brand>

      <div className="flex gap-[10px]">
        <Link to="/" className="text-white-200 flex items-center font-bold">
          Home
        </Link>
        {name && (
          <>
            <Link
              to="/curation-select"
              className="text-white-200 flex items-center font-bold"
            >
              큐레이션 생성
            </Link>
            {renderUserPopover()}
          </>
        )}

        {!name && (
          <Link
            to="/login"
            className="text-white-200 flex items-center font-bold"
          >
            로그인
          </Link>
        )}

        <DarkThemeToggle onClick={toggleMode} style={{ color: '#FFD233' }} />
      </div>
    </Navbar>
  )
}
