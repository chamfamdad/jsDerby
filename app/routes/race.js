import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.find( 'race' );
  },

  setupController: function( controller, model ) {

    model.date = new Date( Date.now() ).toLocaleDateString();
    model.time = new Date( Date.now() ).toLocaleTimeString();
    model.scouts = [];
  }
});
