/**
 * Created by toddgeist on 5/3/15.
 *
 * connection is a global connection object setup in bootstrap
 * test is an object declared in bootstrap
 */


// create a layout for our tests
var layout = connection.db(test.dbname).layout(test.layoutname);


describe( 'layout' , function(){
  describe( '#query().send()' , function(){
    it('should return a prop "data" that is an array' , function ( done ){
      var request  = layout.query({'-findall': ''}).set('-max', 10);

      request.send(function (err, result) {
        result.should.have.a.property('data')
            .that.is.an('array');

        done()
      })


    })
  });


  describe( '#find().send()' , function(){
    it('should return the correct record' , function ( done ){
      var request  = layout.find({'id': test.findRecordID})
      request.send(function (err, result) {
        result.should.have.a.property('data')
            .that.is.an('array');
        result.data[0].should.have.a.property('id')
            .that.equals(test.findRecordID);
        done()
      })

    })
  })


});