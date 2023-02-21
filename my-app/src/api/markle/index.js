import axios from 'axios';
const APP_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getMerkleDataApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}whitelist-user/check`,
  });
  return xhr.data.data;
};
export const getWhiteListAddressApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}whitelist-user/list`,
  });
  return xhr.data.data;
};
export const postWhiteListAddressApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}whitelist-user/create`,
    data: data,
  });
  return xhr.data;
};

export const getMerkleSeedDataApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}whitelist-seed/check`,
  });
  return xhr.data.data;
};
export const getSeedWhiteListAddressApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}whitelist-seed/list`,
  });
  return xhr.data.data;
};
export const postSeedWhiteListAddressApi = async (data) => {
  const xhr = await axios.request({
    method: 'post',
    url: `${APP_URL}whitelist-seed/create`,
    data: data,
  });
  return xhr.data.data;
};

export const getPrivateUserMerkleRootApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}whitelist-user/root`,
  });
  return xhr.data.data;
};

export const getSeedUserMerkleRootApi = async () => {
  const xhr = await axios.request({
    method: 'get',
    url: `${APP_URL}whitelist-seed/root`,
  });
  return xhr.data.data;
};
