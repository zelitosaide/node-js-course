// "use strict";

// module.exports = async function (fastify, opts) {
//   fastify.get("/", async function (request, reply) {
//     return [
//       {
//         id: "A1",
//         name: "Vacuum Cleaner",
//         rrp: "99.99",
//         info: "The suckiest vacuum in the world.",
//       },
//       {
//         id: "A2",
//         name: "Leaf Blower",
//         rrp: "303.33",
//         info: "This product will blow your socks off.",
//       },
//     ];
//   });
// };

"use strict";

const data = [
  {
    id: "A1",
    name: "Vacuum Cleaner",
    rrp: "99.99",
    info: "The suckiest vacuum in the world.",
  },
  {
    id: "A2",
    name: "Leaf Blower",
    rrp: "303.33",
    info: "This product will blow your socks off.",
  },
];

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    return data;
  });
  fastify.post("/", async function (request, reply) {
    request.mockDataInsert(opts.prefix.slice(1), data);
    return data;
  });
};
