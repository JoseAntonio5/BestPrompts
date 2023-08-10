'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

function Nav() {

  const { data: session } = useSession();

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async() => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='fex gap-2 flex-center'>
        <Image 
          src='/assets/images/logo.svg'
          alt='BestPrompts logo'  
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'><span className='logo-gradient'>BestPrompts</span></p>
      </Link>

      {/* desktop nav */}
      <div className='sm:flex hidden'>
        {
          session?.user ? (
            <div className='flex gap-3 md:gap-5 items-center'>
              <Link href='/about' className='font-medium hover:underline'>About</Link>
              <Link href='/create-prompt' className='black_btn'>Create Post</Link>
              <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
              <Link href='/profile'>
                <Image 
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile picture'
                />
              </Link>
            </div>
          ) : (
            <div className='flex gap-3 md:gap-5 items-center'>
              <Link href='/about' className='font-medium hover:underline'>About</Link>
              {
                providers && 
                  Object.values(providers).map((provider) => (
                    <button 
                      type='button' 
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className='black_btn'
                    >
                      Sign In
                    </button>
                  ))
              }
            </div>
          )
        }
      </div>

      {/* mobile nav */}
      <div className='sm:hidden flex relative'>
        {
          session?.user ? (
            <div className='flex'>
              <Image 
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile picture'
                onClick={() => setToggleDropdown((prevState) => !prevState)}
              />
              {
                toggleDropdown && (
                  <div className='dropdown'>
                    <Link
                      href='/profile'
                      className='dropdown_link'
                      onClick={() => setToggleDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href='/about'
                      className='dropdown_link'
                      onClick={() => setToggleDropdown(false)}
                    >
                      About
                    </Link>
                    <Link
                      href='/create-prompt'
                      className='dropdown_link'
                      onClick={() => setToggleDropdown(false)}
                    >
                      Create Prompt
                    </Link>
                    <button 
                      type='button'
                      className='mt-5 w-full black_btn'
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )
              }
            </div>
          ) : (
            <div className='flex gap-3 md:gap-5 items-center'>
              <Link href='/about' className='font-medium hover:underline'>About</Link>
              {
                providers && 
                  Object.values(providers).map((provider) => (
                    <button 
                      type='button' 
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className='black_btn'
                    >
                      Sign In
                    </button>
                  ))
              }
            </div>
          )
        }
      </div>

    </nav>
  )
}

export default Nav