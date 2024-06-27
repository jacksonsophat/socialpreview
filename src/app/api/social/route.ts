const GET = async (url: string) => {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    // const parsedResponse = await response.json();
    return Response.json({ data: url, status: 200, message: 'Success' })
}


export { GET }