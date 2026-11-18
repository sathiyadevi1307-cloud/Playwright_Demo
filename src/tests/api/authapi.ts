
import { request } from '@playwright/test';
import { apiConfig } from '../../../config/apiConfig';

export class AuthApi {
    async login() {
        const username = process.env.JUICESHOP_USERNAME?.trim();
        const password = process.env.JUICESHOP_PASSWORD?.trim();

        if (!username || !password) {
            throw new Error('Juice Shop credentials are missing!');
        }

        const apiContext = await request.newContext({
            baseURL: apiConfig.baseURL
        });

        return apiContext.post('/rest/user/login', {
            data: {
                email: username,
                password
            }
        });
    }
}
