let totalAttempts = 0;

export default async function tryUntilResolve(promiseFn, errorMessageFn) {
  let attempts = 0;

  async function attempt(promiseFn) {
    try {
      return await promiseFn();
    } catch (error) {
      attempts++;
      totalAttempts++;

      console.log({
        attempts,
        totalAttempts,
        message: errorMessageFn(error.message),
      });

      return await attempt(promiseFn);
    }
  }

  return await attempt(promiseFn);
}
