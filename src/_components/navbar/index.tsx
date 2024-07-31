import Walk from '../../../public/walk.svg?react'
import { Navbar } from 'flowbite-react'
import { Link } from '@tanstack/react-router'
import { useThemeMode } from 'flowbite-react'
import { UserContext } from '@/_context/userInfoContext'
import { useContext } from 'react'
import { DarkThemeToggle } from 'flowbite-react'

export const NavBar = () => {
  const { name } = useContext(UserContext)
  const { toggleMode } = useThemeMode()

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
          <Link
            to="/curation-select"
            className="text-white-200 flex items-center font-bold"
          >
            큐레이션 생성
          </Link>
        )}

        {name && (
          <Link
            className="text-white-200 flex items-center font-bold"
            to="/mypage"
          >
            {name}
          </Link>
        )}
        {!name && (
          <Link
            to="/login"
            className="text-white-200 flex items-center font-bold"
          >
            로그인
          </Link>
        )}
        <DarkThemeToggle
          onClick={toggleMode}
          style={{
            color: '#FFD233',
          }}
        />
      </div>
    </Navbar>
  )
}
