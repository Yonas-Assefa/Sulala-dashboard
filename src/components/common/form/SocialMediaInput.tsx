import React from 'react'

type Props = {
    socialMedia: 'facebook' | 'instagram'
    error?: string | undefined
}
function SocialMediaInput({ socialMedia, error }: Props) {
    return (
        <div>
            <label htmlFor={socialMedia}>{socialMedia == 'instagram' ? 'Instagram' : 'Facebook'} link</label>
            <div className={`flex flex-row gap-2 border-2 rounded-[30px] px-4 ${error ? 'border-danger bg-dangerlight' : 'bg-white'}`}>
                <img src={socialMedia == 'instagram' ? '/icons/instagram.svg' : '/icons/facebook.svg'} alt="" />
                <input type="text" id={socialMedia} name={socialMedia} placeholder='Insert link' className='input bg-transparent outline-none active:outline-none active:border-0 focus:outline-none focus:border-0' />
            </div>
            {error && <span className="text-xs text-danger">
                {error}
            </span>}
        </div>
    )
}

export default SocialMediaInput