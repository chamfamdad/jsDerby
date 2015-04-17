import DS from 'ember-data';

export default DS.Model.extend({
    date: DS.attr( 'string' ),
    time: DS.attr( 'string' ),
    scouts: DS.hasMany( 'scout' )
});
