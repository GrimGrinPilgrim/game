/**
 * CircalController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    'new': function(req,res,next) {
        res.view({ circal:{}, action:'create', _layoutFile:'../admin_layout.ejs' });
      },

    'create': function(req,res,next){
        Circal.create( req.params.all(), function(err, type){
          /*var fs = require('fs');
          var mkdirp = require('mkdirp');
          mkdirp('assets/files/shroom_types/'+type.id, function(err) { 
          fs.readFile(req.files.icon.path, function (err, data) {
                  var newPath = '/files/shroom_types/'+type.id + '/' + req.files.icon.name;
                  fs.writeFile('assets'+newPath, data, function (err) {
                    ShroomType.update({ id: type.id }, { icon:newPath }, function(err,shroom){
                        res.redirect('/shroomType');
                    });
                  });

              });
        });*/
          res.redirect('/circal');
        } );
      },

    'index': function(req,res,next){
      Circal.find().done(function(err, circals){
        res.view({ circals: circals, _layoutFile:'../admin_layout.ejs' });
      });
    },

    'find': function(req,res,next){
      ShroomType.findOne(req.param('id')).done(function(err, shroom){
        res.view({ shroom_type: shroom });
      });
    },

    'edit': function(req,res,next) {
      Circal.findOne(req.param('id')).done(function(err, circal){
        res.view({ circal: circal, action: 'update', _layoutFile:'../admin_layout.ejs' });
      });
    },

    'update': function(req,res,next){
      Circal.update( { id: req.param('id') }, 
        { 
          numberC: req.param('numberC')
        },
        function(err, type){
        console.log(err);
        /*
        if(req.files.icon.size > 0) {
          var fs = require('fs');
          var mkdirp = require('mkdirp');
          console.info(req.param('id'));
          mkdirp('assets/files/shroom_types/'+req.param('id'), function(err) { 

            fs.readFile(req.files.icon.path, function (err, data) {
              var newPath = '/files/shroom_types/'+req.param('id') + '/' + req.files.icon.name;
              fs.writeFile('assets'+newPath, data, function (err) {
                ShroomType.update({ id: req.param('id') }, { icon:newPath }, function(err,shroom){
                    res.redirect('/shroomType');
                });
              });
            });
          });
        } else {*/
          res.redirect('/Circal');
        //}
      } );
    },

    'destroy' : function (req, res, next) {
        Circal.findOneById(req.param('id'), function(err,circal){
          if(err) return next(err);
          if(circal) circal.destroy(function(err){
            if(err)
              return next(err);
            else
              res.redirect('/Circal');
          });
        })
      },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ShroomTypeController)
   */
  _config: {}

  
};