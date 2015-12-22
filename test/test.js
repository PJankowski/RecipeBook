describe('Auth', function() {
  var Auth, $httpBackend;

  beforeEach(module('Recipes'));

  beforeEach(inject(function(_Auth_, _$httpBackend_){
    Auth = _Auth_;
    $httpBackend = _$httpBackend_;
  }));

  describe('Login', function() {
    it('should log a user in and return success', function() {
      $httpBackend.expectPOST('/api/login', {
        email: 'PJankowski25@gmail.com',
        password: 'Payton15'
      })
      .respond(200);
      var succeeded;
      Auth.login({email: 'PJankowski25@gmail.com', password: 'Payton15'})
      .then(function(){
        succeeded = true;
      });
       $httpBackend.flush();
      expect(succeeded).(true);
    });
  });
});