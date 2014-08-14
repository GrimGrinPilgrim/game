/**
 * Shroom
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	name: 'string',
  	image: 'string',
    status:'string',
  	where: 'text',
  	when: 'text',
  	what: 'text',
  	addDiscription:'text',
    type_id: 'integer',
    circal_id: 'integer',
    recognition: 'string',
    chanse:'integer',
    count: {
      type: 'integer',
      defaultsTo: '0'
    },
    open:{
      type: 'boolean',
      defaultsTo: 'false'
    },
    
  	/* e.g.
  	nickname: 'string'
  	*/
    
    
  },

  beforeUpdate: function(shroom, callback){
    if(!shroom.count)
      shroom.count = 0;
    if(!shroom.open)
      shroom.open = false;
    callback();
  }

};
