export type Product = typeof productData[number];

const productData = [
  {
    id: '1',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/sadhasdocasdc.jpg',
    tag: 'Featured',
    featureClass: 'tag-featured',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile1.jpg',
    currentBid: 'Current Bid',
    activity: 'Activity',
    name: 'Walter Russell',
    count: '2.5k+',
    title: 'Motion Blender',
    artistId: '@russell',
    price: '23.46 ETH',
  },
  {
    id: '2',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/6244170cdbc1b582421642.gif',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile4.jpg',
    artistId: '@john.874',
    title: 'Walking Girl',
    currentBid: 'Current Bid',
    price: '53.46 ETH',
    activity: 'Activity',
    name: 'John Schreffler',
  },
  {
    id: '3',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/vfvkodfvdv.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile2.jpg',
    artistId: '@jobanico',
    title: 'Coloured Bat',
    currentBid: 'Current Bid',
    price: '43.46 ETH',
    activity: 'Activity',
    name: 'Jobanico Mina',
  },
  {
    id: '4',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art46.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile3.jpg',
    artistId: '@mary.hano',
    title: 'Coloured Cartoon',
    currentBid: 'Current Bid',
    price: '23.66 ETH',
    activity: 'Activity',
    name: 'Mary Callahan',
  },
  {
    id: '5',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art5.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile5.jpg',
    artistId: '@chess.62',
    title: 'Rainbow Horse',
    currentBid: 'Current Bid',
    price: '23.62 ETH',
    activity: 'Activity',
    name: 'Kenny Chess',
  },
  {
    id: '6',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/fvbsdhu-fgvsfgv.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile7.jpg',
    artistId: '@stephens',
    title: 'Robotic Illustration',
    currentBid: 'Current Bid',
    price: '43.46 ETH',
    activity: 'Activity',
    name: 'Patricia Stephens',
  },
  {
    id: '7',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/624415f0c23c9169046500.gif',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile6.jpg',
    artistId: '@johnson',
    title: 'Portrait Artwork',
    currentBid: 'Current Bid',
    price: '23.46 ETH',
    activity: 'Activity',
    name: 'Murray Johnson',
  },
  {
    id: '8',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art8.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile9.jpg',
    artistId: '@jerrifo',
    title: 'Juice Drinking',
    currentBid: 'Current Bid',
    price: '23.46 ETH',
    activity: 'Activity',
    name: 'Jeffrey Hayes',
  },
  {
    id: '9',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/gndfodfkbgdf.jpg',
    tag: 'Featured',
    featureClass: 'tag-featured',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile8.jpg',
    artistId: '@shaly.bt',
    title: 'Cartoon Bird',
    currentBid: 'Current Bid',
    price: '24.46 ETH',
    activity: 'Activity',
    name: 'Ralph Shaly Weeks',
  },
  {
    id: '10',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/bnkgbfgb.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile10.jpg',
    artistId: '@frederick',
    title: 'Abstract Motion',
    currentBid: 'Current Bid',
    price: '94.46 ETH',
    activity: 'Activity',
    name: 'Frederick Esposito',
  },
  {
    id: '11',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/624419cdcc721482318301.gif',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile11.jpg',
    artistId: '@candance',
    title: 'Dancing Bread',
    currentBid: 'Current Bid',
    price: '76.46 ETH',
    activity: 'Activity',
    name: 'Candance Harden',
  },
  {
    id: '12',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art2.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile12.jpg',
    artistId: '@murray',
    title: 'Halloween Scarecrow',
    currentBid: 'Current Bid',
    price: '23.46 ETH',
    activity: 'Activity',
    name: 'Murray Johnson',
  },
  {
    id: '13',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/62441afe467d8699022690.gif',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile13.jpg',
    artistId: '@sickler',
    title: 'Baloon Maker',
    currentBid: 'Current Bid',
    price: '79.46 ETH',
    activity: 'Activity',
    name: 'Wesley Sickler',
  },
  {
    id: '14',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/svunsdivsdv.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile15.jpg',
    artistId: '@yolanda',
    title: 'Abstract Illustrated',
    currentBid: 'Current Bid',
    price: '94.46 ETH',
    activity: 'Activity',
    name: 'Yolanda Tannenbaum',
  },
  {
    id: '15',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/vhdfivsdfgv.jpg',
    tag: 'Featured',
    featureClass: 'tag-featured',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile14.jpg',
    artistId: '@margaret',
    title: 'Vector Painting',
    currentBid: 'Current Bid',
    price: '23.46 ETH',
    activity: 'Activity',
    name: 'Margaret Krom',
  },
  {
    id: '16',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art7.jpg',
    tag: 'Featured',
    featureClass: 'tag-featured',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile16.jpg',
    artistId: '@stive.lio',
    title: 'Unicorn Ricock',
    currentBid: 'Current Bid',
    price: '34.46 ETH',
    activity: 'Activity',
    name: 'Stive Machman',
  },
  {
    id: '17',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art10.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile2.jpg',
    artistId: '@russell',
    title: 'Alien Rocsktar',
    currentBid: 'Current Bid',
    price: '33.46 ETH',
    activity: 'Activity',
    name: 'Walter Russell',
  },
  {
    id: '18',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art6.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile3.jpg',
    artistId: '@mary.hano',
    title: 'Nature Scenery',
    currentBid: 'Current Bid',
    price: '21.46 ETH',
    activity: 'Activity',
    name: 'Mary Callahan',
  },
  {
    id: '19',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/62441d5e2b80a671816939.gif',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile1.jpg',
    artistId: '@jobanico',
    title: 'Astronaut Playing',
    currentBid: 'Current Bid',
    price: '94.46 ETH',
    activity: 'Activity',
    name: 'Jobanico Mina',
  },
  {
    id: '20',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/fgbndfjibdf.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile4.jpg',
    artistId: '@john.874',
    title: 'Imoji Artwork',
    currentBid: 'Current Bid',
    price: '39.46 ETH',
    activity: 'Activity',
    name: 'John Schreffler',
  },
  {
    id: '21',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art20.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile5.jpg',
    artistId: '@chess.62',
    title: 'Modern Isometric',
    currentBid: 'Current Bid',
    price: '35.46 ETH',
    activity: 'Activity',
    name: 'Kenny Chess',
  },
  {
    id: '22',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art51.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile6.jpg',
    artistId: '@jerrifo',
    title: 'Startup Concept',
    currentBid: 'Current Bid',
    price: '51.46 ETH',
    activity: 'Activity',
    name: 'Jeffrey Hayes',
  },
  {
    id: '23',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art18.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile7.jpg',
    artistId: '@stephens',
    title: 'Social Profile Icon',
    currentBid: 'Current Bid',
    price: '67.46 ETH',
    activity: 'Activity',
    name: 'Patricia Stephens',
  },
  {
    id: '24',
    wrapperClass: 'col-xl-3 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art24.jpg',
    tag: 'Featured',
    featureClass: 'tag-featured',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile8.jpg',
    artistId: '@johnson',
    title: 'Easter Santa Clause',
    currentBid: 'Current Bid',
    price: '46.46 ETH',
    activity: 'Activity',
    name: 'Carol G. Johnson',
  },
  //rank data
  {
    id: '25',
    img: 'assets/img/art/art23.jpg',
    title: 'Local',
    volume: '10,4954',
    hours: '+100%',
    days: '-98.45%',
    bids: '98',
    price: '2.67 ETH',
    name: 'Stive Machman',
    count: '38.5k',
    profileImage: 'assets/img/profile/profile1.jpg',
  },
  {
    id: '26',
    img: 'assets/img/art/art24.jpg',
    title: 'Local',
    volume: '10,4954',
    hours: '+100%',
    days: '-98.45%',
    bids: '97',
    price: '2.55 ETH',
    name: 'Jobanico Mina',
    count: '36.5k',
    profileImage: 'assets/img/profile/profile4.jpg',
  },
  {
    id: '27',
    img: 'assets/img/art/art25.jpg',
    title: 'Local',
    volume: '10,4954',
    hours: '+100%',
    days: '-98.45%',
    bids: '96',
    price: '3.22 ETH',
    name: 'Kallaban Joy',
    count: '32.5k',
    profileImage: 'assets/img/profile/profile5.jpg',
  },
  {
    id: '28',
    img: 'assets/img/art/art26.jpg',
    title: 'Local',
    volume: '10,4954',
    hours: '+100%',
    days: '-98.45%',
    bids: '95',
    price: '2.30 ETH',
    name: 'John Schreffler',
    count: '31.5k',
    profileImage: 'assets/img/profile/profile6.jpg',
  },
  {
    id: '29',
    img: 'assets/img/art/art27.jpg',
    title: 'Local',
    volume: '10,4954',
    hours: '+100%',
    days: '-98.45%',
    bids: '94',
    price: '3.43 ETH',
    name: 'Stive Long',
    count: '30.5k',
    profileImage: 'assets/img/profile/profile7.jpg',
  },
  {
    id: '30',
    img: 'assets/img/art/art28.jpg',
    title: 'Local',
    volume: '10,4954',
    hours: '+100%',
    days: '-98.45%',
    bids: '93',
    price: '2.31 ETH',
    name: 'Kenny Chess',
    count: '29.5k',
    profileImage: 'assets/img/profile/profile8.jpg',
  },
  {
    id: '31',
    img: 'assets/img/art/art29.jpg',
    title: 'Local',
    volume: '10,4954',
    hours: '+100%',
    days: '-98.45%',
    bids: '92',
    price: '2.78 ETH',
    name: 'Margaret Krom',
    count: '38.5k',
    profileImage: 'assets/img/profile/profile13.jpg',
  },
  {
    id: '32',
    img: 'assets/img/art/art30.jpg',
    title: 'Local',
    volume: '10,4954',
    hours: '+100%',
    days: '-98.45%',
    bids: '91',
    price: '2.65 ETH',
    name: 'Murray Johnson',
    count: '40.5k',
    profileImage: 'assets/img/profile/profile14.jpg',
  },
  {
    id: '33',
    img: 'assets/img/art/art1.jpg',
    title: 'Local',
    volume: '10,4954',
    hours: '+100%',
    days: '-98.45%',
    bids: '90',
    price: '2.83 ETH',
    name: 'Carol G. Johnson',
    count: '34.5k',
    profileImage: 'assets/img/profile/profile15.jpg',
  },
  {
    id: '34',
    img: 'assets/img/art/art2.jpg',
    title: 'Local',
    volume: '10,4954',
    hours: '+100%',
    days: '-98.45%',
    bids: '93',
    price: '3.43 ETH',
    name: 'Wesley Sickler',
    count: '32.5k',
    profileImage: 'assets/img/profile/profile16.jpg',
  },

  //for creator profile
  {
    id: '35',
    wrapperClass: 'col-xl-4 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/svunsdivsdv.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile15.jpg',
    artistId: '@yolanda',
    title: 'Abstract Illustrated',
    currentBid: 'Current Bid',
    price: '94.46 ETH',
    activity: 'Activity',
    name: 'Yolanda Tannenbaum',
  },
  {
    id: '36',
    wrapperClass: 'col-xl-4 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/vhdfivsdfgv.jpg',
    tag: 'Featured',
    featureClass: 'tag-featured',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile14.jpg',
    artistId: '@margaret',
    title: 'Vector Painting',
    currentBid: 'Current Bid',
    price: '23.46 ETH',
    activity: 'Activity',
    name: 'Margaret Krom',
  },
  {
    id: '37',
    wrapperClass: 'col-xl-4 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/6244170cdbc1b582421642.gif',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile4.jpg',
    artistId: '@john.874',
    title: 'Walking Girl',
    currentBid: 'Current Bid',
    price: '53.46 ETH',
    activity: 'Activity',
    name: 'John Schreffler',
  },
  {
    id: '38',
    wrapperClass: 'col-xl-4 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art10.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile2.jpg',
    artistId: '@russell',
    title: 'Alien Rocsktar',
    currentBid: 'Current Bid',
    price: '33.46 ETH',
    activity: 'Activity',
    name: 'Walter Russell',
  },
  {
    id: '39',
    wrapperClass: 'col-xl-4 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art6.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile3.jpg',
    artistId: '@mary.hano',
    title: 'Nature Scenery',
    currentBid: 'Current Bid',
    price: '21.46 ETH',
    activity: 'Activity',
    name: 'Mary Callahan',
  },
  {
    id: '40',
    wrapperClass: 'col-xl-4 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/62441d5e2b80a671816939.gif',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile1.jpg',
    artistId: '@jobanico',
    title: 'Astronaut Playing',
    currentBid: 'Current Bid',
    price: '94.46 ETH',
    activity: 'Activity',
    name: 'Jobanico Mina',
  },
  {
    id: '41',
    wrapperClass: 'col-xl-4 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/fgbndfjibdf.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile4.jpg',
    artistId: '@john.874',
    title: 'Imoji Artwork',
    currentBid: 'Current Bid',
    price: '39.46 ETH',
    activity: 'Activity',
    name: 'John Schreffler',
  },
  {
    id: '42',
    wrapperClass: 'col-xl-4 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art20.jpg',
    tag: 'Featured',
    featureClass: 'tag-featured',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile5.jpg',
    artistId: '@chess.62',
    title: 'Modern Isometric',
    currentBid: 'Current Bid',
    price: '35.46 ETH',
    activity: 'Activity',
    name: 'Kenny Chess',
  },
  {
    id: '43',
    wrapperClass: 'col-xl-4 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art51.jpg',
    tag: 'Featured',
    featureClass: 'tag-featured',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile6.jpg',
    artistId: '@jerrifo',
    title: 'Startup Concept',
    currentBid: 'Current Bid',
    price: '51.46 ETH',
    activity: 'Activity',
    name: 'Jeffrey Hayes',
  },
  {
    id: '44',
    wrapperClass: 'col-xl-4 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art18.jpg',
    tag: 'Featured',
    featureClass: 'tag-featured',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile7.jpg',
    artistId: '@stephens',
    title: 'Social Profile Icon',
    currentBid: 'Current Bid',
    price: '67.46 ETH',
    activity: 'Activity',
    name: 'Patricia Stephens',
  },
  {
    id: '45',
    wrapperClass: 'col-xl-4 col-lg-4 col-md-6 col-sm-6',
    img: 'assets/img/art/art24.jpg',
    tag: 'Featured',
    featureClass: 'tag-featured',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile8.jpg',
    artistId: '@johnson',
    title: 'Easter Santa Clause',
    currentBid: 'Current Bid',
    price: '46.46 ETH',
    activity: 'Activity',
    name: 'Carol G. Johnson',
  },
  //oction slider
  {
    id: '46',
    wrapperClass: 'col-xl-12',
    img: 'assets/img/art/art51.jpg',
    tag: 'Featured',
    featureClass: 'tag-featured',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile6.jpg',
    artistId: '@jerrifo',
    title: 'Startup Concept',
    currentBid: 'Current Bid',
    price: '51.46 ETH',
    activity: 'Activity',
    name: 'Jeffrey Hayes',
  },
  {
    id: '47',
    wrapperClass: 'col-xl-12',
    img: 'assets/img/art/art18.jpg',
    tag: 'Featured',
    featureClass: 'tag-featured',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile7.jpg',
    artistId: '@stephens',
    title: 'Social Profile Icon',
    currentBid: 'Current Bid',
    price: '67.46 ETH',
    activity: 'Activity',
    name: 'Patricia Stephens',
  },
  {
    id: '48',
    wrapperClass: 'col-xl-12',
    img: 'assets/img/art/art24.jpg',
    tag: 'Featured',
    featureClass: 'tag-featured',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile8.jpg',
    artistId: '@johnson',
    title: 'Easter Santa Clause',
    currentBid: 'Current Bid',
    price: '46.46 ETH',
    activity: 'Activity',
    name: 'Carol G. Johnson',
  },

  //live bids

  {
    id: '49',
    wrapperClass: 'col-xl-12',
    img: 'assets/img/art/art2.jpg',
    tag: 'Featured',
    featureClass: 'tag-featured',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile12.jpg',
    artistId: '@murray',
    title: 'Halloween Scarecrow',
    currentBid: 'Current Bid',
    price: '23.46 ETH',
    activity: 'Activity',
    name: 'Murray Johnson',
  },
  {
    id: '50',
    wrapperClass: 'col-xl-12',
    img: 'assets/img/art/62441afe467d8699022690.gif',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile13.jpg',
    artistId: '@sickler',
    title: 'Baloon Maker',
    currentBid: 'Current Bid',
    price: '79.46 ETH',
    activity: 'Activity',
    name: 'Wesley Sickler',
  },
  {
    id: '51',
    wrapperClass: 'col-xl-12',
    img: 'assets/img/art/svunsdivsdv.jpg',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile15.jpg',
    artistId: '@yolanda',
    title: 'Abstract Illustrated',
    currentBid: 'Current Bid',
    price: '94.46 ETH',
    activity: 'Activity',
    name: 'Yolanda Tannenbaum',
  },
  {
    id: '52',
    wrapperClass: 'col-xl-12',
    img: 'assets/img/art/vhdfivsdfgv.jpg',
    tag: 'Featured',
    featureClass: 'tag-featured',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile14.jpg',
    artistId: '@margaret',
    title: 'Vector Painting',
    currentBid: 'Current Bid',
    price: '23.46 ETH',
    activity: 'Activity',
    name: 'Margaret Krom',
  },
  {
    id: '53',
    wrapperClass: 'col-xl-12',
    img: 'assets/img/art/624415f0c23c9169046500.gif',
    tag: 'Featured',
    featureClass: 'd-none',
    count: '2.5k+',
    bid: 'Place Bid',
    share: 'Share',
    report: 'Report',
    profileImage: 'assets/img/profile/profile6.jpg',
    artistId: '@johnson',
    title: 'Portrait Artwork',
    currentBid: 'Current Bid',
    price: '23.46 ETH',
    activity: 'Activity',
    name: 'Murray Johnson',
  },
];

export default productData;
