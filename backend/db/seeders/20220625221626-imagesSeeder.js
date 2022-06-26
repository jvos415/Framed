'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Images', [
    {
     userId: 1,
     imageUrl: "https://cdn.theatlantic.com/thumbor/971MKCF2WLdRswcPL166EBg0LO8=/1200x801/media/img/photo/2020/10/california-photos/a01_1145070518/original.jpg",
     title: "Sunset in the Golden State",
     description: "Sunset over the valley",
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
    userId: 1,
    imageUrl: "https://cdn.theatlantic.com/thumbor/wb9mEiWtPTQQSrgOJplBi0sJbvc=/1200x800/media/img/photo/2020/10/california-photos/a04_1211217378/original.jpg",
    title: "Emerald Bay",
    description: "Overlooking Emerald Bay and Lake Tahoe",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    imageUrl: "https://cdn.theatlantic.com/thumbor/dGYDwXZEcnajiH_C548GH3tCsCo=/1200x800/media/img/photo/2020/10/california-photos/a06_1221851353/original.jpg",
    title: "The Painted Ladies",
    description: "The Painted Ladies at dusk. SF, CA",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    imageUrl: "https://cdn.theatlantic.com/thumbor/oXSEjwhvgcGyKp9nTg6dN1JAKLI=/1200x801/media/img/photo/2020/10/california-photos/a11_604576095/original.jpg",
    title: "The Painted Ladies",
    description: "The Painted Ladies at dusk. SF, CA",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 2,
    imageUrl: "https://cdn.theatlantic.com/thumbor/TqRIZNmZZk-UsiDbKDcCLybptDI=/1200x785/media/img/photo/2020/10/california-photos/a15_1035842622/original.jpg",
    title: "The Port of Long Beach",
    description: "Over views of the shipping containers at the Port of Long Beach, CA",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 3,
    imageUrl: "https://cdn.theatlantic.com/thumbor/e7-NmHZSszwBPSVtS7SxbUQ8I8Y=/1200x760/media/img/photo/2020/10/california-photos/a22_1143812363/original.jpg",
    title: "Santa Ynez County Side",
    description: "Cows roaming on the Santa Ynez country side",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 3,
    imageUrl: "https://cdn.theatlantic.com/thumbor/MpOdnwKIuGJuA9uBMGlDVQZsieQ=/1200x800/media/img/photo/2020/10/california-photos/a33_839716954/original.jpg",
    title: "Sea Lion",
    description: "Youthful sea lion playing among an kelp forest",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    imageUrl: "https://cdn.theatlantic.com/thumbor/mmJTRqsQcYIuXvuvRn7_p9FVsfA=/1200x862/media/img/photo/2020/10/california-photos/a44_AP737415344849/original.jpg",
    title: "SF Skyline",
    description: "The iconic San Francisco skyline at dusk",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    imageUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    title: "Tree at Sunset",
    description: "A tree in wild skies at dusk",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    imageUrl: "https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg",
    title: "Lake House in the Alps",
    description: "A picture perfect lake house nestled in the the Alps",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 4,
    imageUrl: "https://cdn.pixabay.com/photo/2013/07/25/13/01/stones-167089_1280.jpg",
    title: "Color Stones",
    description: "Vibrantly colored stones with interesting texture",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    imageUrl: "https://cdn.pixabay.com/photo/2022/06/22/16/10/cathedral-7278228_1280.jpg",
    title: "European Streets",
    description: "A street leading to a church in Europe",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    imageUrl: "https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?cs=srgb&dl=pexels-jovana-nesic-593655.jpg&fm=jpg",
    title: "Morning Rose",
    description: "A fresh and vibrant red rose",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 5,
    imageUrl: "https://images.pexels.com/photos/460635/pexels-photo-460635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Cherry Blossoms",
    description: "Cherry blossoms near the creek side",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 6,
    imageUrl: "https://sloanreview.mit.edu/content/uploads/2019/09/GEN-Davenport-Digital-Transformation-Customer-Experience-2400-1290x860.jpg",
    title: "Digital Butterfly",
    description: "Digital butterfly",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 6,
    imageUrl: "https://cdn.wallpapersafari.com/57/71/qJMmQd.jpg",
    title: "Future Planet",
    description: "A digital art piece of a future world",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 6,
    imageUrl: "https://images.unsplash.com/photo-1546019170-f1f6e46039f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2895&q=80",
    title: "Woman On The Beach",
    description: "A woman standing on the beach looking out to the ocean on a cloudy day",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 6,
    imageUrl: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2866&q=80",
    title: "Man Looing Into Nature",
    description: "Man looking into nature",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 6,
    imageUrl: "https://images.freeimages.com/images/large-previews/13e/my-cat-1363423.jpg",
    title: "White Cat",
    description: "Cute white little cat on a sofa",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 6,
    imageUrl: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/little-cute-maltipoo-puppy-royalty-free-image-1652926025.jpg?crop=0.444xw:1.00xh;0.129xw,0&resize=980:*",
    title: "Maltipoo Snackin'",
    description: "A small light colored Matlipoo eating and looking cute",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 6,
    imageUrl: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/happy-dog-outdoors-royalty-free-image-1652927740.jpg?crop=0.447xw:1.00xh;0.187xw,0&resize=980:*",
    title: "Border Collie",
    description: "White and black border collie looking into the camera",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 6,
    imageUrl: "https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/pit-bull.jpg?crop=1.0xw:1xh;center,top&resize=980:*",
    title: "American Staffordshire Terrier",
    description: "Grey and white Staffordshire Terrier in the snow",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Images', null, {});
  }
};
