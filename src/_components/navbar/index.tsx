import Walk from '../../../public/walk.svg?react';
import { Navbar } from 'flowbite-react';
import { Link } from '@tanstack/react-router';
import { useThemeMode } from 'flowbite-react';
import { DarkThemeToggle } from 'flowbite-react';
export const NavBar = () => {
  const { toggleMode } = useThemeMode();
  return (
    <Navbar fluid rounded className="bg-primary dark:bg-ONYX">
      <Navbar.Brand className="flex items-center gap-3">
        <Walk width={50} height={50} />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          WalkMate
        </span>
      </Navbar.Brand>

      <div className="flex gap-[10px]">
        <Link to="/" className="text-white-200 flex items-center font-bold">
          Home
        </Link>
        <Link
          to="/login"
          className="text-white-200 flex items-center font-bold"
        >
          로그인
        </Link>
        <DarkThemeToggle
          onClick={toggleMode}
          style={{
            color: '#FFD233',
          }}
        />
      </div>
    </Navbar>
  );
};
