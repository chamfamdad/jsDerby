import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.createRecord( 'race' );
  },

  setupController: function( controller, model ) {

    model.set( 'date', new Date( Date.now() ).toLocaleDateString() );
    model.set( 'time', new Date( Date.now() ).toLocaleTimeString() );
    
    controller.set( 'model', model );
  }
});
