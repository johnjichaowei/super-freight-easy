'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon')
const loadPackages = require('../load_packages');
const sampleData = require('fs').readFileSync('./tests/fixtures/order_file_sample.json').toString();
const bucket = 'dummy-bucket'
const key = 'dummy-key';
const s3Client = {
  get: sinon.fake.resolves(sampleData)
};
const expectedPackages = [
  {
    referenceNumber: 36987,
    name: 'Jack A',
    address1: '',
    address2: '2A Dummy Road',
    suburb: 'Highland',
    postcode: '2000',
    state: 'New South Wales',
    phone: '+61 405 222 333',
    email: 'buyer.1@somewhere.com'
  },
  {
    referenceNumber: 36986,
    name: 'Jon B',
    address1: '10',
    address2: 'Happy Place',
    suburb: 'YANCHEP',
    postcode: '6035',
    state: 'WA',
    phone: '+61 400 555 666',
    email: 'buyer.2@somewhere.com'
  }
];

describe('loadPackages', function() {
  it('reads order file content from s3', async function() {
    await loadPackages(bucket, key, s3Client);
    expect(s3Client.get.calledOnceWith(bucket, key)).to.be.true;
  });

  it('returns the packages loaded', async function() {
    const packages = await loadPackages(bucket, key, s3Client);
    expect(packages).to.have.deep.members(expectedPackages);
  });
});
