// Import the app
const app = require('../server');
const supertest = require('supertest');
const path = require('path');
const expect = require('chai').expect;
const utils = require('../app/lib/utils');

// To onboard a user
function tutorOnboarding(done) {
  let tutorDetails = {
    publicInfo: {
      firstname: 'Kehinde',
      lastname: 'Faleye',
      gender: 'M',
    },
    personalInfo: {
      email: 'kenny.fale.kf@gmail.com',
      password: 'kenny',
      landMark: 'Lekki Toll Gate',
      address1: 'Ademola Adetokunbo',
      country: 'Nigeria',
      state: 'Lagos',
      location: 'Victoria Island, Lekki',
      phoneNumber: '09052702170',
      educationalLevel: 'BS.c',
    },
    subjectInfo: {
      subject: 'Philosophy',
      level: 'Secondary School',
      hourlyRate: 100,
    },
    jobInfo: {
      bio: 'I can do the job',
      qualifications: ['BSc.'],
      approach: 'Whatever works',
      availablity: 'online',
      distanceWillingTotravel: 30,
    },
  };
  supertest(app)
    .put('/v1/users/tutorSignup')
    .field('tutorDetails', JSON.stringify(tutorDetails))
    .attach('cv', path.join(__dirname + '/resume.pdf'))
    .attach('pic', path.join(__dirname + '/pic.png'))
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        expect(res.status).to.equal(201);
        done();
      }
    });
}

// Adding a new tuttor test
beforeEach('Initialise our controller', () => {
  // Initialise the controller
});

// Test if our server is up and running
describe('Server Health Test', () => {
  it('Server Status', (done) => {
    supertest(app)
      .get('/ping')
      .expect(200)
      .end((err, _res) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

// THis test should check if tutor was saved in database
describe('Tutor Onboarding Test', () => {
  it('Create Tutor', (done) => {
    tutorOnboarding(done);
  });
});

describe('Should return all  veriffied tutors in the database', () => {
  it('Get Verified Tutors', () => {
    // tutorOnboarding(done);
    supertest(app)
      .put('/v1/users/getAllTutors')
      .send({ page: 1 })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).to.equal(200);
          expect(res.tutors).to.have.property('profilePicUrl');
          done();
        }
      });
  });
});

after('Remove the data in the database', async () => {
  const DatabaseHelper = require('../app/services/index');
  const TuttorModel = require('../app/models/users/Tutor');
  const db = new DatabaseHelper(TuttorModel);
  await db.deleteOne({
    email: 'kenny.fale.kf@gmail.com',
  });
  // Delete the object
  await utils.deleteFileFromS3(
    'tutorlinks-uploads',
    'tutors/kenny.fale.kf@gmail.com/dp.png'
  );
  await utils.deleteFileFromS3(
    'tutorlinks-uploads',
    'tutors/kenny.fale.kf@gmail.com/cv.pdf'
  );
});
