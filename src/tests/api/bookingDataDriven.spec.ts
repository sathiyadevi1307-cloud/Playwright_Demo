import { test, expect } from '@playwright/test';
import { BookingApi } from './bookingApi';
import { bookingTestData } from '../testData/bookingTestData';
import { bookingPayload } from '../testData/bookingData';

test('Create Multiple Bookings', async () => {

    const bookingApi = new BookingApi();

    for (const data of bookingTestData) {

        const response =
            await bookingApi.createBooking({
                
                ...bookingPayload,

                firstname: data.firstname,

                lastname: data.lastname
            });

        expect(response.status())
            .toBe(200);

        const body =
            await response.json();

        console.log(body);
    }
});