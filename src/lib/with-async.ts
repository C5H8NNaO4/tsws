export const withAsync = async (cond) =>
  new Promise((resolve) => {
    const __iv = setInterval(() => {
      const res = cond();

      if (res) {
        clearInterval(__iv);
        resolve(res);
      }
    }, 50);
  });
