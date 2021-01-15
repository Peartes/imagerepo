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

  it('Put happy images into the repo', async () => {
    let imagesUrl = [
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379551/shopify/happy/happy1_zus6tp.jpg',
        tags: ['happy'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379546/shopify/happy/happy9_pap8hs.jpg',
        tags: ['happy'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379545/shopify/happy/happy3_qs93vs.jpg',
        tags: ['happy'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379544/shopify/happy/happy2_uh6vbf.jpg',
        tags: ['happy'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379544/shopify/happy/happy4_ygsakq.jpg',
        tags: ['happy'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379543/shopify/happy/happy6_v5xspc.jpg',
        tags: ['happy'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379543/shopify/happy/happy8_newqqq.jpg',
        tags: ['happy'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379542/shopify/happy/happy5_mkajol.jpg',
        tags: ['happy'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379542/shopify/happy/happy7_o4z5h0.jpg',
        tags: ['happy'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379540/shopify/happy/happy10_kehtmp.jpg',
        tags: ['happy'],
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

  it('Put depressed images into the repo', async () => {
    let imagesUrl = [
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379690/shopify/depressed/depressed1_q2xv9s.jpg',
        tags: ['depressed'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379690/shopify/depressed/depressed4_idbed1.jpg',
        tags: ['depressed'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379688/shopify/depressed/depressed3_dxgsbx.jpg',
        tags: ['depressed'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379688/shopify/depressed/depressed2_w5nqqm.jpg',
        tags: ['depressed'],
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

  it('Put lonely images into the repo', async () => {
    let imagesUrl = [
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379464/shopify/lonely/lonely1_crfatu.jpg',
        tags: ['lonely'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379462/shopify/lonely/lonely4_eimrwf.jpg',
        tags: ['lonely'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379461/shopify/lonely/lonely2_xiqlcb.jpg',
        tags: ['lonely'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379461/shopify/lonely/lonely8_ucnsgj.jpg',
        tags: ['lonely'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379461/shopify/lonely/lonely9_dcfb4t.jpg',
        tags: ['lonely'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379459/shopify/lonely/lonely3_zihcjb.jpg',
        tags: ['lonely'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379459/shopify/lonely/lonely5_rgufwb.jpg',
        tags: ['lonely'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379458/shopify/lonely/lonely6_l4rcei.jpg',
        tags: ['lonely'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610379457/shopify/lonely/lonely7_qbj9yw.jpg',
        tags: ['lonely'],
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

  it('Put sad images into the repo', async () => {
    let imagesUrl = [
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610378798/shopify/sad/sad1_q5pm4w.jpg',
        tags: ['sad'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610378797/shopify/sad/sad4_mw7x5x.jpg',
        tags: ['sad'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610378796/shopify/sad/sad3_zkq84e.jpg',
        tags: ['sad'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610378793/shopify/sad/sad7_y2ppmu.jpg',
        tags: ['sad'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610378793/shopify/sad/sad6_htedvl.jpg',
        tags: ['sad'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610378793/shopify/sad/sad2_jj37sr.jpg',
        tags: ['sad'],
      },
      {
        imageUri:
          'https://res.cloudinary.com/dwhrr1qfw/image/upload/v1610378792/shopify/sad/sad5_aruxzl.jpg',
        tags: ['sad'],
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
