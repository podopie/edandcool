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
  story: ['Ed\'s best friend since middle school, Hal comes from Viking Town, Norseland. Ed was once saved via Hal\'s viking ship. Pearl Jam!'],
  }, {
  name: 'Jon "The Strap" Ly',
  img: 'guys/jon2.jpg',
  story: ['Jon and Ed studied "abroad" and lived together at SJSU. Past-times together include Computer Blue and La Vics burritos.'],
  }, {
  name: 'Thomson "Oh, you know," Nguyen',
  img: 'guys/thomson2.png',
  story: ['Drum corps mates, Ed and Thomson always wear the same shoes. Thomson regularly thanks Ed for breaking his cow lamp.'],
  }, {
  name: 'Mike "Ken" Kendall',
  img: 'guys/kendall2.jpg',
  story: ['Mike and Ed are often mistaken for being the same tall lanky white male. "Whatever," says Mike, "I\'ma go play some sweet jams."'],
  }, {
  name: 'Pasquale "LGM!" Cusello',
  img: 'guys/pat2.jpg',
  story: ['Pat represents everything Ed does not: a massive UConn football fan that cares about most sports played on grass.'],
  }
]

var bridesmaids = [{
    name: 'Phui "the H is silent" Lau',
    img: 'girls/sis_baby.jpg',
    // story: 'Phui is Colleen\'s sister. She lives in SF and loves her dog, <a href="http://www.instagram.com/misslolalau">Lola</a>. Like any responsible older sibling, she offered Colleen her first beer.',
    story: 'Phui is Colleen\'s sister. She lives in SF and loves her dog, Lola. Like any responsible older sibling, she offered Colleen her first beer.',
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
    var attendees = req.params.attendant_id.split('-');
    // ughaoasidjaoias i hate javascript
    attendees = attendees.map(function(x) { return x.split('.').map(function(i) { return i.charAt(0).toUpperCase() + i.slice(1)}).join(' ')})
    res.render('form', { title: 'Sup sup', attendees: attendees });
});

/* POST form. */
router.post('/thanks', function(req, res) {
    console.log(req.body);
    res.render('thanks', {req: req });
});

module.exports = router;
