export async function accessAPI(url: string, type: string, params?: any, binary?: boolean) {

    async function fetchData() {
        const options: RequestInit = {
            method: type,
            headers: {
                ...(type === 'POST' && 
                { 
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }),
            },
            ...(type === 'POST' && { body: JSON.stringify(params) }),
        };

        const response = await fetch(`http://127.0.0.1:8000${url}`, options);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        if (binary) {
            return await response.text();
        } else {
            return await response.json();
        }
    }

    return await fetchData();
}