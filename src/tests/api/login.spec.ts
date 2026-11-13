import { test, expect } from '@playwright/test';
import { AuthApi } from './authapi';

test('Verify Login API', async () => {

    

    const authApi = new AuthApi();

    const response = await authApi.login();

    console.log("Status:", response.status());

    const body = await response.text();

    console.log(body);

    expect(response.status()).toBe(200);
});