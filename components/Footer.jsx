import React from 'react'

function Footer() {
  return (
    <footer className='w-full flex flex-center py-3 flex-col'>
        <p>Jose Antonio &copy; 2023</p>
        <p className='text-sm text-slate-500'>
            This is a project from a course by <a href="https://www.youtube.com/@javascriptmastery" className='text-teal-400'>JavaScript Mastery</a>
        </p>
    </footer>
  )
}

export default Footer;