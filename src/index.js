import 'form-data';
import request from 'request';
import fs from 'fs';


const isHttp = /^https?:/i;

const toFieldData = (str) => {
  if (isHttp.test(str)) {
    // remote uri
    return request(str);
  }
  if (str[0] === '/') {
    // local file
    return fs.createReadStream(str);
  }
  // base64
  return str;
};

const toQueryString = (data) => {
  let qs = '';
  const keys = Object.keys(data);
  for (let i = 0, il = keys.length; i < il; i++) {
    const key = keys[i];
    const val = data[key];
    if (val != null) {
      qs += `${qs ? '&' : ''}${key}=${val}`;
    }
  }
  return qs ? `?${qs}` : '';
};

const endpoint = 'https://api.fullcontact.com/v2/cardReader';

const required = (name, x) => { if (!x) throw new Error(`${name} is required`); };


// https://www.fullcontact.com/developer/docs/card-reader/#upload-card
const uploadCard = ({
  apiKey,
  webhookUrl,
  front,
  back,
  verified,
  returnedData,
  format,
  casing,
  sandbox,
  URID,
  customParams,
  callback,
}) => {
  required('apiKey', apiKey);
  required('webhookUrl', webhookUrl);
  required('front', front);

  const qs = toQueryString({
    ...customParams,
    webhookUrl,
    verified,
    returnedData,
    format,
    casing,
    sandbox,
    URID,
  });

  const formData = {front: toFieldData(front)};
  if (back) formData.back = toFieldData(back);

  // request uses form-data internally
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      url: `${endpoint}${qs}`,
      headers: {
        'X-FullContact-APIKey': apiKey,
      },
      formData,
      json: true,
    }, (...args) => {
      if (callback) callback(...args); // eslint-disable-line callback-return

      const [err, res, body] = args; // eslint-disable-line no-unused-vars
      if (err) {
        reject(err);
      } else {
        const {status} = body;
        if (status >= 400) {
          reject(body);
        } else {
          resolve(body);
        }
      }
    });
  });
};


const viewRequest = ({
  apiKey,
  id,
  returnedData,
  format,
  diagnostics,
  callback,
}) => {
  required('apiKey', apiKey);
  required('id', id);

  const qs = toQueryString({
    returnedData,
    format,
    diagnostics,
  });

  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url: `${endpoint}/${id}${qs}`,
      headers: {
        'X-FullContact-APIKey': apiKey,
      },
      json: true,
    }, (...args) => {
      if (callback) callback(...args); // eslint-disable-line callback-return

      const [err, res, body] = args; // eslint-disable-line no-unused-vars
      if (err) {
        reject(err);
      } else {
        const {status} = body;
        if (status >= 400) {
          reject(body);
        } else {
          resolve(body);
        }
      }
    });
  });
};


const viewRequests = ({
  apiKey,
  page,
  returnedData,
  format,
  diagnostics,
  callback,
}) => {
  required('apiKey', apiKey);

  const qs = toQueryString({
    page,
    returnedData,
    format,
    diagnostics,
  });

  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url: `${endpoint}${qs}`,
      headers: {
        'X-FullContact-APIKey': apiKey,
      },
      json: true,
    }, (...args) => {
      if (callback) callback(...args); // eslint-disable-line callback-return

      const [err, res, body] = args; // eslint-disable-line no-unused-vars
      if (err) {
        reject(err);
      } else {
        const {status} = body;
        if (status >= 400) {
          reject(body);
        } else {
          resolve(body);
        }
      }
    });
  });
};


export {
  uploadCard,
  viewRequest,
  viewRequests,
};

export default {
  uploadCard,
  viewRequest,
  viewRequests,
};
