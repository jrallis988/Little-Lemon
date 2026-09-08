/** Jest mock for expo-secure-store in Node tests */
const store: Record<string, string> = {};

module.exports = {
  setItemAsync: jest.fn(async (key: string, value: string) => {
    store[key] = value;
  }),
  getItemAsync: jest.fn(async (key: string) => store[key] ?? null),
  deleteItemAsync: jest.fn(async (key: string) => {
    delete store[key];
  }),
  __clear: () => {
    for (const k of Object.keys(store)) delete store[k];
  },
};
