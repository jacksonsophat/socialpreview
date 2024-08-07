import { getURLInformation } from "@/actions/actions";
import { NextResponse } from "next/server";
import { PostHog } from 'posthog-node'




const GET = async (req: Request) => {

    const posthog = new PostHog(
        process.env.NEXT_PUBLIC_POSTHOG_KEY!,
        { host: process.env.NEXT_PUBLIC_POSTHOG_HOST }
    )

    posthog.capture({
        distinctId: 'api_called_from_chrome_extension',
        event: 'api_called'
    });

    await posthog.shutdown()
    // const posthog = usePostHog()
    // posthog?.capture('api_called')
    // Extract the URL search parameters from the request
    const url = new URL(req.url);
    // Get the value of the "url" query parameter
    const urlParam = url.searchParams.get('url');
    const originalUrl = decodeURIComponent(urlParam as string);

    // console.log('originalUrl', originalUrl);
    // Check if originalUrl is a valid URL and starts with https://
    let isValidUrl = originalUrl.startsWith('https');
    try {
        new URL(originalUrl);
    } catch (e) {
        isValidUrl = false;
    }

    if (!isValidUrl) {
        return NextResponse.json({ data: null, status: 400, message: 'Invalid URL (must start with https' });
    }


    try {
        let data = await getURLInformation(originalUrl);
        return NextResponse.json({ data, status: 200, message: 'Success' })
    } catch (error) {
        return NextResponse.json({ data: null, status: 400, message: 'Something went wrong' });

    }
    // let data = 

    return NextResponse.json({ data: originalUrl, status: 200, message: 'Success' })


}


export { GET }