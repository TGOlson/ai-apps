const LOCAL_STORAGE_KEY = 'openai-token';

export const useOpenAIToken = (): [() => string | null, (token: string | null) => void] => {
  const getToken = () => localStorage.getItem(LOCAL_STORAGE_KEY);

  const setToken = (token: string | null) =>
    token ? localStorage.setItem(LOCAL_STORAGE_KEY, token) : localStorage.removeItem(LOCAL_STORAGE_KEY);

  return [getToken, setToken];
};
