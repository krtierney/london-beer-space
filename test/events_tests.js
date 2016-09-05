process.env.NODE_ENV = 'test';

var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');

var app = require('../app');
var api = supertest(app);

var Event = require('../models/event');
var User = require('../models/user');

var TOKEN;

describe("event tests", function() {

  beforeEach(function(done) {
    Event.collection.drop();
    done();
  });

  describe("GET /api/events", function() {

    it("should return a 200 response", function(done) {
      api.get('/api/events')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it("should return an array", function(done) {
      api.get('/api/events')
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it("should return an array of objects that contain a 'title' property", function(done) {

      var event = new Event({
        title: "Event",
        description: "event description",
        date: new Date(2016-09-09),
        location: "London"
      });

      event.save(function(err, event) {
        api.get('/api/events')
          .set('Accept', 'application/json')
          .end(function(err, res) {
            expect(res.body[0]).to.have.property('title');
            done();
          });
      });
    });
  });

  describe("POST /api/events without token", function() {

    it("should return a 401 response", function(done) {
      api.post('/api/events')
        .set('Accept', 'application/json')
        .send({
          title: "Event",
          description: "event description",
          date: new Date(2016-09-09),
          location: "London"
        }).expect(401, done);
    });

  });

  describe("POST /api/events with token", function() {

    beforeEach(function(done) {
      var user = new User({
        username: "test",
        email: "test@test.com",
        password: "password",
        passwordConfirmation: "password"
      });

      user.save(function(err, user) {
        api.post('/api/login')
          .set("Accept", "application/json")
          .send({
            email: "test@test.com",
            password: "password"
          }).end(function(err, res) {
            TOKEN = res.body.token;
            done();
          });
      });
    });

    it("should return a 201 response", function(done) {
      api.post('/api/events')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + TOKEN)
        .send({
          title: "Event",
          description: "event description",
          date: new Date(2016-09-09),
          location: "London"
        }).expect(201, done);
    });
  });

  describe("GET /api/events/:id", function() {
    it("should return a 200 response", function(done) {
      var event = new Event({
        title: "Event",
        description: "event description",
        date: new Date(2016-09-09),
        location: "London"
      });

      event.save(function(err, event) {
        api.get('/api/events/' + event._id)
          .set('Accept', 'application/json')
          .expect(200, done);
      });
    });
  });

  describe("DELETE /api/events/:id without token", function() {

    it("should return a 401 response", function(done) {
      var event = new Event({
        title: "Event",
        description: "event description",
        date: new Date(2016-09-09),
        location: "London"
      });

      event.save(function(err, event) {
        api.delete('/api/events/' + event._id)
          .set('Accept', 'application/json')
          .expect(401, done);
      });
    });

  });

  describe("DELETE /api/events/:id with token", function() {

    beforeEach(function(done) {
      var user = new User({
        username: "test",
        email: "test@test.com",
        password: "password",
        passwordConfirmation: "password"
      });

      user.save(function(err, user) {
        api.post('/api/login')
          .set("Accept", "application/json")
          .send({
            email: "test@test.com",
            password: "password"
          }).end(function(err, res) {
            TOKEN = res.body.token;
            done();
          });
      });
    });

    it("should return a 204 response", function(done) {
      var event = new Event({
        title: "Event",
        description: "event description",
        date: new Date(2016-09-09),
        location: "London"
      });

      event.save(function(err, event) {
        api.delete('/api/events/' + event._id)
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + TOKEN)
          .expect(204, done);
      });
    });
  });

});