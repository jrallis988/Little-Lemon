/** Jest mock for AsyncStorage in Node tests */
const store: Record<string, string> = {};

module.exports = {
  setItem: jest.fn(async (key: string, value: string) => {
    store[key] = value;
  }),
  getItem: jest.fn(async (key: string) => store[key] ?? null),
  removeItem: jest.fn(async (key: string) => {
    delete store[key];
  }),
  multiRemove: jest.fn(async (keys: string[]) => {
    for (const k of keys) delete store[k];
  }),
  __clear: () => {
    for (const k of Object.keys(store)) delete store[k];
  },
};
