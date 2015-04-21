import DS from 'ember-data';

export default DS.Model.extend({

  race: DS.belongsTo( 'race' ),

  firstName: DS.attr( 'string' ),
  lastName: DS.attr( 'string' ),

  fullName: function() {
    return this.get( 'firstName' ).trim() + ' ' + this.get( 'lastName' ).trim();
  }.property( 'firstName', 'lastName' )

});
