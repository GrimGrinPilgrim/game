/**
 * GameController
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

  'renderCardSet' : function(req,res,next){
    res.view('home/circal_1/cardSet', { _layoutFile: '' });
  },
  'renderStuffSet' : function(req,res,next){
    res.view('home/circal_1/creatures', { _layoutFile: '' });
  },
  'renderMap' : function(req,res,next){
    res.view('home/circal_1/map', { _layoutFile: '' });
  },
  'FirstGluck' : function(req,res,next){
    res.view('home/circal_1/first trip eff', { _layoutFile: '' });
  },
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ShroomTypeController)
   */
  _config: {}

  
};