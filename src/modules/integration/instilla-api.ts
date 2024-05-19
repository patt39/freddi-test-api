import axios from 'axios';

const axiosApi = axios.create({
  baseURL: `https://instilla-sales-tax-problem.s3.eu-central-1.amazonaws.com`,
  headers: {
    Accept: 'application/json',
    'Accept-Language': 'it-it',
    'Content-type': 'application/json',
  },
});

export const getInstillaApi = async () => {
  const { data } = await axiosApi.get('/sales-tax-problem-test.json');

  return data;
};
