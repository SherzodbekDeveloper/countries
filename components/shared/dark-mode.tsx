'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

function ModeToggle() {
     const [mount, setMount] = useState(false)
     const { setTheme, resolvedTheme } = useTheme()

     useEffect(() => setMount(true), [])

     return mount && resolvedTheme === 'dark' ? (
          <Button variant={'ghost'} onClick={() => setTheme('light')}>
               <span className='font-sans text-lg'>
                    Dark mode
               </span>
               < Moon className='text-xl' />

          </Button>
     ) : (
          <Button onClick={() => setTheme('dark')} variant={'ghost'}>
               <span className='font-sans text-lg'>Light mode</span>
               <Sun className='text-xl' />
          </Button>
     )
}

export default ModeToggle
