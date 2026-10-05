import http from 'k6/http';

export function getAccessToken() {

    const authPayLoad = JSON.stringify({
        username: 'admin',
        password: 'S3cret@123'
    });

    const authRes = http.post('https://crib-imitate-risotto.ngrok-free.dev/auth/token', authPayLoad, {
        headers: { 'Content-Type': 'application/json'}
    });

    if (authRes.status !== 200) {
        throw new Error(`Auth failed with status: ${authRes.status}: ${authRes.body}`);
    }

    return `Bearer ${authRes.json('access_token')}`;
  
}