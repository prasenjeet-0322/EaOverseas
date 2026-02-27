
const fetch = require('node-fetch'); // Assuming node-fetch is available or using built-in fetch in newer node

// If node-fetch isn't available, we'll use http module, but let's try native fetch first (Node 18+)
// If not, we'll use a simple http request function.

const http = require('http');

function checkUrl(url) {
    console.log(`Checking ${url}...`);
    const parsed = new URL(url);
    const options = {
        hostname: parsed.hostname,
        port: parsed.port,
        path: parsed.pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log(`\nResponse from ${url}:`);
            console.log(`Status: ${res.statusCode}`);
            console.log(`Headers:`, res.headers);
            console.log(`Body Prefix: ${data.substring(0, 200)}`);
            if (data.includes('<!DOCTYPE html>')) {
                console.log('Result: HTML (Likely Frontend/Fallback)');
            } else {
                console.log('Result: JSON/Text (Likely Backend)');
            }
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request to ${url}: ${e.message}`);
    });

    req.write(JSON.stringify({ email: "test@example.com" }));
    req.end();
}

checkUrl('http://localhost:5000/api/auth/forgot-password');
checkUrl('http://localhost:5173/api/auth/forgot-password');
