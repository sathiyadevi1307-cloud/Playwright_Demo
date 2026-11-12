import { request } from '@playwright/test';
import { apiConfig } from '../../../config/apiConfig';

export class AuthApi {

    async login() {
        console.log("email:", apiConfig.email);
        console.log("password:", apiConfig.password);

        const apiContext = await request.newContext({
            baseURL: apiConfig.baseURL
        });

        return await apiContext.post('/rest/user/login', {
    data: {
        email: 'sathiyadevi1307@gmail.com',
        password: 'mANI@13072002'
    }

        
        });
    }
}