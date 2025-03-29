
import ModeToggle from '@/components/shared/dark-mode'
import React from 'react'

function Navbar() {
     return (
          <header className='py-6 bg-background backdrop:blur-3xl border-b  sticky top-0 z-50 '>
               <div className='max-w-7xl m-auto px-4 flex items-center justify-between relative'>
                    <div className="logo">
                         <h2 className='font-sans text-2xl'>Where in the world?</h2>
                    </div>
                    <div className='flex items-center gap-4'>
                         <ModeToggle />
                    </div>
               </div>
          </header>
     )
}

export default Navbar