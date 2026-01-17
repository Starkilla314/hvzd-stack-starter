const respond = <T = null, E = null>(
  success: boolean,

  message: string,

  data: T = null as T,

  error: E = null as E,
) => ({
  success,

  message,

  data,

  error,
});

export default respond;
