// export type UseLocalStorage<T> = [
//   () => T | undefined,
//   (value: T) => void,
//   () => void
// ];

export interface UseLocalStorage<T> {
  get: () => T | undefined
  set: (value: T) => void
  clear: () => void
}

export const useLocalStore = <T>(key: string): UseLocalStorage<T> => {

  const set = (value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      window.console.log(error);
    }
  }

  const get = (): T | undefined => {
    try {
      const item = window.localStorage.getItem(key);

      if (item === null) return undefined;

      return JSON.parse(item);
    } catch (error) {
      window.console.log(error);

      return undefined;
    }
  }

  const clear = (): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      window.console.log(error);
    }
  }

  return {
    set,
    get,
    clear
  }

}