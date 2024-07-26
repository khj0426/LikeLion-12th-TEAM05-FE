import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'
import { components } from '../../schema'

type UserContextProps = Pick<
  components['schemas']['UserSignUpReqDto'],
  'name' | 'email'
> & {
  setUserInfo?: Dispatch<SetStateAction<UserContextProps | undefined>>
}
export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps,
)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserContextProps>()

  const value = useMemo(() => {
    return {
      name: userInfo?.name ?? '',
      email: userInfo?.email ?? '',
      setUserInfo,
    }
  }, [userInfo?.name])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
