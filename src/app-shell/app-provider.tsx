'use client'

import { type ReactNode } from 'react'
import { DiProvider } from '@/di/di-provider'
import '@/i18n'

export const AppProvider = ({ children }: { children: ReactNode }) => <DiProvider>{children}</DiProvider>
