import { test, expect } from '@playwright/test';
import { BookingApi } from './bookingApi';

test('Get Invalid Booking Id', async () => {

    const bookingApi = new BookingApi();

    const response =
        await bookingApi.getBooking(99999999);

    expect(response.status())
        .toBe(404);

    console.log(
        "Invalid booking id verified"
    );
});
test('Update Booking With Invalid Token', async () => {

    const bookingApi = new BookingApi();

    const response =
        await bookingApi.updateBooking(
            1,
            'invalidtoken123',
            {
                firstname: 'Test'
            }
        );

    expect(response.status())
        .toBe(403);
});
test('Get Booking Using Negative Id', async () => {

    const bookingApi = new BookingApi();

    const response =
        await bookingApi.getBooking(-1);

    console.log(
        response.status()
    );
    const invalidPayload = {

   firstname: '',

   lastname: '',

   totalprice: null
};
});
test('Create Booking With Invalid Payload', async () => {

    const bookingApi = new BookingApi();

    const invalidPayload = {

        firstname: '',

        lastname: '',

        totalprice: null
    };

    const response =
        await bookingApi.createBooking(
            invalidPayload
        );

    console.log(
        "Status:",
        response.status()
    );

    console.log(
        await response.text()
    );
});


