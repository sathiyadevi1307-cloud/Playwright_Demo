import { request } from '@playwright/test';
import { apiConfig } from '../../../config/apiConfig';

export class BookingApi {

    async createBooking(payload:any) {

        const apiContext =
            await request.newContext({
                baseURL: apiConfig.bookerUrl
            });

        return await apiContext.post('/booking',{
            data: payload
        });
    }

    async getBooking(id:number) {

    const apiContext = await request.newContext({
        baseURL: apiConfig.bookerUrl
    });

    return await apiContext.get(`/booking/${id}`);
}
    

async generateToken() {

    const apiContext = await request.newContext({
        baseURL: apiConfig.bookerUrl
    });

    return await apiContext.post('/auth', {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });
}

async updateBooking(bookingId: number,token: string,payload: any) {

    const apiContext = await request.newContext({
        baseURL: apiConfig.bookerUrl
    });

    return await apiContext.put(
        `/booking/${bookingId}`,
        {
            headers: {
                Cookie: `token=${token}`
            },
            data: payload
        }
    );
}

async deleteBooking(
    bookingId: number,
    token: string
) {

    const apiContext = await request.newContext({
        baseURL: apiConfig.bookerUrl
    });

    return await apiContext.delete(
        `/booking/${bookingId}`,
        {
            headers: {
                Cookie: `token=${token}`
            }
        }
    );
}




async partialUpdateBooking(
    bookingId: number,
    token: string
) {

    const apiContext = await request.newContext({
        baseURL: apiConfig.bookerUrl
    });

    return await apiContext.patch(
        `/booking/${bookingId}`,
        {
            headers: {
                Cookie: `token=${token}`
            },
            data: {
                firstname: "Manisha Updated"
            }
        }
    );
}

}


