import CreatePasswordForm from './CreatePasswordForm'
import React from 'react'

function CreatePassword() {

  return (
    <div className='text-black w-10/12 flex flex-col gap-8 items-center'>
      {/* CREATE PASSWORD HEADER */}
      <h1 className='text-3xl md:text-[40px] font-serif font-semibold text-center'>Create Password</h1>

      <CreatePasswordForm />
    </div >
  )
}

export default CreatePassword