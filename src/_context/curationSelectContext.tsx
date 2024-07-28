import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'
import { PropsWithChildren } from 'react'

type CurationSelectContextProps = {
  id: string
  title: string
  content: string
  setCurationSelect?: Dispatch<SetStateAction<CurationSelectContextProps>>
}

export const CurationSelectContext = createContext<CurationSelectContextProps>({
  id: '',
  title: '',
  content: '',
})

export const CurationSelectProvider = ({ children }: PropsWithChildren) => {
  const [curationSelect, setCurationSelect] =
    useState<CurationSelectContextProps>({
      id: '',
      title: '',
      content: '',
    })
  const value = useMemo(() => {
    return {
      id: curationSelect.id,
      title: curationSelect.title,
      content: curationSelect.content,
      setCurationSelect,
    }
  }, [curationSelect.id, curationSelect.content, curationSelect.title])
  return (
    <CurationSelectContext.Provider value={value}>
      {children}
    </CurationSelectContext.Provider>
  )
}
