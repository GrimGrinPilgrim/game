/**
 * ShroomTypeController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
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
        res.view({ shroom_type:{}, action:'create', _layoutFile:'../admin_layout.ejs' });
      },

      'create': function(req,res,next){
        ShroomType.create( req.params.all(), function(err, type){
          var fs = require('fs');
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
        });
          // res.redirect('/shroom');
        } );
      },

      'index': function(req,res,next){
        ShroomType.find().done(function(err, shrooms){
          res.view({ shroom_types: shrooms, _layoutFile:'../admin_layout.ejs' });
        });
      },

      'find': function(req,res,next){
        ShroomType.findOne(req.param('id')).done(function(err, shroom){
          Shroom.find({ where: { type_id: shroom.id }}).done(function(err, shrooms) {
            res.view({ shroom_type: shroom, shrooms: shrooms });
          });
        });
      },

      'edit': function(req,res,next) {
        ShroomType.findOne(req.param('id')).done(function(err, shroom){
          res.view({ shroom_type: shroom, action: 'update', _layoutFile:'../admin_layout.ejs' });
        });
      },

      'update': function(req,res,next){
        ShroomType.update( { id: req.param('id') }, 
          { 
            name: req.param('name'), 
            maincolor: req.param('maincolor'), 
            addcolor: req.param('addcolor'),
            svgIcon: req.param('svgIcon'),
            mushIcon: req.param('mushIcon')
          },
          function(err, type){
          console.log(err);
          
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
          } else {
            res.redirect('/shroomType');
          }
        } );
      },

      'destroy' : function (req, res, next) {
          ShroomType.findOneById(req.param('id'), function(err,shroom){
            if(err) return next(err);
            if(shroom) shroom.destroy(function(err){
              if(err)
                return next(err);
              else
                res.redirect('/shroomType');
            });
          })
        },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ShroomTypeController)
   */
  _config: {}

  
};
