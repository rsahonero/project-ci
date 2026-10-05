import http from 'k6/http'
import { check, sleep } from 'k6';
import { getAccessToken } from '../lib/token.js';


export const options = {
    stages: [
        { duration: '30s', target : 20 },  
        { duration: '1m', target : 20 },  
        { duration: '30s', target: 0 }  
    ],
    thresholds:{
        'http_req_failed' : ['rate<0.01'],  
        'http_req_duration' : ['p(95)<500'], 
        'checks': ['rate>0.99'],
    }
};

export function setup() {
  return getAccessToken();
}


export default function (accessToken) {

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken, 
    },
  
    tags: {
      name: 'ConsultarProveedores', 
      service: 'providers',         
    },
  };

  // 3. Hacemos la petición GET
  const res = http.get('https://crib-imitate-risotto.ngrok-free.dev/v1/suppliers/', params);

  // 4. Validaciones (Checks)
  check(res, {
    'status es 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  // console.log(`Status: ${res.status} - Body: ${res.body}`);
  sleep(1);
  
}