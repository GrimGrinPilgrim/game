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
    circal_id: 'integer'
  	/* e.g.
  	nickname: 'string'
  	*/
    
    
  }

};
