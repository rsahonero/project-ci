import http from 'k6/http';
import { check, sleep } from 'k6';
import { getAccessToken } from '../lib/token.js';


const bookingData = JSON.parse(open('../data/booking-data.json'));


export const options = {
    //vus: 1,
    stages: [ 
        { duration: '10s', target: 5 }, 
        { duration: '20s', target: 10 }, 
        { duration: '10s', target: 0 }, 
    ], 
    thresholds: {
        http_req_duration: ['p(95)<500'], 
        http_req_failed: ['rate<0.01'],  
    },
};

export function setup() {
    return getAccessToken();
}

export default function (accessToken) {
    const params = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': accessToken,
        },
    };

    //const booking = bookingData[__ITER];
   
    //const index = __ITER % bookingData.length; 
    const booking = bookingData[0]; 


    const bookingPayload = JSON.stringify({
        client_id : booking.client_id,
        room_id : booking.room_id,
        check_in : booking.check_in,
        check_out : booking.check_out,
        created_by : booking.created_by,
        created_by_id : booking.created_by_id
    });


    const res = http.post('https://crib-imitate-risotto.ngrok-free.dev/v1/bookings/', bookingPayload, params);

    console.log('Response status: ', res.status);
    //console.log('Response body: ', res.body);

    check(res, {
        'status booking is 201': (r) => r.status === 201,
        'response time < 300ms': (r) => r.timings.duration < 300,
    });

    sleep(1);
   

}