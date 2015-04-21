import Ember from 'ember';


function getHomeIndex( numteams, round, game ) {
  return game === 1 ? 0 : ( round + game - 2 ) % ( numteams - 1 ) + 1;
}

function getAwayIndex( numteams, round, game ) {
  return ( numteams - 1 + round - game ) % ( numteams - 1 ) + 1;
}

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

      addScout.save();

      var race = this.get( 'model' );

      race.get( 'scouts' ).pushObject( addScout );

      this.set( 'newScout.firstName', '' );
      this.set( 'newScout.lastName', '' );
    },

    start: function() {
      var race = this.get( 'model' );
      var matchups = race.get( 'matchups' );
      var scouts = race.get( 'scouts' );
      var numEventTeams = scouts.length;
      var bOdd = false;
      var currentRound;
      var currentGame;
      var homeIndex;
      var awayIndex;
      var matchup;

      if( numEventTeams % 2 !== 0 ) {
        numEventTeams += 1;
        bOdd = true;
      }

      // forwards
      for( currentRound = 1; currentRound < numEventTeams; currentRound++ )
      {
        for ( currentGame = 1; currentGame <= numEventTeams / 2; currentGame++ )
        {
          homeIndex = getHomeIndex( numEventTeams, currentRound, currentGame );
          awayIndex = getAwayIndex( numEventTeams, currentRound, currentGame );

          if ( !(bOdd && (homeIndex === numEventTeams - 1 || awayIndex === numEventTeams - 1)) )
          {
            matchup = this.store.createRecord( 'matchup' );

            matchup.set( 'laneOne', scouts.objectAt( homeIndex ) );
            matchup.set( 'laneTwo', scouts.objectAt( awayIndex ) );
            matchup.save();

            matchups.pushObject( matchup );
          }
        }
      }

      // now backwards
      for( currentRound = 1; currentRound < numEventTeams; currentRound++ )
      {
        for ( currentGame = 1; currentGame <= numEventTeams / 2; currentGame++ )
        {
          homeIndex = getHomeIndex( numEventTeams, currentRound, currentGame );
          awayIndex = getAwayIndex( numEventTeams, currentRound, currentGame );

          if ( !(bOdd && (homeIndex === numEventTeams - 1 || awayIndex === numEventTeams - 1)) )
          {
            matchup = this.store.createRecord( 'matchup' );

            matchup.set( 'laneOne', scouts.objectAt( awayIndex ) );
            matchup.set( 'laneTwo', scouts.objectAt( homeIndex ) );
            matchup.save();

            matchups.pushObject( matchup );
          }
        }
      }

      race.save();
    }
  }
});
