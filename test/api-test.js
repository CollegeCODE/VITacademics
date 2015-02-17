#!/usr/bin/env node

/*
 *  VITacademics
 *  Copyright (C) 2015  Aneesh Neelam <neelam.aneesh@gmail.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var path = require('path');
var app = require(path.join(__dirname, '..', 'app'));
var codes = require(path.join(__dirname, '..','/api/status')).codes;
var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest(app);

var users = require(path.join(__dirname, '.', 'test-users-cred')).users;

for(var i = 0 ; i<users.length ; i++) {
    var user = users[i];
    describe('Testing User: '+user.describe, function() {

        it('Checking if auto-login is successful', function (done) {
            api.get('/api/v2/'+user.campus+'/login')
                .query({'regno': user.reg_no, 'dob': user.dob})
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.should.have.property('reg_no', user.regno);
                    res.body.should.have.property('dob', user.dob);
                    res.body.should.have.property('campus', user.campus);
                    res.body.should.have.property('status').with.deep.equal(codes.success);
                    done();
                });
        });

        it('Checking if refresh is successful', function (done) {
            api.get('/api/v2/'+user.campus+'/refresh')
                .query({'regno': user.reg_no, 'dob': user.dob})
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.should.have.property('reg_no', user.regno);
                    res.body.should.have.property('dob', user.dob);
                    res.body.should.have.property('campus', user.campus);
                    res.body.should.have.property('status').with.deep.equal(codes.success);
                    done();
                });
        });

        it('Checking if token creation is successful', function (done) {
            api.get('/api/v2/'+user.campus+'/token')
                .query({'regno': user.reg_no, 'dob': user.dob})
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.should.have.property('reg_no', user.regno);
                    res.body.should.have.property('dob', user.dob);
                    res.body.should.have.property('campus', user.campus);
                    res.body.should.have.property('status').with.deep.equal(codes.success);
                    res.body.status.should.deep.equal(codes.success);

                    res.body.should.have.property('share').with.property('token').with.length(6);
                    done();
                });
        });


    });
}


