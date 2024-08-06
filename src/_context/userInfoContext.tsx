import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react'
import { components } from '../../schema'

type UserContextProps = Pick<
  components['schemas']['UserSignUpReqDto'],
  'name' | 'email'
> & {
  setUserInfo?: Dispatch<SetStateAction<UserContextProps>>
}
export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps,
)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const sessionUserInfo = sessionStorage.getItem('walkmate-name') as string
  const [userInfo, setUserInfo] = useState<UserContextProps>({
    name: sessionUserInfo,
    email: '',
  })

  const value = useMemo(() => {
    return {
      name: userInfo?.name ?? '',
      email: userInfo?.email ?? '',
      setUserInfo,
    }
  }, [userInfo?.name])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
