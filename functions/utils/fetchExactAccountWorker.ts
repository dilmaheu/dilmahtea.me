import type { ENV } from "./types";

export default function fetchExactAccountWorker(
  route: string,
  method: string,
  body: any,
  env: ENV,
): Promise<any> {
  return env.EXACT_ACCOUNT.fetch(env.EXACT_ACCOUNT_WORKER_URL + route, {
    method,
    headers: {
      "content-type": "application/json",
      "x-cf-secure-worker-token": env.CF_SECURE_WORKER_TOKEN,
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}
