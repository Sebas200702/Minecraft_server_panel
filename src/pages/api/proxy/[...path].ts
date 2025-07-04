import type { APIRoute } from 'astro';

const TARGET_API = 'http://mancosfc.ddns.net:3001/api';

export const POST: APIRoute = async ({ params, request }) => {
    const path = params.path;

    try {
        // Parse request body safely
        let body;
        try {
            body = await request.json();
        } catch (e) {
            body = {};
        }

        console.log(`Proxying POST request to: ${TARGET_API}/${path}`);

        const response = await fetch(`${TARGET_API}/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        // Check if response is ok
        if (!response.ok) {
            console.error(`Target API responded with status: ${response.status}`);
            return new Response(JSON.stringify({
                success: false,
                message: `Error del servidor remoto: ${response.status}`
            }), {
                status: 200, // Return 200 to avoid cascade errors
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Check content type
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error(`Invalid content type: ${contentType}`);
            return new Response(JSON.stringify({
                success: false,
                message: 'Respuesta inválida del servidor remoto'
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Parse response safely
        let data;
        try {
            data = await response.json();
        } catch (parseError) {
            console.error('Failed to parse response JSON:', parseError);
            return new Response(JSON.stringify({
                success: false,
                message: 'Error parseando respuesta del servidor'
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Proxy POST error:', error);
        return new Response(JSON.stringify({
            success: false,
            message: 'Error de conexión con el servidor remoto'
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};

export const GET: APIRoute = async ({ params, url }) => {
    const path = params.path;
    const searchParams = url.searchParams.toString();
    const queryString = searchParams ? `?${searchParams}` : '';

    try {
        console.log(`Proxying GET request to: ${TARGET_API}/${path}${queryString}`);

        const response = await fetch(`${TARGET_API}/${path}${queryString}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        // Check if response is ok
        if (!response.ok) {
            console.error(`Target API responded with status: ${response.status}`);
            return new Response(JSON.stringify({
                success: false,
                message: `Error del servidor remoto: ${response.status}`
            }), {
                status: 200, // Return 200 to avoid cascade errors
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Check content type
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error(`Invalid content type: ${contentType}`);
            return new Response(JSON.stringify({
                success: false,
                message: 'Respuesta inválida del servidor remoto'
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Parse response safely
        let data;
        try {
            data = await response.json();
        } catch (parseError) {
            console.error('Failed to parse response JSON:', parseError);
            return new Response(JSON.stringify({
                success: false,
                message: 'Error parseando respuesta del servidor'
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Proxy GET error:', error);
        return new Response(JSON.stringify({
            success: false,
            message: 'Error de conexión con el servidor remoto'
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};
