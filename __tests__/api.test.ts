import { ApiError } from '../src/api/errors';
import { resetMockApiStore } from '../src/api/mockServer';
import { biocrossApi } from '../src/api/client';
import { authStorage, __resetAuthStorageForTests } from '../src/api/authStorage';
import { apiConfig } from '../src/api/config';

describe('Mock API auth', () => {
  beforeEach(async () => {
    __resetAuthStorageForTests();
    await authStorage.clearTokens();
    await resetMockApiStore();
  });

  it('signs in with demo credentials and returns profile data', async () => {
    const session = await biocrossApi.signIn(apiConfig.demoEmail, apiConfig.demoPassword);
    expect(session.user.email).toBe(apiConfig.demoEmail);
    expect(session.tokens.accessToken).toBeTruthy();

    await authStorage.saveTokens(session.tokens.accessToken, session.tokens.refreshToken);
    const profile = await biocrossApi.getProfile();
    expect(profile.items.length).toBeGreaterThan(0);
  });

  it('rejects invalid credentials', async () => {
    await expect(biocrossApi.signIn('wrong@example.com', 'badpass')).rejects.toThrow(ApiError);
  });

  it('signs up a new user with empty profile', async () => {
    const session = await biocrossApi.signUp('new@example.com', 'password123', 'New User');
    expect(session.user.fullName).toBe('New User');
    expect(session.user.onboardingCompleted).toBe(false);

    await authStorage.saveTokens(session.tokens.accessToken);
    const profile = await biocrossApi.getProfile();
    expect(profile.items).toHaveLength(0);
  });

  it('looks up known demo barcodes', async () => {
    const session = await biocrossApi.signIn(apiConfig.demoEmail, apiConfig.demoPassword);
    await authStorage.saveTokens(session.tokens.accessToken);
    const res = await biocrossApi.lookupBarcode('012345678943');
    expect(res.supplement?.id).toBe('sup-catalog-testo');
  });
});
