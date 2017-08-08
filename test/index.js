import {describe, it} from 'mocha';
import {expect} from 'chai';
import {uploadCard, viewRequest, viewRequests} from '../lib';

const apiKey = process.env.API_KEY || '_YOUR_API_KEY_';
const webhookUrl = process.env.WEBHOOK_URL || '_YOUR_WEBHOOK_URL_';

describe('FullContact Card Reader API', () => {
  it.skip('tests upload', () => {
    return uploadCard({
      apiKey,
      webhookUrl,
      front: '_YOUR_IMAGE_',
      sandbox: 'PROCESSING',
      URID: `UID_${Date.now()}`,
    });
  });

  it.skip('tests view single request', () => {
    return viewRequest({
      apiKey,
      id: '8ef5dd352cebcab6a882797bca64ae0f3a04caef2d9f96ce2c4616282ce126ad',
    });
  });

  it.skip('tests multiple view requests', () => {
    return viewRequests({
      apiKey,
      page: 0,
    });
  });
});
