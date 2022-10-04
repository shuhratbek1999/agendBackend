'use strict';

// const { sequelize } = require("../src/db/db-sequelize");

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink){
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(
    `INSERT INTO village (id, district_id, name) VALUES\
(1,31,"Ayrilish"),\
(2,31,"Butaqora"),\
(7,31,"Yorboshi"),\
(8,31,"Zavroq"),\
(9,31,"Kuyganyor"),\
(10,31,"Kunji"),\
(12,31,"Qo‘nji"),\
(14,31,"Nayman"),\
(15,31,"Namuna"),\
(16,31,"Og‘ullik"),\
(17,31,"Oq-yor"),\
(18,31,"Oq-yor"),\
(19,31,"Orol"),\
(20,31,"Rovvot"),\
(21,31,"Xakan"),\
(22,31,"Xartum"),\
(23,31,"Xartum"),\
(24,31,"Xrabek"),\
(25,31,"Chilon"),\
(26,31,"Chumbog‘ich"),\
(27,31,"Ekin tikin"),\
(28,31,"Yangiobod"),\
(29,32,"Asaka"),\
(30,32,"Zarbdor"),\
(31,32,"Ilg‘or"),\
(32,32,"Kujgan"),\
(33,32,"Kujgan"),\
(34,32,"Qadim"),\
(35,32,"Qoratepa"),\
(36,32,"Mustahkam"),\
(37,32,"Navkan"),\
(38,32,"Niyozbotir"),\
(39,32,"Oqbo‘yra"),\
(40,32,"T.Aliyev"),\
(41,32,"O‘zbekiston"),\
(42,33,"Baliqchi"),\
(43,33,"Baliqchi"),\
(44,33,"Bo‘ston"),\
(45,33,"Guliston"),\
(46,33,"Olimbek"),\
(47,33,"Oxunboboyev nomli"),\
(48,33,"Sirgali"),\
(49,33,"O‘rmonbek"),\
(50,33,"Xo‘jaobod"),\
(51,33,"Xo‘jaobod"),\
(52,33,"Chinobod markaz"),\
(53,33,"Eskixaqqulobod"),\
(61,34,"Buloqboshi"),\
(62,34,"Buloqboshi"),\
(63,34,"Kulla"),\
(64,34,"Mayariq"),\
(65,34,"Nayman"),\
(66,34,"Uchtepa"),\
(67,34,"Shirmonbuloq"),\
(68,34,"Shirmonbuloq"),\
(69,36,"Abdullabiy"),\
(70,36,"Beshtal"),\
(71,36,"Beshtol"),\
(76,36,"Jalaquduq"),\
(77,36,"Jalolquduq"),\
(78,36,"Janubiy olamushuk"),\
(79,36,"Ko‘kalam"),\
(80,36,"Qatortol"),\
(81,36,"Qo‘shtepa"),\
(82,36,"Oyim"),\
(83,36,"Teshiktosh"),\
(84,37,"Gurkirov"),\
(85,37,"Izboskan"),\
(86,37,"Maygir"),\
(87,37,"Maygir"),\
(88,37,"Namuna"),\
(89,37,"Paytug"),\
(90,37,"To‘rtko‘l"),\
(91,37,"Uzun ko‘cha"),\
(92,37,"O‘rtoqlar"),\
(93,37,"Shermatobod"),\
(94,37,"Erkin"),\
(95,37,"Yakkatut"),\
(96,37,"Yangi qishloq"),\
(97,37,"Yangizamon"),\
(98,39,"Dardok"),\
(99,39,"Qorasuv"),\
(100,39,"Qo‘rg‘ontepa"),\
(101,39,"Qo‘rg‘ontepa"),\
(102,39,"Savay"),\
(103,39,"Sultonobod"),\
(104,39,"Sultonobod"),\
(105,39,"Chimyon"),\
(106,40,"Boboxuroson"),\
(107,40,"Ko‘tarma"),\
(108,40,"Ko‘tarma"),\
(109,40,"Qorabog‘ish"),\
(110,40,"Qorabog‘ish"),\
(111,40,"Qoraqo‘rg‘on"),\
(112,40,"Qoraqo‘rg‘on"),\
(113,40,"Marxamat"),\
(114,40,"Marxamat"),\
(128,41,"Kumakay"),\
(129,41,"Qo‘shtepa"),\
(130,41,"Qo‘shtepasaroy"),\
(131,41,"Madaniy mehnat"),\
(132,41,"Markaz"),\
(133,41,"Maslahat"),\
(134,41,"Maslahat"),\
(135,41,"Namuna"),\
(136,41,"Oltinko‘l"),\
(137,41,"Oraziy"),\
(138,41,"Oxunboboyev nomli"),\
(139,41,"Suvyulduz"),\
(140,41,"Xondibog‘i"),\
(141,42,"Bo‘ston"),\
(142,42,"Do‘stlik"),\
(143,42,"Izboskan"),\
(144,42,"Ittifoq"),\
(145,42,"Madaniyat"),\
(146,42,"Paxtakor"),\
(147,42,"Paxtaobod"),\
(148,42,"Pushmon"),\
(149,42,"Uyg‘ur"),\
(150,43,"Mingbuloq"),\
(151,43,"Mingchinor"),\
(152,43,"Navoiy nomli"),\
(153,43,"Oq oltin"),\
(154,43,"Oq oltin"),\
(155,44,"Xonobod"),\
(156,44,"Xonobod"),\
(157,45,"Birlashgan"),\
(158,45,"Guliston"),\
(159,45,"Dilkushod"),\
(160,45,"Ko‘tarma"),\
(161,45,"Manak"),\
(162,45,"Manak"),\
(163,45,"Oltin vodiy"),\
(164,45,"Xidirsha"),\
(165,45,"Xo‘jaobod"),\
(166,45,"Xo‘jaobod"),\
(167,46,"Abdubiy"),\
(168,46,"Vaxim"),\
(169,46,"Guliston"),\
(170,46,"Nazarmaxram"),\
(171,46,"Naynavo"),\
(178,46,"Cho‘ja"),\
(179,46,"Cho‘ja"),\
(180,46,"Shaxrixon"),\
(181,46,"Yuqori Shaxrixon"),\
(182,46,"Yangi yo‘l"),\
(183,48,"Arabxona"),\
(184,48,"Bog‘ikalon"),\
(185,48,"Gala Osiyo"),\
(186,48,"Gulshanobod"),\
(187,48,"Dexcha"),\
(188,48,"Istiqbol"),\
(189,48,"Kunjiqal?a"),\
(190,48,"Ko‘chko‘mar"),\
(191,48,"Qavola Maxmud"),\
(192,48,"Podshoyi"),\
(193,48,"Rabotak"),\
(194,48,"Rabotiqalmoq"),\
(195,48,"Saxovat"),\
(196,48,"Sohibkor"),\
(197,48,"So‘fikorgar"),\
(204,49,"Vobkent"),\
(205,49,"Imomqazixon"),\
(206,49,"Kosari"),\
(207,49,"Kumushkent"),\
(208,49,"Qipchoq"),\
(209,49,"Qo‘ng‘irot"),\
(210,49,"Navbahor"),\
(215,49,"Xalach"),\
(216,49,"Shirin"),\
(217,49,"Exson"),\
(218,49,"Yangikent"),\
(219,50,"Abadi"),\
(220,50,"Armechan"),\
(221,50,"Beshtuvo"),\
(222,50,"Buktaroy"),\
(223,50,"G.Yunusov nomli"),\
(224,50,"Gajdumak"),\
(225,50,"G‘ijduvon"),\
(226,50,"G‘ovshun"),\
(230,50,"Ko‘kcha"),\
(231,50,"Ko‘lijabbor"),\
(232,50,"Qaraxoni"),\
(233,50,"Mazragan"),\
(234,50,"Namatgaron"),\
(239,50,"Soktari"),\
(240,50,"O‘zanon"),\
(241,50,"Ulfatbibi"),\
(242,50,"Firishkent"),\
(243,50,"Xatcha"),\
(244,50,"Chag‘dari"),\
(245,50,"Yuqori Qumoq"),\
(246,50,"Yuqori Rostgo‘y"),\
(247,51,"Aleli"),\
(248,51,"Dalmun"),\
(249,51,"Dalmun"),\
(250,51,"Jondor"),\
(251,51,"Zarafshon"),\
(252,51,"Ko‘liyon"),\
(253,51,"Qaroli"),\
(254,51,"Lolo"),\
(255,51,"Mirzayon"),\
(256,51,"Mustaqillik"),\
(257,51,"Oxshix"),\
(258,51,"Paxlavon"),\
(259,51,"Po‘loti"),\
(264,51,"Ushot"),\
(265,51,"Xazorman"),\
(266,51,"Xumdonak"),\
(267,51,"Xumini bolo"),\
(268,52,"Chorzona"),\
(269,52,"B.Naqshband"),\
(270,52,"Beklar"),\
(271,52,"Guliston"),\
(272,52,"Kogon"),\
(273,52,"Niyozhoji"),\
(274,52,"Nurafshon"),\
(275,52,"Sarayon"),\
(276,52,"Sarayonobod"),\
(277,52,"Tutikunda"),\
(278,52,"Xo‘ja Yakshaba"),\
(279,52,"Yangi xayot"),\
(280,54,"Bandboshi"),\
(281,54,"Bandboshi"),\
(282,54,"Darg‘abog‘i"),\
(283,54,"Darg‘ali"),\
(284,54,"Jig‘achi"),\
(285,54,"Jig‘achi"),\
(286,54,"Ziyorat"),\
(287,54,"Kulonchi"),\
(288,54,"Qozon"),\
(289,54,"Qorako‘l"),\
(290,54,"Qorako‘l"),\
(291,54,"Qoraun"),\
(292,54,"Qorahoji"),\
(293,54,"Qorahoji"),\
(294,54,"Quvvacha"),\
(295,54,"Quvvacha"),\
(296,54,"Quyi Yangibozor"),\
(297,54,"Mallaishayx"),\
(298,54,"Mirzaqal?a"),\
(299,54,"Sayyod"),\
(306,54,"Sho‘rrabot"),\
(307,54,"Yakka A?lam"),\
(308,54,"Yangiqal?a"),\
(309,55,"Buzachi"),\
(310,55,"Bo‘ston"),\
(311,55,"Jarqoq"),\
(312,55,"Qorovulbozor"),\
(313,55,"Navbahor"),\
(314,56,"Bahoriston"),\
(315,56,"Bo‘ribek Chandir"),\
(316,56,"Ganchi Chandir"),\
(317,56,"Guliston"),\
(318,56,"Denov"),\
(319,56,"Jayxunobod"),\
(320,56,"Jumabozor"),\
(321,56,"Kesakli"),\
(322,56,"Qirlishon"),\
(323,56,"Qirtay"),\
(324,56,"Olot"),\
(325,56,"Paxtakor"),\
(326,56,"Soyin-qorovul"),\
(327,56,"Sola qorovul"),\
(328,56,"Talqon-sayyot"),\
(329,56,"O‘zbekiston"),\
(330,56,"Chandir"),\
(331,56,"Chovdur"),\
(332,56,"Chorbog‘"),\
(333,57,"Bog‘imuso"),\
(334,57,"Varaxsho"),\
(335,57,"Jonkeldi"),\
(336,57,"Zandani"),\
(337,57,"Ibn Sino nomli"),\
(338,57,"Qal?ai Mirishkor"),\
(339,57,"Qoraqalpoq"),\
(340,57,"Mahallai-Mirishkor"),\
(341,57,"Peshku"),\
(343,57,"Chibog‘oni")`
  )
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
