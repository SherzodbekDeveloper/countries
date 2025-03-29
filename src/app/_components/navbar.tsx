
import ModeToggle from '@/components/shared/dark-mode'
import { Globe } from 'lucide-react'
import React from 'react'

function Navbar() {
     return (
          <header className='py-6 bg-background backdrop:blur-3xl border-b  sticky top-0 z-50 '>
               <div className='max-w-7xl m-auto px-4 flex items-center justify-between relative'>
                    <div className="logo">
                         <h2 className='font-sans items-center gap-2 text-xl flex sm:text-2xl'><Globe />
                              <span className='hidden sm:flex'>
                                   Where in the world?
                              </span>
                              <span className='flex sm:hidden'>
                                   WITW?
                              </span>
                         </h2>
                    </div>
                    <div className='flex items-center gap-4'>
                         <ModeToggle />
                    </div>
               </div>
          </header>
     )
}

export default Navbar