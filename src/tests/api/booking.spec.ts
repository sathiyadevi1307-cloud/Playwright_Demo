import { test, expect } from '@playwright/test';
import { BookingApi } from './bookingApi';
import { bookingPayload } from '../testData/bookingData';
import { apiConfig } from '../../../config/apiConfig';
import { updatedBookingPayload } from '../testData/updateBookingData';

test('Create And Read Booking', async () => {

    const bookingApi = new BookingApi();

    const createResponse =
        await bookingApi.createBooking(
            bookingPayload
        );

    expect(createResponse.status()).toBe(200);

    const createBody =
        await createResponse.json();

    const bookingId =
        createBody.bookingid;

    console.log("Booking Id :", bookingId);

    const getResponse =
        await bookingApi.getBooking(
            bookingId
        );

    expect(getResponse.status()).toBe(200);

    const getBody =
        await getResponse.json();

    console.log(getBody);




    const tokenResponse =
    await bookingApi.generateToken();

const tokenBody =
    await tokenResponse.json();

const token =
    tokenBody.token;

console.log("Token :", token);

const updateResponse =
    await bookingApi.updateBooking(
        bookingId,
        token,
        updatedBookingPayload
    );

expect(updateResponse.status())
    .toBe(200);

const updateBody =
    await updateResponse.json();

console.log(updateBody);



const deleteResponse =
    await bookingApi.deleteBooking(
        bookingId,
        token
    );

expect(deleteResponse.status())
    .toBe(201);

console.log(
    "Booking deleted successfully"
);

const verifyDeletedResponse =
    await bookingApi.getBooking(
        bookingId
    );

expect(verifyDeletedResponse.status())
    .toBe(404);

});
test('Partial Update Booking', async () => {

    const bookingApi = new BookingApi();

    const createResponse =
        await bookingApi.createBooking(
            bookingPayload
        );

    const createBody =
        await createResponse.json();

    const bookingId =
        createBody.bookingid;

    const tokenResponse =
        await bookingApi.generateToken();

    const tokenBody =
        await tokenResponse.json();

    const token =
        tokenBody.token;

    const patchResponse =
        await bookingApi.partialUpdateBooking(
            bookingId,
            token
        );

    expect(patchResponse.status())
        .toBe(200);

    const patchBody =
        await patchResponse.json();

    console.log(patchBody);
});