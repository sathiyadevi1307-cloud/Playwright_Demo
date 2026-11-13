import dotenv from 'dotenv';
dotenv.config();

export const apiConfig = {
  baseURL: 'https://preview.owasp-juice.shop/#/login',
  email: process.env.JUICESHOP_USERNAME,
  password: process.env.JUICESHOP_PASSWORD,

  //restful booker api
  bookerUrl: 'https://restful-booker.herokuapp.com'
};
