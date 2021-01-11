// Import the asserter
const expect = require('chai').expect;
// Our logger
const logger = require('../app/lib/logger');
/* Test saving data to a database */
const DatabaseHelper = require('../app/services/index');
const ImagesModel = require('../app/models/Images/images');

describe('Put ready images into the database', () => {
  it('Put calm images into database', async () => {
    let imagesUrl = [
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379723/shopify/calm/calm1_fx0byn.jpg',
        tags: ['calm'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379723/shopify/calm/calm7_xhrg1x.jpg',
        tags: ['calm'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379722/shopify/calm/calm5_d26dtb.jpg',
        tags: ['calm'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379721/shopify/calm/calm2_sqgirw.jpg',
        tags: ['calm'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379721/shopify/calm/calm3_stu24f.jpg',
        tags: ['calm'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379720/shopify/calm/calm6_pogs12.jpg',
        tags: ['calm'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379719/shopify/calm/calm4_xgsxif.jpg',
        tags: ['calm'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379718/shopify/calm/calm8_lxc9un.jpg',
        tags: ['calm'],
      },
    ];
    // Insert into the database
    await db
      .saveBulk(imagesUrl)
      .then()
      .catch((error) => {
        assert.isUndefined(error, 'Error occured saving services ' + error);
      });
  });

  it('Get All States', (done) => {
    supertest(app)
      .get('/v1/locations/getAllStates')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          logger.debug(res);
          expect(res.body.error).to.not.be.true;
          expect(res.body.data).to.exist;
          expect(res.body.data.status).to.equal(200);
          expect(res.body.data.states).to.have.length.above(0);
          logger.debug(res.body.data.states);
          done();
        }
      });
  });
});

describe('To get an image from the repository', () => {
  it('Gets one random image based on mood', async () => {
    // Insert into the database
    await db
      .saveBulk(states)
      .then()
      .catch((error) => {
        assert.isUndefined(error, 'Error occured saving services ' + error);
      });
  });

  it('Get All States', (done) => {
    supertest(app)
      .get('/v1/locations/getAllStates')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          logger.debug(res);
          expect(res.body.error).to.not.be.true;
          expect(res.body.data).to.exist;
          expect(res.body.data.status).to.equal(200);
          expect(res.body.data.states).to.have.length.above(0);
          logger.debug(res.body.data.states);
          done();
        }
      });
  });
});
