import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navbar() {
    return (
        <header className='bg-primary px-4 py-6 flex justify-between'>
            <Link href="/">
                <Image
                    className=''
                    src="/images/logo-dark.png"
                    alt="Social Preview"
                    width={150}
                    height={50} />
            </Link>
            <nav className='flex justify-center font-semibold gap-4'>
                <Link
                    href='/contact'
                >
                    Contact
                </Link>
                <Link
                    href='https://chromewebstore.google.com/detail/social-preview/ndmmpbelpkpalhbcnamlfmhgjbikjmlp'
                    target='_blank'
                >
                    Chrome Ext.
                </Link>

            </nav>
        </header>
    )
}

export default Navbar