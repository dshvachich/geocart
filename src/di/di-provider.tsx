'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { di } from '@/di/di'

const DIContext = createContext(di)

export const DiProvider = ({ children }: { children: ReactNode }) => (
  <DIContext.Provider value={di}>{children}</DIContext.Provider>
)

export const useContainer = () => useContext(DIContext)
