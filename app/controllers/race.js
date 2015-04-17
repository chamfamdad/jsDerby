import Ember from 'ember';

export default Ember.Controller.extend({

  newScout: {
    firstName: "",
    lastName: ""
  },

  actions: {

    addScout: function() {
      var addScout = this.store.createRecord( 'scout', {
        firstName: this.get( 'newScout.firstName' ),
        lastName: this.get( 'newScout.lastName' )
      });

      var race = this.get( 'model' );

      console.log( race.date );

      race.scouts.push( addScout );

      this.set( 'newScout.firstName', '' );
      this.set( 'newScout.lastName', '' );
    }
  }
});
