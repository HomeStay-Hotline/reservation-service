import http from 'k6/http';
import { check, sleep } from 'k6';

// spike testing
// export const options = {
//   scenarios: {
//     constant_request_rate: {
//       executor: 'constant-arrival-rate',
//       rate: 1000,
//       timeUnit: '1s',
//       duration: '3m',
//       preAllocatedVUs: 800,
//       maxVUs: 1000,
//     },
//   },
// };

// // stress testing
// export const options = {
//   stages: [
//     { duration: '2m', target: 100 },
//     { duration: '10m', target: 100 },
//     { duration: '5m', target: 0 },
//   ],
// };

export const options = {
  vus: 100,
  duration: '10m',
};

export default function () {
  const index = Math.floor(Math.random() * 10000000) + 1;
  const res = http.get(`http://localhost:3000/api/homes/${index}/calendar`);
  check(res, {
    'response code was 200': (res) => res.status === 200,
  });
  // average request takes about 50 ms, sleep for 50ms to total 100ms per request
  // -> 1 second / 100 ms = 10 rps per VUs, 100 VUS * 10 rps = 1000 rps
  sleep(0.05);
}
// http://localhost:3000/api/homes/6000000/calendar
