use('TPFinal');

//SELECT
// 1 
//db.sample_supplies.countDocuments()

// 2
// db.sample_supplies.aggregate([
//     {
//       $unwind: "$items"
//     },
//     {
//       $group: {
//         _id: "$items.name",
//         totalQuantitySold: { $sum: "$items.quantity" }
//       }
//     },
//     {
//       $sort: { totalQuantitySold: -1 }
//     },
//     {
//       $limit: 10
//     }
// ])
  
// 3
// db.sample_supplies.aggregate([
//     {
//         $unwind: "$items"
//     },
//     {
//         $group: {
//             _id: "$customer.email",
//             totalAmountSpent: { 
//               $sum: { 
//                 $multiply: [
//                   { $toDouble: "$items.price.$numberDecimal" },
//                   "$items.quantity"
//                 ] 
//               } 
//             }
//           }
//     },
//     {
//         $sort: { totalAmountSpent: -1 }
//     },
//     {
//         $limit: 5
//     }
// ])
      
// 4
// db.sample_supplies.aggregate([
//     {
//       $unwind: "$items"
//     },
//     {
//       $group: {
//         _id: "$items.name",
//         totalRevenue: { 
//           $sum: { 
//             $multiply: [
//               { $toDouble: { $ifNull: ["$items.price.$numberDecimal", "$items.price"] } },
//               "$items.quantity"
//             ] 
//           } 
//         }
//       }
//     },
//     {
//       $project: {
//         _id: 0, 
//         categoryName: "$_id",
//         totalRevenue: 1
//       }
//     },
//     {
//       $sort: { totalRevenue: -1 }
//     }
// ])

// 5   
// db.sample_supplies.aggregate([
//     {
//       $project: {
//         dayOfWeek: { $dayOfWeek: "$saleDate" }
//       }
//     },
//     {
//       $group: {
//         _id: "$dayOfWeek",
//         totalSales: { $sum: 1 }
//       }
//     },
//     {
//       $sort: { _id: 1 }
//     }
// ])

// 6
// db.sample_supplies.aggregate([
//     {
//       $unwind: "$items"
//     },
//     {
//       $group: {
//         _id: "$items.name",
//         totalRevenue: { 
//           $sum: { 
//             $multiply: [
//               { $toDouble: { $ifNull: ["$items.price.$numberDecimal", "$items.price"] } },
//               "$items.quantity"
//             ] 
//           } 
//         }
//       }
//     },
//     {
//       $sort: { totalRevenue: -1 }
//     },
//     {
//       $limit: 10
//     }
// ])

//7
// db.sample_supplies.aggregate([
//     {
//       $unwind: "$items"
//     },
//     {
//       $addFields: {
//         totalMontantVente: {
//           $multiply: [
//             { $toDouble: { $ifNull: ["$items.price.$numberDecimal", "$items.price"] } },
//             "$items.quantity"
//           ]
//         }
//       }
//     },
//     {
//       $sort: { totalMontantVente: -1 }
//     },
//     {
//       $limit: 1
//     },
//     {
//       $project: {
//         _id: 0,
//         saleId: "$_id",
//         productName: "$items.name",
//         totalMontantVente: 1
//       }
//     }
//   ])

//8
// db.sample_supplies.aggregate([
//     {
//       $unwind: "$items"
//     },
//     {
//       $group: {
//         _id: "$_id",
//         totalItemsSold: { $sum: "$items.quantity" }
//       }
//     },
//     {
//       $group: {
//         _id: null,
//         averageItemsSold: { $avg: "$totalItemsSold" }
//       }
//     }
//   ])

//9
// db.sample_supplies.aggregate([
//     {
//       $match: {
//         "saleDate": {
//           $gte: ISODate("2014-05-17"),
//           $lte: ISODate("2014-05-24")
//         }
//       }
//     },
//     {
//       $group: {
//         _id: "$customer.email",
//         totalSales: { $sum: 1 }
//       }
//     }
//   ])
  
// 10
// db.sample_supplies.aggregate([
//     {
//       $unwind: "$items"
//     },
//     {
//       $group: {
//         _id: "$customer.email",
//         totalArgentDepense: {
//           $sum: {
//             $multiply: [
//               { $toDouble: { $ifNull: ["$items.price.$numberDecimal", "$items.price"] } }, // Convertir le prix en nombre
//               "$items.quantity"
//             ]
//           }
//         }
//       }
//     },
//     {
//       $group: {
//         _id: null,
//         depenseMoyenne: { $avg: "$totalArgentDepense" }
//       }
//     }
// ])
  
//INSERT

// 1
// db.sample_guides.insertOne({
//     "name": "NouvellePlanete",
//     "orderFromSun": 8,
//     "hasRings": false,
//     "mainAtmosphere": [
//       "N2",
//       "O2",
//       "CO2"
//     ],
//     "surfaceTemperatureC": {
//       "min": -100,
//       "max": 50,
//       "mean": 25
//     }
//   })

// 2
// var diameters = {
//     "Mercure": 4879,
//     "Venus": 12104,
//     "Terre": 12742,
//     "Mars": 6779,
//     "Jupiter": 139820,
//     "Saturne": 116560,
//     "Uranus": 50724,
//     "Neptune": 49244
//   };
  
//   Object.keys(diameters).forEach(function(planetName) {
//     db.sample_guides.updateOne(
//       { "name": planetName },
//       { $set: { "diameter": diameters[planetName] } }
//     );
//   });
  
// 3 
// db.sample_guides.aggregate([
//     {
//       $set: {
//         "diameter": {
//           $switch: {
//             branches: [
//               { case: { $eq: ["$name", "Mercure"] }, then: 4879 },
//               { case: { $eq: ["$name", "Venus"] }, then: 12104 },
//               { case: { $eq: ["$name", "Terre"] }, then: 12756 },
//               { case: { $eq: ["$name", "Mars"] }, then: 6792 },
//               { case: { $eq: ["$name", "Jupiter"] }, then: 142984 },
//               { case: { $eq: ["$name", "Saturne"] }, then: 120536 },
//               { case: { $eq: ["$name", "Uranus"] }, then: 51118 },
//               { case: { $eq: ["$name", "Neptune"] }, then: 49528 }
//             ],
//             default: null
//           }
//         }
//       }
//     },
//     { $sort: { "diameter": 1 } },
//     {
//       $set: {
//         "orderFromSun": { $add: [{ $indexOfArray: ["$name", "$_id"] }, 1] }
//       }
//     }
//   ])
  
// 4
// db.sample_guides.updateOne(
//     { "name": "Venus" },
//     { $pull: { "mainAtmosphere": "N2" } }
//   )

// 5 
// db.sample_guides.updateOne(
//     { "name": "Saturne" }, 
//     { $set: { "surfaceTemperatureC.mean": -261.15 } }
// )
  
  
  
  
  