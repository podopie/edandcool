var express = require('express');
var router = express.Router();

var groomsmen = [{
  name: 'Andrew "Podo" Podojil',
  img: 'guys/andrew2.png',
  story: ['I’m just like Ed but',
    'Younger and more attractive',
    'Try to top that one'],
  }, {
  name: 'Hal "Hal Johnson" Johnson',
  img: 'guys/hal2.png',
  story: ['Good friends since middle school, Hal and Ed share bonds of playing instruments larger than themselves, moving to and back from CA, and playing Mega Man 2 constantly.'],
  }, {
  name: 'Jon "The Strap" Ly',
  img: 'guys/jon2.jpg',
  story: ['Jon, no stranger to the Podojils, met Ed at UConn. They lived together when studying "abroad" at SJSU, but by studied they really mean ate burritos.'],
  }, {
  name: 'Thomson "Oh, you know," Nguyen',
  img: 'guys/thomson2.png',
  story: ['When they met at drum corps, Ed broke Thomson\'s cow lamp on accident. But Thomson said the lamp was "awful" and "hated it," and thanked Ed for breaking it.'],
  }, {
  name: 'Mike "Ken" Kendall',
  img: 'guys/kendall2.jpg',
  story: ['Mike and Ed, rarely seen together with larger groups, are often considered the same tall lanky white male. "Whatever," says Mike, "I\'ma go play some sweet jams."'],
  }, {
  name: 'Pasquale "LGM!" Cusello',
  img: 'guys/pat2.jpg',
  story: ['Ed\'s older brother Pat represents everything Ed himself does not: a massive UConn football fan that cares about most sports played on grass.'],
  }
]

var bridesmaids = [{
    name: 'Phui "the H is silent" Lau',
    img: 'girls/sis_baby.jpg',
    story: 'Phui is Colleen\'s sister. She lives in SF and loves her dog, <a href="http://www.instagram.com/misslolalau", target="_blank">Lola</a>. Like any responsible older sibling, she offered Colleen her first beer.',
    // story: 'Phui is Colleen\'s sister. She lives in SF and loves her dog, Lola. Like any responsible older sibling, she offered Colleen her first beer.',
},{
    name: 'Katie "Heeeey roomie" Sawai',
    img: 'girls/katie_baby.jpg',
    story: 'Even though Katie is from the west coast too, she and Colleen met/worked together/lived together in NYC. Some people think they are sisters when they both wear big glasses.',
},{
    name: 'Melanie "What\'s a cell" Vongdeuane',
    img: 'girls/melanie_baby.jpg',
    story: 'Coolleen tutored Mel during high school, but Mel schooled her in what really matters in life: Real Housewives, Ne-yo vs. Colby O\'donis, and One Direction!',
},{
    name: 'Nam "U D Man" Du',
    img: 'girls/nam_baby.jpg' ,
    story: 'Nam and Colleen co-starred as Daddy and his Roommate for a high school video book report, and have a common love for sushi and long, satisfying burps.',
},{
    name: 'Linda "El Phoutha" Phouthavone',
    img: 'girls/linda_baby.jpg',
    story: 'Mama Laotina Ubered Colleen around (with no surge charging) in high school to Key Club events. As a direct result, Colleen is now Dr. Lau (you\'re welcome).',
},{
    name: 'Ann "¿Qué?" Luc',
    img: 'girls/ann_baby.jpg',
    story: 'Thanks to Tamagotchi and the school bus, Ann and Colleen have a 16+ year friendship. She trusts Colleen with everything except plucking her eyebrows.',
},{
    name: 'Phong "Ong-Ong" Bui',
    img: 'girls/phongbaby.jpg',
    story: 'Born in Vietnam and raised in SoCal Vietnam, Phong met Colleen in college. Later he housed her in his windowless cave in Brooklyn.',
}]
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'PODOLAU 2017',
    groomsmen: groomsmen,
    bridesmaids: bridesmaids
    });
});

/* GET peeps. */
router.get('/and/:attendant_id', function(req, res) {
    sheets.spreadsheets.values.get({
      auth: jwtClient,
      spreadsheetId: gsconfig.sheet,
      range: 'urlspaths!A1:Z1000'
    }, function(err, result) {
      var arrayLength = result.values.length;
      for (var i = 0; i < arrayLength; i++) {
        if (result.values[i][0] == req.params.attendant_id) {
          var attendees = req.params.attendant_id.split('-');
          // ughaoasidjaoias i hate javascript
          attendees = attendees.map(function(x) { return x.split('.').map(function(i) { return i.charAt(0).toUpperCase() + i.slice(1)}).join(' ')})
          // end hate
          res.render('form', { title: 'Sup sup', attendees: attendees });
          return
        }
      }
      res.redirect('/een');
    })
});

/* GOOGLE SHEETS */
var google = require('googleapis');
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
var key = require('../client_secret.json');
var gsconfig = require('../gsconfig.json');

var jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  SCOPES,
  null);

var sheets = google.sheets('v4');

var insert_row = function(jwtClient, form_data){
    sheets.spreadsheets.values.append({
      auth: jwtClient,
      spreadsheetId: gsconfig.sheet,
      range: gsconfig.name + 'A:Z',
      resource: {
            majorDimension: 'ROWS',
            values: form_data
          },
      valueInputOption: 'USER_ENTERED'
    });
};

var update_row = function(jwtClient, form_data, row){
    sheets.spreadsheets.values.update({
      auth: jwtClient,
      spreadsheetId: gsconfig.sheet,
      range: gsconfig.name + row
    });
};

/* END GOOGLE SHEETS INTEGRATION */


/* POST form. */
router.post('/thanks', function(req, res) {
    var form = req.body;
    var d = new Date();
    var data = [[form.name0, form.attend_choice0, form.food_choice0, form.allergies0, form.cake_preference0, d]]
    if(Object.prototype.hasOwnProperty.call(form, 'name1')){
      data.push([form.name1, form.attend_choice1, form.food_choice1, form.allergies1, form.cake_preference1, d])
    }
    // insert_row(jwtClient, data);

    res.render('thanks', {req: req });
});

module.exports = router;
