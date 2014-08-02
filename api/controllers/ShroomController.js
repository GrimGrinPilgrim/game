/**
 * ShroomController
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
      ShroomType.find().done(function(err,types){
    	 res.view({ shroom_types: types, shroom:{}, action:'create', _layoutFile:'../admin_layout.ejs' });
      });
    },
    'create': function(req,res,next){
    	console.log(req.params.all());
    	Shroom.create( req.params.all(), function(err, shroom){
    		var fs = require('fs');
    		var mkdirp = require('mkdirp');
    		mkdirp('assets/files/shrooms/'+shroom.id, function(err) { 
				fs.readFile(req.files.image.path, function (err, data) {
		            var newPath = '/files/shrooms/'+shroom.id + '/' + req.files.image.name;
		            fs.writeFile('assets'+newPath, data, function (err) {
		            	Shroom.update({ id: shroom.id }, { image:newPath }, function(err,shroom){
		                	res.redirect('/shroom');
		            	});
		            });

		        });
			});
    		// res.redirect('/shroom');
    	} );
    },
    'index': function(req,res,next){
    	Shroom.find().done(function(err, shrooms){
    		res.view({ shrooms: shrooms, _layoutFile:'../admin_layout.ejs' });
    	});
    },
    'find': function(req,res,next){
    	Shroom.findOne(req.param('id')).done(function(err, shroom){
        ShroomType.findOne(shroom.type_id, function(err, type){
          res.view({ shroom_type: type, shroom: shroom });
        });
    	});
    },
    'edit': function(req,res,next) {
      ShroomType.find().done(function(err,types){
        Shroom.findOne(req.param('id')).done(function(err, shroom){
          res.view({ shroom_types: types, shroom: shroom, action: 'update', _layoutFile:'../admin_layout.ejs' });
        });
      })
    },
    'update': function(req,res,next){
    	Shroom.update( { id: req.param('id') }, 
        { 
          name: req.param('name'), 
          status: req.param('status'), 
          where: req.param('where'), 
          what:req.param('what'), 
          addDiscription:req.param('addDiscription'),
          type_id:req.param('type_id')
        },
        function(err, shroom){
    		console.log(err);
        
        if(req.files.image.size > 0) {
          var fs = require('fs');
          var mkdirp = require('mkdirp');
          console.info(req.param('id'));
          mkdirp('assets/files/shrooms/'+req.param('id'), function(err) { 

            fs.readFile(req.files.image.path, function (err, data) {
              var newPath = '/files/shrooms/'+req.param('id') + '/' + req.files.image.name;
              fs.writeFile('assets'+newPath, data, function (err) {
                Shroom.update({ id: req.param('id') }, { image:newPath }, function(err,shroom){
                    res.redirect('/shroom');
                });
              });
            });
          });
        } else {
          res.redirect('/shroom');
        }
    	} );
    },
    'destroy' : function (req, res, next) {
        Shroom.findOneById(req.param('id'), function(err,shroom){
          if(err) return next(err);
          if(shroom) shroom.destroy(function(err){
            if(err)
              return next(err);
            else
              res.redirect('/shroom');
          });
        })
      },
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ShroomController)
   */
  _config: {}

  
};
