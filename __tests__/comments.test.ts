import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../src/pages/api/comments';
import { sendEmail, createEmailData } from '../util/sendService';
import { savefeedbackToGoogleSheet } from "../util/google";

jest.mock('../util/sendService', () => ({
  sendEmail: jest.fn(),
  createEmailData: jest.fn(),
}));

jest.mock('../util/google', () => ({
  savefeedbackToGoogleSheet: jest.fn(),
}));

describe('comments API', () => {
  let req: NextApiRequest;
  let res: NextApiResponse;

  beforeEach(() => {
    req = {
      method: '',
      body: {},
    } as NextApiRequest;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as NextApiResponse;
  });

  it('should send email and save to Google Sheet when POST request is made', async () => {
    req.method = 'POST';
    req.body = {
      applicationNumber: '123',
      feeling: 'good',
      comment: 'Great job!',
      postcode: '12345',
    };

    const emailData = { /* mock email data */ };
    createEmailData.mockResolvedValue(emailData);

    await handler(req, res);

    expect(createEmailData).toHaveBeenCalledWith('123', 'good', 'Great job!', '12345');
    expect(sendEmail).toHaveBeenCalledWith(emailData);
    expect(savefeedbackToGoogleSheet).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email sent & google sheet saved successfully' });
  });

  it('should return 405 status when a non-POST request is made', async () => {
    req.method = 'GET';

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: 'Method not allowed' });
  });
});