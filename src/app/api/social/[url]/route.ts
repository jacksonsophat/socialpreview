import { getURLInformation } from "@/actions/actions";
import { NextResponse } from "next/server";

const GET = async (req: Request) => {
    const url = req.url.split('api/social/')[1];
    const originalUrl = decodeURIComponent(url);

    console.log('url', url);
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