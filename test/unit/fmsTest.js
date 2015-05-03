/**
 * Created by toddgeist on 5/3/15.
 */


/*
 "connection" is a global created in bootstrap.js
 */


describe('FMS', function () {

    describe('#dbnames', function () {
        it('should return a object with a prop an array prop "data"', function (done) {

            connection.dbnames().send(function (err, databases) {

                databases
                    .should.be.an('object')
                    .with.a.property('data')
                    .that.is.an('array');

                done()
            })
        })
    });

    describe( 'db' , function(){
      it('should return an object if given a name' , function ( ){
          connection.db('FMServer_Sample').should.be.an('object')
      })
    });

    describe('#layoutnames', function () {
        it('should return a object with a prop an array prop "data"', function (done) {

            connection
                .db('FMServer_Sample')
                .layoutnames()
                .send(function (err, layouts) {

                    layouts
                        .should.be.an('object')
                        .with.a.property('data')
                        .that.is.an('array');

                    done()
                })
        })
    });

    describe('#scriptnames', function () {
        it('should return a object with a prop an array prop "data"', function (done) {

            var db =connection
                .db('FMServer_Sample')

            db.scriptnames()
                .send(function (err, scripts) {

                    scripts
                        .should.be.an('object')
                        .with.a.property('data')
                        .that.is.an('array');

                    done()
                })
        })
    })


})