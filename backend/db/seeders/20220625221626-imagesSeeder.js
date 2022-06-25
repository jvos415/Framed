'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Images', [
    {
     userId: 1,
     imageUrl: "https://cdn.theatlantic.com/thumbor/971MKCF2WLdRswcPL166EBg0LO8=/1200x801/media/img/photo/2020/10/california-photos/a01_1145070518/original.jpg",
     title: "Sunset in the Golden State",
     description: "Sunset over the valley"
   },
   {
    userId: 1,
    imageUrl: "https://cdn.theatlantic.com/thumbor/wb9mEiWtPTQQSrgOJplBi0sJbvc=/1200x800/media/img/photo/2020/10/california-photos/a04_1211217378/original.jpg",
    title: "Emerald Bay",
    description: "Overlooking Emerald Bay and Lake Tahoe"
  },
  {
    userId: 1,
    imageUrl: "https://cdn.theatlantic.com/thumbor/dGYDwXZEcnajiH_C548GH3tCsCo=/1200x800/media/img/photo/2020/10/california-photos/a06_1221851353/original.jpg",
    title: "The Painted Ladies",
    description: "The Painted Ladies at dusk. SF, CA"
  },
  {
    userId: 2,
    imageUrl: "https://cdn.theatlantic.com/thumbor/oXSEjwhvgcGyKp9nTg6dN1JAKLI=/1200x801/media/img/photo/2020/10/california-photos/a11_604576095/original.jpg",
    title: "The Painted Ladies",
    description: "The Painted Ladies at dusk. SF, CA"
  },
  {
    userId: 2,
    imageUrl: "https://cdn.theatlantic.com/thumbor/TqRIZNmZZk-UsiDbKDcCLybptDI=/1200x785/media/img/photo/2020/10/california-photos/a15_1035842622/original.jpg",
    title: "The Port of Long Beach",
    description: "Over views of the shipping containers at the Port of Long Beach, CA"
  },
  {
    userId: 3,
    imageUrl: "https://cdn.theatlantic.com/thumbor/e7-NmHZSszwBPSVtS7SxbUQ8I8Y=/1200x760/media/img/photo/2020/10/california-photos/a22_1143812363/original.jpg",
    title: "Santa Ynez County Side",
    description: "Cows roaming on the Santa Ynez country side"
  },
  {
    userId: 3,
    imageUrl: "https://cdn.theatlantic.com/thumbor/MpOdnwKIuGJuA9uBMGlDVQZsieQ=/1200x800/media/img/photo/2020/10/california-photos/a33_839716954/original.jpg",
    title: "Sea Lion",
    description: "Youthful sea lion playing among an kelp forest"
  },
  {
    userId: 4,
    imageUrl: "https://cdn.theatlantic.com/thumbor/mmJTRqsQcYIuXvuvRn7_p9FVsfA=/1200x862/media/img/photo/2020/10/california-photos/a44_AP737415344849/original.jpg",
    title: "SF Skyline",
    description: "The iconic San Francisco skyline at dusk"
  },
  {
    userId: 4,
    imageUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    title: "Tree at Sunset",
    description: "A tree in wild skies at dusk"
  },
  {
    userId: 4,
    imageUrl: "https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg",
    title: "Lake House in the Alps",
    description: "A picture perfect lake house nestled in the the Alps"
  },
  {
    userId: 4,
    imageUrl: "https://cdn.pixabay.com/photo/2013/07/25/13/01/stones-167089_1280.jpg",
    title: "Color Stones",
    description: "Vibrantly colored stones with interesting texture"
  },
  {
    userId: 5,
    imageUrl: "https://cdn.pixabay.com/photo/2022/06/22/16/10/cathedral-7278228_1280.jpg",
    title: "European Streets",
    description: "A street leading to a church in Europe"
  },
  {
    userId: 5,
    imageUrl: "https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?cs=srgb&dl=pexels-jovana-nesic-593655.jpg&fm=jpg",
    title: "Morning Rose",
    description: "A fresh and vibrant red rose"
  },
  {
    userId: 5,
    imageUrl: "https://images.pexels.com/photos/460635/pexels-photo-460635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Cherry Blossoms",
    description: "Cherry blossoms near the creek side"
  },
  {
    userId: 6,
    imageUrl: "https://sloanreview.mit.edu/content/uploads/2019/09/GEN-Davenport-Digital-Transformation-Customer-Experience-2400-1290x860.jpg",
    title: "Digital Butterfly",
    description: "Digital butterfly"
  },
  {
    userId: 6,
    imageUrl: "https://www.dualshockers.com/static/uploads/2014/01/digital-tunnel-wallpaper1.jpg",
    title: "Binary Tunnel",
    description: "Binary tunnel"
  },
  {
    userId: 6,
    imageUrl: "https://cdn.wallpapersafari.com/57/71/qJMmQd.jpg",
    title: "Future Planet",
    description: "A digital art piece of a future world"
  },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Images', null, {});
  }
};
