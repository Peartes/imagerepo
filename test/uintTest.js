// For testing each module
const expect = require('chai').expect;
// Import the app
const app = require('../server');
const supertest = require('supertest');
// Our logger
const logger = require('../app/lib/logger');
/* Test saving data to a database */
const DatabaseHelper = require('../app/services/index');
const TuttorModel = require('../app/models/users/Tutor');
const ServicesModel = require('../app/models/offerings/servicemix');
const StatesModel = require('../app/models/locations/states');
// For our s3 uploading
const utils = require('../app/lib/utils');
const fs = require('fs');
const path = require('path');
const mailgun = require('mailgun-js')({
  apiKey: process.env.MailServer_ApiKey,
  domain: process.env.MailServer_Domain,
});
// FOr pur mail template
const mailTemplate = require('../app/commons/mailtemplate');

describe('Save Tutor Record in Database', () => {
  it('should save a record in the database and be able to retrieve it', async () => {
    const db = new DatabaseHelper(TuttorModel);
    // Create tuttor record
    let record = {
      firstname: 'Kehinde',
      lastname: 'Faleye',
      gender: 'M',
      hourlyRate: '30',
      phoneNumber: '09052702170',
      country: 'Nigeria',
      state: 'Lagos',
      email: 'kenny.fale.kf@gmail.com',
      password: 'kehindefaleye',
      landMark: 'Lekki toll gate',
      profilePic: 'https://tosomewhere',
      cv: 'https://tosomewhereelse',
      bio: 'Outgoing',
      availability: 'online',
    };
    // Now save the record
    await db.save(record);
    // Now get the record
    const result = await db.get({
      query: { email: 'kenny.fale.kf@gmail.com' },
      field: 'firstname lastname completionPercentage status',
    });
    // Check our values
    expect(result.firstname).to.equal('Kehinde');
    expect(result.completionPercentage).to.equal(50);
    expect(result.status).to.equal('pending');
    await db.deleteOne({ email: 'kenny.fale.kf@gmail.com' });
  });
});

describe('Upload files', () => {
  it('Save the cv and pic to S3', async () => {
    // Get the file to upload
    let cv = fs.readFileSync(path.join(__dirname, '/resume.pdf'));
    // Get the picutre
    let dp = fs.readFileSync(path.join(__dirname, '/pic.png'));
    let result = await utils.uploadToS3(
      cv,
      'tutorlinks-uploads',
      'tutors/kenny.fale.kf@gmail.com/cv.pdf'
    );
    // Test we received back the location
    expect(result).to.have.property('Location');
    result = await utils.uploadToS3(
      dp,
      'tutorlinks-uploads',
      'tutors/kenny.fale.kf@gmail.com/dp.png'
    );
    // Test we received back the location
    expect(result).to.have.property('Location');
    // Delete the object
    // await utils.deleteFileFromS3(
    //   'tutorlinks-uploads',
    //   'tutors/kenny.fale.kf@gmail.com/kennyResume.pdf'
    // );
  });
});

describe('Test Email', () => {
  it('Send Email', async () => {
    mailgun.messages().send(
      {
        from: process.env.MailServer_Addr,
        to: 'kenny.fale.kf@gmail.com',
        subject: 'Registration Notification',
        // text: 'Testing tutor registration notifiactions',
        html: mailTemplate.mailBody({
          tutor: {
            firstname: 'Kehinde',
            lastname: 'Faleye',
            email: 'kenny.fale.kf@gmail.com',
            gender: 'Male',
            qual: 'BS.c',
          },
        }),
      },
      (error, body) => {
        expect(error).to.be.undefined;
        expect(body).to.have.property('id');
        expect(body.message).to.have.string('Queued');
      }
    );
  });
});

// For getting the services we offer
describe('To get and set all the services we offer', () => {
  it('Put All Services', async () => {
    // Save services into database
    const db = new DatabaseHelper(ServicesModel);
    let offerings = {
      services: [
        {
          serviceType: 'After School Assistance',
          services: [
            'Homework help',
            'After school Assignment',
            'Project Work',
            'Summer Lessons',
          ],
        },
        {
          serviceType: 'Local & international exam preparation',
          services: [
            'Common Entrance',
            'GCE',
            'WASSCE',
            'NECO',
            'NABTEB',
            'CBT',
            'UTME',
            'Post UTME',
            'TOEFL',
            'IELTS',
            'GRE',
            'SAT',
            'IGCSE',
            'GMAT',
            'MIS',
          ],
        },
        {
          serviceType: 'Home Schooling',
          services: [
            'Nigerian Curriculum',
            'GES Curriculum',
            'British curriculum',
            'American curriculum',
          ],
        },
        {
          serviceType: 'Special Needs',
          services: [
            'Autism',
            'Dyslexic',
            'Bad Reading/Writing',
            'sign learning',
          ],
        },
        {
          serviceType: 'Music lessons',
          services: [
            'Piano lessons',
            'guitar lessons',
            'saxophone lessons',
            'drum lessons',
            'organ lessons',
          ],
        },
        {
          serviceType: 'Language lessons',
          services: [
            'English for foreign nationals',
            'French lessons',
            'German lessons',
            'Spanish lessons',
            'Arabic lessons',
            'local dialects',
          ],
        },
        {
          serviceType: 'Adult Education',
          services: ['Based on student’s requirement'],
        },
        {
          serviceType: 'Personnel Learning and Development Solutions',
          services: [
            'Business Management Programs',
            'HRM Programs',
            'Induction Programs',
            'Sales',
            'Marketing and Business Development Programs',
            'Customer success programs',
            'Finance and Account Programs',
          ],
        },
        {
          serviceType: 'Digital Skills',
          services: [
            'Coding',
            'Web and App Dev.',
            'Digital Business Analysis',
            'Digital Design and Data Visualization',
            'Digital Project mgt.',
            'Digital Product mgt.',
            'Digital Marketing',
            'Social Media',
            'Data Science and Data Analytics',
          ],
        },
        {
          serviceType: 'Sports/Games',
          services: [
            'Driving',
            'cycling',
            'skating',
            'swimming',
            'tennis',
            'chess',
            'draught',
            'scrabble',
            'monopoly',
            'billiards',
          ],
        },
        {
          serviceType: 'Culture & tourism',
          services: [
            'Leather Works',
            'exterior/ Interior décor',
            'bridal décor',
            'beadings &fascinators',
            'tie and dye',
            'fashion and design',
          ],
        },
        {
          serviceType: 'Foods and Drinks',
          services: [
            'catering services',
            'cakes',
            'fruit salad',
            'chapman',
            'smoothies',
            'grill',
            'shish kebab',
          ],
        },
        {
          serviceType: 'Cosmetology',
          services: [
            'Perfume',
            'body cream',
            'hair shampoo',
            'mouth washes',
            'bar soap',
            'liquid soap',
            'detergents',
            'disinfectants',
            'insecticide',
            'hand sanitizers',
          ],
        },
      ],
    };
    // Insert into the database
    await db
      .save(offerings)
      .then()
      .catch((error) => {
        assert.isUndefined(error, 'Error occured saving services ' + error);
      });
  });
  it('Get All Services', (done) => {
    supertest(app)
      .get('/v1/services/getAllServices')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body.error).to.not.be.true;
          expect(res.body.data.status).to.equal(200);
          expect(res.body.data.services).to.have.length.above(0);
          done();
        }
      });
  });
});

// For getting states in the database
describe('To get and set all the states in db', () => {
  it('Put All States', async () => {
    // Save services into database
    const db = new DatabaseHelper(StatesModel);
    let states = [
      {
        state: 'Lagos',
        localGovernments: ['LG 1', 'LG2'],
        landMarks: ['LandMark 1', 'LandMark 2'],
      },
      {
        state: 'Osun',
        localGovernments: ['LG 1', 'LG2'],
        landMarks: ['LandMark 1', 'LandMark 2'],
      },
      {
        state: 'Ondo',
        localGovernments: ['LG 1', 'LG2'],
        landMarks: ['LandMark 1', 'LandMark 2'],
      },
      {
        state: 'Abuja',
        localGovernments: ['LG 1', 'LG2'],
        landMarks: ['LandMark 1', 'LandMark 2'],
      },
      {
        state: 'Kaduna',
        localGovernments: ['LG 1', 'LG2'],
        landMarks: ['LandMark 1', 'LandMark 2'],
      },
    ];
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
