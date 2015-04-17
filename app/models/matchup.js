import DS from 'ember-data';

export default DS.Model.extend({
  laneOne: DS.belongsTo( 'scout' ),
  laneTwo: DS.belongsTo( 'scout' ),
  winner: DS.belongsTo( 'scout' )
});
