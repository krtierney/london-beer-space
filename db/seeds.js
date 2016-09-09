var mongoose = require('mongoose');
var Event = require('../models/event');
var User = require('../models/user');

var databaseUri = require('../config/db')(proceess.env.NODE_ENV || 'development');
mongoose.connect(databaseUri);

User.collection.drop();
Event.collection.drop();

User.create([
  {
  isAdmin: true,
  username: "admin",
  email: "admin@example.com",
  password: "password",
  passwordConfirmation: "password"
  }
], function(err, users) {

  Event.create([
    {
      title: "AlphaBet BrewCo Tap Takeover",
      description: "The fab folks from Alphabet Brewing Company will be at The Rake on Wednesday 28th September. Drink some beer, meet the brewers, win some swag!",
      date: new Date(2016-09-28),
      location: "14 Winchester Walk, Borough Market SE1 9AG",
      image: "https://scontent-lhr3-1.xx.fbcdn.net/t31.0-8/14257467_1390326970995916_5978730891816202975_o.jpg"
    }, {
      title: "One Mile End Tap Takeover",
      description: "The fab folks from One Mile End will be at The Rake on Wednesday 28th September. Drink some beer, meet the brewers, win some swag!",
      date: new Date(2016-09-28),
      location: "14 Winchester Walk, Borough Market SE1 9AG",
      image: "https://scontent-lhr3-1.xx.fbcdn.net/t31.0-8/14047131_1376803209014959_5698050951920148559_o.jpg"
    }, {
      title: "Toast Ale Brew Day",
      description: "Head down to Temple Brew House to witness the making of a special beer called Toast Ale. The recipe combines surplus fresh bread (that would otherwise go to waste) with malted barley, hops, yeast and water. All Toast's profits go to Feedback, an environmental organisation that campaigns to end food waste. Anyone with a ticket who joins us on the day can collect a voucher and return two weeks later on the 5th October to claim a free glass of Toast Ale from the bar! Brewer Vanesa will be around to chat (when she's not making beer!) and Julie from Toast will be on hand to share Toast's story and spread the rev-ale-lution. Let's toast the end of food waste!",
      date: new Date(2016-09-21),
      location: "Temple Brew House - 46 Essex Street, London, WC2R 3JF",
      image: "http://www.toastale.com/wp-content/uploads/2016/02/7W0A73751.jpg",
      registrationUrl: "https://www.eventbrite.com/e/toast-ale-brew-at-temple-brew-house-tickets-26840713296?aff=es2"
    },
    {
      title: "Belgian Beer Tasting",
      description: "The Dove has been the home for Belgian Beer and the heart of Broadway Market for many years. We know a thing or two about Belgian Beers and Belgian Foods. Our beer tastings combine the best of Belgian Beers and food. Resulting in a fun and informal beer tasting event. Join like minded beer enthusiasts to find out more about the flavours and styles of Belgian Beers. Learn how to match beers and foods. Hosted by our expert beer Sommelier, who will guide you through the best that Belgium has to offer.  Consisting of tastings of 6 Belgian Beers and foods which complement the styles of beers on offer. A perfect event for a beginner and those who wish to expand their knowledge. There isn't a more pleasurable way to spend an evening.",
      date: new Date(2016-09-22),
      location: "Temple Brew House - 46 Essex Street, London, WC2R 3JF",
      image: "https://cdn.evbuc.com/eventlogos/12218273/118998189107221923148023899286327529394849n-1.jpg",
      registrationUrl: "https://www.eventbrite.com/e/belgian-beer-tasting-at-the-dove-broadway-market-tickets-27027160966?aff=es2"
    }
  ], function(err, event) {
      console.log(event.length + " events created");
      console.log(users.length + " users created");
      
      mongoose.connection.close();
  });
})