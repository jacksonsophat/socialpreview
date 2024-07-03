import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navbar() {
    return (
        <header className='bg-primary px-4 py-6 flex justify-between'>
            <Link href="/">
                <Image src="/images/logo-dark.png"
                    alt="Social Preview"
                    width={150}
                    height={50} />
            </Link>
            <nav>
                <ul className='flex justify-center font-semibold'>
                    <Link
                        href='https://chromewebstore.google.com/detail/social-preview/ndmmpbelpkpalhbcnamlfmhgjbikjmlp'
                        target='_blank'
                    >
                        Chrome Extension
                    </Link>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar