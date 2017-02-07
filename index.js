(function(){
  'use strict';
  angular
    .module('angular-indexedDB', [])
      .service('IndexedDB',[
        '$q',
        Service
      ])

    function Service($q){

      var self = this;
      var db;
       // Default messages
       var messages = {
         'initSuccessMessage': {
           status: 200,
           message: 'Successfully intialized indexedDB'
         },
         'initErrorMessage': {
           status: 422,
           message: 'Your browser doesn\'t support indexDB'
         },
         'addSucess':{
           status: 200,
           message: 'Successfully added'
         },
         'addError':{
           status: 422,
           message: 'Already added in database'
         },
         'removeSuccess':{
           status: 200,
           message: 'Successfully removed'
         },
         'removeError': {
           status: 422,
           message: 'The data with this key doesn\'t exist'
         },
         'updateSuccess':{
           status: 200,
           message: 'Successfully updated'
         },

       }
      // Initalize the indexedDB
      self.init = init;
      //  add  data
      self.add = add;

      // remove data
      self.remove = remove;

      // update data
      self.update = update;


      function init(dbName, Scheme, key){

        return $q(function(resolve, reject){
            if (!window.indexedDB){
              return reject(messages.initErrorMessage);
            }
            var request = window.indexedDB.open(dbName, 3);
            request.onerror = function(event){
              return reject(event.target)
            }
            request.onsuccess = function(event) {
              db = request.result;
           };
           request.onupgradeneeded = function(event){
             db = event.target.result;
             var objectStore = db.createObjectStore(Scheme, {keyPath: key});
           }
        })

      }

      function add(Scheme,  data){

        return $q(function(resolve, reject){
          var request = db.transaction([Scheme], "readwrite")
          .objectStore(Scheme)
          .add(data);

          request.onsuccess = function(event) {
            resolve(messages.addSucess)
          };

          request.onerror = function(event) {
            reject(messages.addError);
          }

        })
      }

      function remove(scheme, key) {
        var $q(function(resolve, reject){
          var request = db.transaction([scheme], "readwrite")
            .objectStore(scheme)
            .delete(key);

            request.onsuccess = function(event) {
               resolve(messages.removeSuccess);
            };
            request.onerror = function(event) {
              reject(messages.removeError);
            }
        })
      }

      function update(){

      }


    }

})();
