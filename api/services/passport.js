const passport = require('passport');
const mongoose = require('mongoose');
const SteamStrategy = require('passport-steam').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = mongoose.model('users');

require('dotenv').config();


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'picture.type(large)', 'link']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    User.findOne({ loginId: profile.id }).then(existingUser => {
      if (existingUser) {
        done(null, existingUser);
      } else {
        new User({
          name: profile.displayName,
          image: profile.photos[0].value,
          loginId: profile.id

        })
          .save()
          .then(user => done(null, user));
      }
    });
  }))

passport.use(
  new SteamStrategy(
    {
      returnURL: 'http://localhost:5000/api/auth/steam/return',
      realm: 'http://localhost:5000',
      apiKey: process.env.STEAM_KEY,
      passReqToCallback : true
    },
    (req, identifier, profile, done) => {
      console.log(profile)
      User.findOne({ _id: req.session.passport.user }).then(existingUser => {
        if (existingUser) {
            existingUser['steamConnect'] = true;
            existingUser['steamId'] = profile.id;
            existingUser['status'] = "pending";
            existingUser.save();
          done(null, existingUser);
        }
      });
    }
  )
);

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       callbackURL: '/api/auth/google/callback',
//       proxy: true
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const existingUser = await User.findOne({ googleId: profile.id });
//
//       if (existingUser) {
//         return done(null, existingUser);
//       }
//
//       const user = await new User({ googleId: profile.id }).save();
//       done(null, user);
//     }
//   )
// );
