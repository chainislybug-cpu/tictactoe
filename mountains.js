(function() {
  // ── REAL PEAKS ──────────────────────────────────────────────────────────────
  const REAL = [
    // VALAIS (VS) — 4000m+ peaks
    {id:1,  name:'Dufourspitze',      lat:45.9369, lng:7.8671,  elev:4634, prom:4599, isol:490,  diff:5, beauty:5, nature:4, canton:'VS', tags:['glacier','rocky','remote','panoramic views']},
    {id:2,  name:'Nordend',           lat:45.9463, lng:7.8667,  elev:4609, prom:80,   isol:0.9,  diff:5, beauty:5, nature:4, canton:'VS', tags:['glacier','rocky','remote']},
    {id:3,  name:'Zumsteinspitze',    lat:45.9264, lng:7.8717,  elev:4563, prom:50,   isol:0.7,  diff:5, beauty:4, nature:4, canton:'VS', tags:['glacier','rocky']},
    {id:4,  name:'Signalkuppe',       lat:45.9259, lng:7.8763,  elev:4554, prom:80,   isol:0.8,  diff:4, beauty:4, nature:4, canton:'VS', tags:['glacier','panoramic views']},
    {id:5,  name:'Dom',               lat:46.0938, lng:7.8582,  elev:4545, prom:1042, isol:7.5,  diff:5, beauty:5, nature:4, canton:'VS', tags:['glacier','rocky','remote','panoramic views']},
    {id:6,  name:'Lyskamm',          lat:45.9139, lng:7.8649,  elev:4527, prom:225,  isol:2.2,  diff:5, beauty:4, nature:4, canton:'VS', tags:['glacier','rocky']},
    {id:7,  name:'Weisshorn',         lat:46.1028, lng:7.7158,  elev:4506, prom:2099, isol:15.7, diff:5, beauty:5, nature:5, canton:'VS', tags:['glacier','rocky','remote','panoramic views']},
    {id:8,  name:'Täschhorn',         lat:46.0664, lng:7.8848,  elev:4491, prom:249,  isol:1.5,  diff:5, beauty:4, nature:4, canton:'VS', tags:['rocky','remote']},
    {id:9,  name:'Matterhorn',        lat:45.9765, lng:7.6586,  elev:4478, prom:1042, isol:14.9, diff:5, beauty:5, nature:5, canton:'VS', tags:['rocky','iconic','panoramic views']},
    {id:10, name:'Parrotspitze',      lat:45.9244, lng:7.8686,  elev:4432, prom:50,   isol:0.5,  diff:5, beauty:4, nature:4, canton:'VS', tags:['glacier','rocky']},
    {id:11, name:'Dent Blanche',      lat:46.0351, lng:7.6073,  elev:4357, prom:862,  isol:7.9,  diff:5, beauty:5, nature:4, canton:'VS', tags:['rocky','panoramic views','remote']},
    {id:12, name:'Nadelhorn',         lat:46.0676, lng:7.9018,  elev:4327, prom:403,  isol:2.7,  diff:4, beauty:4, nature:4, canton:'VS', tags:['glacier','rocky']},
    {id:13, name:'Grand Combin',      lat:45.9374, lng:7.2802,  elev:4314, prom:2074, isol:31.3, diff:4, beauty:5, nature:5, canton:'VS', tags:['glacier','panoramic views','remote']},
    {id:14, name:'Lenzspitze',        lat:46.0737, lng:7.8958,  elev:4294, prom:135,  isol:1.0,  diff:5, beauty:4, nature:4, canton:'VS', tags:['rocky','remote']},
    {id:15, name:'Zinal Rothorn',     lat:46.0617, lng:7.6895,  elev:4221, prom:499,  isol:4.5,  diff:4, beauty:5, nature:4, canton:'VS', tags:['rocky','panoramic views']},
    {id:16, name:'Alphubel',          lat:46.0479, lng:7.8564,  elev:4206, prom:257,  isol:2.4,  diff:4, beauty:4, nature:3, canton:'VS', tags:['glacier','rocky']},
    {id:17, name:'Rimpfischhorn',     lat:46.0127, lng:7.8900,  elev:4199, prom:310,  isol:3.5,  diff:4, beauty:4, nature:4, canton:'VS', tags:['glacier','rocky']},
    {id:18, name:'Aletschhorn',       lat:46.4597, lng:7.9956,  elev:4193, prom:952,  isol:7.9,  diff:4, beauty:5, nature:5, canton:'VS', tags:['glacier','panoramic views','protected reserve']},
    {id:19, name:'Strahlhorn',        lat:46.0091, lng:7.9058,  elev:4190, prom:261,  isol:1.7,  diff:3, beauty:4, nature:4, canton:'VS', tags:['glacier','panoramic views']},
    {id:20, name:"Dent d'Hérens",     lat:45.9979, lng:7.6081,  elev:4174, prom:404,  isol:5.7,  diff:5, beauty:4, nature:4, canton:'VS', tags:['rocky','remote','glacier']},
    {id:21, name:'Breithorn',         lat:45.9383, lng:7.7186,  elev:4164, prom:219,  isol:5.2,  diff:2, beauty:4, nature:3, canton:'VS', tags:['glacier','panoramic views','ski resort nearby']},
    {id:22, name:'Bishorn',           lat:46.1237, lng:7.7225,  elev:4153, prom:319,  isol:3.3,  diff:3, beauty:4, nature:4, canton:'VS', tags:['glacier','panoramic views']},
    {id:23, name:'Ober Gabelhorn',    lat:46.0234, lng:7.6627,  elev:4063, prom:388,  isol:3.3,  diff:5, beauty:4, nature:4, canton:'VS', tags:['rocky','remote']},
    {id:24, name:'Weissmies',         lat:46.1297, lng:8.0468,  elev:4017, prom:688,  isol:7.2,  diff:3, beauty:5, nature:4, canton:'VS', tags:['glacier','panoramic views']},
    {id:25, name:'Lagginhorn',        lat:46.1537, lng:8.0263,  elev:4010, prom:284,  isol:2.2,  diff:3, beauty:4, nature:4, canton:'VS', tags:['rocky','panoramic views']},
    // VS medium peaks
    {id:26, name:'Fletschhorn',       lat:46.1429, lng:8.0538,  elev:3993, prom:183,  isol:1.4,  diff:4, beauty:4, nature:4, canton:'VS', tags:['glacier','rocky']},
    {id:27, name:'Castor',            lat:45.9181, lng:7.6988,  elev:4228, prom:90,   isol:2.3,  diff:3, beauty:4, nature:4, canton:'VS', tags:['glacier']},
    {id:28, name:'Pollux',            lat:45.9135, lng:7.7060,  elev:4092, prom:80,   isol:1.0,  diff:3, beauty:3, nature:3, canton:'VS', tags:['glacier']},
    {id:29, name:'Monte Leone',       lat:46.2485, lng:8.1102,  elev:3553, prom:1083, isol:14.5, diff:3, beauty:4, nature:4, canton:'VS', tags:['glacier','panoramic views','remote']},
    {id:30, name:'Simplon Pass area', lat:46.2520, lng:8.0330,  elev:2005, prom:180,  isol:3.2,  diff:1, beauty:3, nature:3, canton:'VS', tags:['panoramic views']},
    {id:31, name:'Bella Tola',        lat:46.2023, lng:7.6944,  elev:3025, prom:678,  isol:8.1,  diff:2, beauty:4, nature:4, canton:'VS', tags:['panoramic views','protected reserve']},
    {id:32, name:'Wildstrubel',       lat:46.4001, lng:7.5469,  elev:3243, prom:891,  isol:14.2, diff:2, beauty:4, nature:4, canton:'VS', tags:['glacier','panoramic views']},
    {id:33, name:'Bietschhorn',       lat:46.4052, lng:7.8350,  elev:3934, prom:763,  isol:9.4,  diff:5, beauty:5, nature:5, canton:'VS', tags:['rocky','remote','panoramic views']},

    // BERN (BE)
    {id:34, name:'Finsteraarhorn',    lat:46.5370, lng:8.1260,  elev:4274, prom:2280, isol:35.5, diff:5, beauty:5, nature:5, canton:'BE', tags:['glacier','rocky','remote','panoramic views']},
    {id:35, name:'Jungfrau',          lat:46.5371, lng:7.9622,  elev:4158, prom:1012, isol:8.3,  diff:3, beauty:5, nature:4, canton:'BE', tags:['glacier','panoramic views','ski resort nearby']},
    {id:36, name:'Mönch',             lat:46.5593, lng:7.9973,  elev:4107, prom:666,  isol:3.1,  diff:4, beauty:5, nature:4, canton:'BE', tags:['glacier','panoramic views','rocky']},
    {id:37, name:'Schreckhorn',       lat:46.5861, lng:8.1216,  elev:4078, prom:542,  isol:5.2,  diff:5, beauty:5, nature:5, canton:'BE', tags:['rocky','remote','glacier']},
    {id:38, name:'Lauteraarhorn',     lat:46.5966, lng:8.1683,  elev:4042, prom:347,  isol:2.9,  diff:4, beauty:4, nature:4, canton:'BE', tags:['glacier','rocky']},
    {id:39, name:'Gross Grünhorn',    lat:46.5494, lng:8.1443,  elev:4044, prom:364,  isol:4.2,  diff:4, beauty:4, nature:4, canton:'BE', tags:['glacier','rocky']},
    {id:40, name:'Eiger',             lat:46.5775, lng:8.0054,  elev:3967, prom:487,  isol:3.3,  diff:5, beauty:5, nature:4, canton:'BE', tags:['rocky','iconic','panoramic views']},
    {id:41, name:'Wetterhorn',        lat:46.6199, lng:8.1018,  elev:3692, prom:680,  isol:7.5,  diff:4, beauty:5, nature:5, canton:'BE', tags:['rocky','glacier','panoramic views']},
    {id:42, name:'Blüemlisalp',       lat:46.5001, lng:7.7603,  elev:3661, prom:685,  isol:5.7,  diff:3, beauty:5, nature:5, canton:'BE', tags:['glacier','panoramic views','protected reserve']},
    {id:43, name:'Doldenhorn',        lat:46.4745, lng:7.7393,  elev:3638, prom:543,  isol:3.8,  diff:4, beauty:4, nature:4, canton:'BE', tags:['rocky','glacier']},
    {id:44, name:'Gspaltenhorn',      lat:46.5589, lng:7.8369,  elev:3436, prom:531,  isol:5.1,  diff:4, beauty:4, nature:4, canton:'BE', tags:['rocky']},
    {id:45, name:'Niesen',            lat:46.6419, lng:7.6508,  elev:2362, prom:1357, isol:15.2, diff:1, beauty:4, nature:4, canton:'BE', tags:['panoramic views','forest']},
    {id:46, name:'Stockhorn',         lat:46.6869, lng:7.5536,  elev:2190, prom:836,  isol:12.1, diff:1, beauty:3, nature:4, canton:'BE', tags:['panoramic views','forest','lake nearby']},
    {id:47, name:'Hohgant',           lat:46.8068, lng:7.9174,  elev:2197, prom:908,  isol:11.3, diff:2, beauty:4, nature:5, canton:'BE', tags:['panoramic views','protected reserve','forest']},
    {id:48, name:'Rothorn (Brienz)',   lat:46.7758, lng:8.0095,  elev:2349, prom:723,  isol:8.7,  diff:2, beauty:4, nature:4, canton:'BE', tags:['panoramic views','lake nearby']},
    {id:49, name:'Schwarzhorn (Adelboden)',lat:46.4553,lng:7.5975,elev:2927,prom:432, isol:5.2,  diff:3, beauty:4, nature:4, canton:'BE', tags:['rocky','panoramic views']},

    // GRAUBÜNDEN (GR)
    {id:50, name:'Piz Bernina',       lat:46.3784, lng:9.9048,  elev:4049, prom:2234, isol:75.2, diff:4, beauty:5, nature:5, canton:'GR', tags:['glacier','panoramic views','remote']},
    {id:51, name:'Piz Zupò',          lat:46.3695, lng:9.9396,  elev:3996, prom:165,  isol:1.8,  diff:4, beauty:4, nature:4, canton:'GR', tags:['glacier','rocky']},
    {id:52, name:'Piz Palü',          lat:46.3787, lng:9.9579,  elev:3901, prom:344,  isol:5.3,  diff:3, beauty:5, nature:5, canton:'GR', tags:['glacier','panoramic views']},
    {id:53, name:'Piz Morteratsch',   lat:46.4073, lng:9.9291,  elev:3751, prom:414,  isol:5.6,  diff:3, beauty:5, nature:5, canton:'GR', tags:['glacier','panoramic views']},
    {id:54, name:'Tödi',              lat:46.8127, lng:8.9135,  elev:3614, prom:1456, isol:19.7, diff:4, beauty:5, nature:5, canton:'GR', tags:['glacier','rocky','panoramic views','remote']},
    {id:55, name:'Rheinwaldhorn',     lat:46.5024, lng:9.1817,  elev:3402, prom:1413, isol:22.5, diff:3, beauty:5, nature:5, canton:'GR', tags:['glacier','panoramic views','remote']},
    {id:56, name:'Piz Platta',        lat:46.5082, lng:9.5785,  elev:3392, prom:855,  isol:12.8, diff:3, beauty:4, nature:4, canton:'GR', tags:['rocky','panoramic views']},
    {id:57, name:'Piz Kesch',         lat:46.6178, lng:9.8690,  elev:3418, prom:1152, isol:22.3, diff:3, beauty:5, nature:5, canton:'GR', tags:['glacier','remote','panoramic views']},
    {id:58, name:'Piz Ela',           lat:46.5712, lng:9.6951,  elev:3339, prom:664,  isol:7.9,  diff:3, beauty:4, nature:4, canton:'GR', tags:['rocky','panoramic views']},
    {id:59, name:'Piz Linard',        lat:46.8331, lng:10.0684, elev:3411, prom:1428, isol:24.6, diff:3, beauty:4, nature:5, canton:'GR', tags:['remote','panoramic views','protected reserve']},
    {id:60, name:'Piz Umbrail',       lat:46.5318, lng:10.3929, elev:3033, prom:341,  isol:5.1,  diff:2, beauty:3, nature:4, canton:'GR', tags:['panoramic views']},
    {id:61, name:'Piz Nair',          lat:46.5017, lng:9.8423,  elev:3057, prom:320,  isol:4.8,  diff:2, beauty:4, nature:3, canton:'GR', tags:['panoramic views','ski resort nearby']},
    {id:62, name:'Piz Languard',      lat:46.4966, lng:9.9614,  elev:3262, prom:444,  isol:7.1,  diff:2, beauty:5, nature:5, canton:'GR', tags:['panoramic views','protected reserve']},
    {id:63, name:'Piz Beverin',       lat:46.5638, lng:9.2892,  elev:2998, prom:623,  isol:8.5,  diff:2, beauty:4, nature:4, canton:'GR', tags:['panoramic views','remote']},

    // TICINO (TI)
    {id:64, name:'Basodino',          lat:46.4201, lng:8.4737,  elev:3273, prom:1014, isol:15.9, diff:3, beauty:4, nature:5, canton:'TI', tags:['glacier','remote','protected reserve']},
    {id:65, name:'Pizzo Rotondo',     lat:46.5208, lng:8.6019,  elev:3192, prom:975,  isol:14.2, diff:3, beauty:4, nature:5, canton:'TI', tags:['remote','panoramic views']},
    {id:66, name:'Campo Tencia',      lat:46.4428, lng:8.7303,  elev:3072, prom:802,  isol:14.4, diff:3, beauty:4, nature:4, canton:'TI', tags:['remote','rocky']},
    {id:67, name:'Pizzo Vogel',       lat:46.3979, lng:8.9134,  elev:2673, prom:537,  isol:7.8,  diff:2, beauty:4, nature:4, canton:'TI', tags:['panoramic views','lake nearby']},

    // CENTRAL SWITZERLAND
    {id:68, name:'Titlis',            lat:46.7720, lng:8.4257,  elev:3238, prom:1190, isol:17.8, diff:2, beauty:5, nature:4, canton:'OW', tags:['glacier','panoramic views','ski resort nearby']},
    {id:69, name:'Dammastock',        lat:46.6426, lng:8.4302,  elev:3630, prom:1056, isol:15.9, diff:4, beauty:5, nature:5, canton:'UR', tags:['glacier','remote','panoramic views']},
    {id:70, name:'Urirotstock',       lat:46.8619, lng:8.5876,  elev:2928, prom:831,  isol:13.4, diff:3, beauty:4, nature:4, canton:'UR', tags:['rocky','panoramic views']},
    {id:71, name:'Brisen',            lat:46.8941, lng:8.4769,  elev:2404, prom:916,  isol:12.3, diff:2, beauty:3, nature:4, canton:'NW', tags:['panoramic views','forest']},
    {id:72, name:'Pilatus',           lat:46.9791, lng:8.2529,  elev:2132, prom:1628, isol:22.8, diff:2, beauty:5, nature:4, canton:'LU', tags:['panoramic views','lake nearby','rocky']},
    {id:73, name:'Rigi',              lat:47.0566, lng:8.4840,  elev:1798, prom:786,  isol:11.0, diff:1, beauty:4, nature:4, canton:'SZ', tags:['panoramic views','lake nearby','forest']},
    {id:74, name:'Fronalpstock',      lat:46.9780, lng:8.6630,  elev:1922, prom:549,  isol:7.1,  diff:1, beauty:4, nature:4, canton:'SZ', tags:['panoramic views','lake nearby']},

    // GLARUS (GL)
    {id:75, name:'Glarnisch',         lat:47.0018, lng:9.0002,  elev:2914, prom:1119, isol:16.8, diff:3, beauty:4, nature:4, canton:'GL', tags:['rocky','panoramic views']},
    {id:76, name:'Hausstock',         lat:46.8774, lng:9.0505,  elev:3158, prom:568,  isol:8.5,  diff:4, beauty:4, nature:5, canton:'GL', tags:['rocky','remote','glacier']},
    {id:77, name:'Bächistöck',        lat:47.0245, lng:8.9814,  elev:2916, prom:362,  isol:4.5,  diff:3, beauty:4, nature:4, canton:'GL', tags:['rocky','panoramic views']},

    // EASTERN SWITZERLAND
    {id:78, name:'Säntis',            lat:47.2491, lng:9.3431,  elev:2502, prom:1689, isol:31.4, diff:2, beauty:5, nature:5, canton:'AR', tags:['panoramic views','rocky','protected reserve']},
    {id:79, name:'Hinterrugg',        lat:47.1467, lng:9.2234,  elev:2306, prom:711,  isol:9.6,  diff:2, beauty:4, nature:4, canton:'SG', tags:['panoramic views','rocky']},
    {id:80, name:'Uetliberg',         lat:47.3516, lng:8.4909,  elev:871,  prom:436,  isol:7.5,  diff:1, beauty:3, nature:3, canton:'ZH', tags:['forest','panoramic views']},

    // JURA / WESTERN
    {id:81, name:'Chasseral',         lat:47.1310, lng:7.0558,  elev:1607, prom:1143, isol:23.9, diff:1, beauty:4, nature:5, canton:'BE', tags:['panoramic views','protected reserve','forest']},
    {id:82, name:'Dents du Midi',     lat:46.1687, lng:6.9541,  elev:3257, prom:1112, isol:19.7, diff:4, beauty:5, nature:5, canton:'VS', tags:['rocky','panoramic views','protected reserve']},
    {id:83, name:'Les Diablerets',    lat:46.3567, lng:7.1879,  elev:3210, prom:1099, isol:17.6, diff:3, beauty:5, nature:5, canton:'VD', tags:['glacier','panoramic views','ski resort nearby']},
    {id:84, name:'Grand Muveran',     lat:46.2531, lng:7.0759,  elev:3051, prom:412,  isol:6.2,  diff:3, beauty:4, nature:4, canton:'VD', tags:['rocky','panoramic views']},
    {id:85, name:'Rochers de Naye',   lat:46.4388, lng:6.9802,  elev:2042, prom:644,  isol:9.1,  diff:1, beauty:4, nature:4, canton:'VD', tags:['panoramic views','lake nearby']},
    {id:86, name:'Moléson',           lat:46.5475, lng:7.0165,  elev:2002, prom:697,  isol:9.5,  diff:1, beauty:4, nature:4, canton:'FR', tags:['panoramic views','forest']},
    {id:87, name:'Crêt de la Neige',  lat:46.2625, lng:5.9775,  elev:1720, prom:510,  isol:8.2,  diff:1, beauty:3, nature:4, canton:'GE', tags:['forest','panoramic views']},
    {id:88, name:'Tour d\'Aï',        lat:46.5028, lng:6.9679,  elev:2331, prom:583,  isol:8.2,  diff:3, beauty:4, nature:4, canton:'VD', tags:['rocky','panoramic views']},
    {id:89, name:'Gummfluh',          lat:46.5009, lng:7.2167,  elev:2458, prom:559,  isol:8.4,  diff:2, beauty:4, nature:4, canton:'FR', tags:['rocky','panoramic views']},
    {id:90, name:'Vanil Noir',        lat:46.5248, lng:7.1509,  elev:2389, prom:461,  isol:6.8,  diff:2, beauty:4, nature:5, canton:'FR', tags:['rocky','protected reserve','panoramic views']},
  ];

  // ── CANTON BOUNDING BOXES ────────────────────────────────────────────────────
  // [latMin, latMax, lngMin, lngMax, elevBase, elevRange, count]
  const CANTON_CFG = {
    VS: [45.87, 46.65, 6.82, 8.48,  1600, 2600, 60],
    GR: [46.17, 47.07, 8.65, 10.48, 1400, 2000, 55],
    BE: [46.31, 47.48, 6.86, 8.43,  1200, 2000, 45],
    TI: [45.82, 46.55, 8.37, 9.14,  1000, 1800, 35],
    GL: [46.77, 47.17, 8.84, 9.43,  1000, 1800, 20],
    UR: [46.58, 46.98, 8.28, 8.91,  1100, 2000, 22],
    OW: [46.72, 46.96, 7.97, 8.28,   900, 1800, 12],
    NW: [46.77, 46.98, 8.17, 8.36,   800, 1600, 10],
    SZ: [46.88, 47.25, 8.44, 8.98,   600, 1400, 14],
    LU: [46.84, 47.30, 7.81, 8.45,   500, 1200, 12],
    ZG: [47.07, 47.27, 8.37, 8.63,   400,  800, 6],
    ZH: [47.15, 47.70, 8.37, 8.92,   300,  700, 8],
    SG: [47.02, 47.52, 8.83, 9.68,   600, 1500, 16],
    TG: [47.45, 47.73, 8.63, 9.37,   300,  600, 6],
    SH: [47.60, 47.82, 8.38, 8.79,   300,  500, 5],
    AG: [47.19, 47.63, 7.72, 8.47,   300,  800, 8],
    SO: [47.16, 47.62, 7.25, 7.93,   400, 1000, 8],
    BL: [47.32, 47.60, 7.51, 7.90,   400,  900, 6],
    BS: [47.52, 47.60, 7.54, 7.67,   250,  300, 2],
    FR: [46.51, 47.27, 6.87, 7.37,   700, 1400, 12],
    VD: [46.17, 46.97, 6.07, 7.17,   700, 1600, 14],
    NE: [46.87, 47.26, 6.51, 7.12,   700, 1200, 8],
    JU: [47.13, 47.62, 6.83, 7.56,   700, 1100, 8],
    GE: [46.13, 46.35, 5.96, 6.31,   250,  400, 3],
    AI: [47.25, 47.44, 9.40, 9.58,   800, 1400, 5],
    AR: [47.30, 47.50, 9.19, 9.55,   700, 1400, 5],
  };

  const ALL_TAGS = ['glacier','rocky','protected reserve','panoramic views','remote','via ferrata','ski resort nearby','forest','lake nearby'];

  function srand(s) {
    const x = Math.sin(s + 3.7) * 98765.4321;
    return x - Math.floor(x);
  }

  function tagsByElev(elev, seed) {
    const tags = [];
    if (elev > 3200 && srand(seed)     > 0.35) tags.push('glacier');
    if (elev > 2200 && srand(seed + 1) > 0.45) tags.push('rocky');
    if (elev < 1800 && srand(seed + 2) > 0.50) tags.push('forest');
    if (elev < 2000 && srand(seed + 3) > 0.55) tags.push('lake nearby');
    if (elev > 2800 && srand(seed + 4) > 0.60) tags.push('remote');
    if (elev > 1500 && srand(seed + 5) > 0.55) tags.push('panoramic views');
    if (elev > 2500 && srand(seed + 6) > 0.70) tags.push('via ferrata');
    if (srand(seed + 7) > 0.80)                tags.push('ski resort nearby');
    if (srand(seed + 8) > 0.80)                tags.push('protected reserve');
    return tags.length ? tags : ['panoramic views'];
  }

  // Generate procedural peaks
  const PROC_NAMES = [
    'Horn','Spitze','Stock','Haupt','Berg','Grat','Kopf','Egg','Fluh','Chöpf',
    'Firn','Kulm','Gipfel','Wand','Alp','Zinne','Zahn','Turm','Burg','Stein'
  ];
  const PREFIXES = [
    'Gross','Klein','Hinter','Vorder','Ober','Unter','Schwarz','Weiss','Rot','Grün',
    'Rund','Spitz','Lang','Breit','Hoch','Nieder','Alt','Neu','Wild','Schön'
  ];

  let nextId = 91;
  const PROCEDURAL = [];

  for (const [canton, cfg] of Object.entries(CANTON_CFG)) {
    const [latMin, latMax, lngMin, lngMax, elevBase, elevRange, count] = cfg;
    for (let i = 0; i < count; i++) {
      const seed = nextId * 37 + i * 13;
      const lat = latMin + srand(seed)     * (latMax - latMin);
      const lng = lngMin + srand(seed + 1) * (lngMax - lngMin);
      const elev = Math.round(elevBase + srand(seed + 2) * elevRange);
      const prom = Math.round(elev * (0.05 + srand(seed + 3) * 0.35));
      const isol = Math.round((1 + srand(seed + 4) * 49) * 10) / 10;
      const diff = Math.min(5, Math.max(1, Math.round(1 + (elev - 500) / 900 + (srand(seed + 5) - 0.5) * 1.5)));
      const beauty = Math.min(5, Math.max(1, Math.round(2 + srand(seed + 6) * 3)));
      const nature = Math.min(5, Math.max(1, Math.round(2 + srand(seed + 7) * 3)));
      const prefix = PREFIXES[Math.floor(srand(seed + 8) * PREFIXES.length)];
      const suffix = PROC_NAMES[Math.floor(srand(seed + 9) * PROC_NAMES.length)];
      const name = prefix + suffix;
      const tags = tagsByElev(elev, seed + 10);
      PROCEDURAL.push({ id: nextId++, name, lat, lng, elevation: elev, prominence: prom, isolation: isol, difficulty: diff, beauty, nature, canton, tags, description: `${name} in ${canton}, ${elev}m.` });
    }
  }

  // Merge and expose
  const real = REAL.map(r => ({ ...r, elevation: r.elev, description: `${r.name}, ${r.elev}m above sea level.` }));
  window.MOUNTAINS = [...real, ...PROCEDURAL];
})();
