// app/providers.tsx
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Suspense } from 'react'
if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        // person_profiles: 'identified_only',
        // capture_pageview: false // Disable automatic pageview capture, as we capture manually
    })
}

export function PHProvider({
    children,
}: {
    children: React.ReactNode
}) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => {
        if (pathname) {
            let url = window.origin + pathname
            if (searchParams.toString()) {
                url = url + '?' + searchParams.toString()
            }
            posthog.capture(
                '$pageview',
                {
                    '$current_url': url,
                }
            )
        }
    }, [pathname, searchParams])

    return <PostHogProvider client={posthog}>
        {/* <Suspense fallback={<p>Loading...</p>}>
        </Suspense> */}
        {children}
    </PostHogProvider>
}