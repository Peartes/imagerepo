// Import the asserter
const expect = require('chai').expect;
// For express testing
const supertest = require('supertest');
// And now the application itself
const app = require('../app/app');
// For file upload
const path = require('path');
// Our logger
const logger = require('../app/lib/logger');
/* Test saving data to a database */
const DatabaseHelper = require('../app/services/index');
const ImagesModel = require('../app/models/Images/images');

describe('To add an image to the repository', () => {
  it('Add image to repo', (done) => {
    supertest(app)
      .post('/images/addimage')
      .field('moods', JSON.stringify(['depressed']))
      .attach('image', path.join(__dirname, './testImage.png'))
      .end((err, res) => {
        if (err) {
          logger.error(err);
          done(err);
        } else {
          // logger.debug(res);
          expect(res.status).to.equal(200);
          done();
        }
      });
  });
});

describe('Put ready images into the repo', () => {
  it('Put calm images into the repo', async () => {
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
    const db = new DatabaseHelper(ImagesModel);
    await db
      .saveBulk(imagesUrl)
      .then()
      .catch((error) => {
        assert.isUndefined(error, 'Error occured saving services ' + error);
      });
  });
});

describe('To get an image from the repository', () => {
  it('Get an image', (done) => {
    supertest(app)
      .get('/images/getimage/calm?w=100&h=200')
      .end((err, res) => {
        if (err) {
          // logger.error(err);
          done(err);
        } else {
          logger.debug(res);
          expect(res.status).to.equal(200);
          //expect(res.text.data.image).to.have.length.above(0);
          done();
        }
      });
  });
});
