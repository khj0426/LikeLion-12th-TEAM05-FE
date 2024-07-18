import { ThemeContext } from '@/_context/themeContext';
import { Button } from '@/_components';
import Dark from '../../../public/dark.svg?react';
import Light from '../../../public/light.svg?react';
import { useContext } from 'react';

export const ThemeChangeButton = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <Button
      onClick={toggleTheme}
      size="small"
      style={{
        background: 'none',
        border: 'none',
      }}
    >
      {theme === 'light' ? (
        <Dark width={30} height={30} />
      ) : (
        <Light width={30} height={30} />
      )}
    </Button>
  );
};
