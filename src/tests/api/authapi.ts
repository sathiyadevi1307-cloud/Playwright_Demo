import { request } from '@playwright/test';
import { apiConfig } from '../../../config/apiConfig';

export class AuthApi {

    async login() {
        console.log("Email:", apiConfig.email);
        console.log("Password:", apiConfig.password);

        const apiContext = await request.newContext({
            baseURL: apiConfig.baseURL
        });

        return await apiContext.post('/rest/user/login', {
    data: {
        email: 'manishadurai13@gmail.com',
        password: 'Jothi#1307'
    }

        
        });
    }
}