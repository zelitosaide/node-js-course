// const populateProducts = async () => {
//   const products = document.querySelector("#products");
//   products.innerHTML = "";
//   const data = [
//     {
//       id: "A1",
//       name: "Vacuum Cleaner",
//       rrp: "99.99",
//       info: "The suckiest vacuum in the world.",
//     },
//     {
//       id: "A2",
//       name: "Leaf Blower",
//       rrp: "303.33",
//       info: "This product will blow your socks off.",
//     },
//     {
//       id: "B1",
//       name: "Chocolate Bar",
//       rrp: "22.40",
//       info: "Delicious overpriced chocolate.",
//     },
//   ];

//   for (const product of data) {
//     const item = document.createElement("product-item");
//     for (const key of ["name", "rrp", "info"]) {
//       const span = document.createElement("span");
//       span.slot = key;
//       span.textContent = product[key];
//       item.appendChild(span);
//     }
//     products.appendChild(item);
//   }
// };

const API = "http://localhost:3000";

// const populateProducts = async () => {
//   const products = document.querySelector("#products");
//   products.innerHTML = "";
//   const res = await fetch(API);
//   const data = await res.json();
//   for (const product of data) {
//     const item = document.createElement("product-item");
//     for (const key of ["name", "rrp", "info"]) {
//       const span = document.createElement("span");
//       span.slot = key;
//       span.textContent = product[key];
//       item.appendChild(span);
//     }
//     products.appendChild(item);
//   }
// };

// const populateProducts = async (category) => {
//   const products = document.querySelector("#products");
//   products.innerHTML = "";
//   const res = await fetch(`${API}/${category}`);
//   const data = await res.json();
//   for (const product of data) {
//     const item = document.createElement("product-item");
//     for (const key of ["name", "rrp", "info"]) {
//       const span = document.createElement("span");
//       span.slot = key;
//       span.textContent = product[key];
//       item.appendChild(span);
//     }
//     products.appendChild(item);
//   }
// };

const populateProducts = async (category, method = "GET", payload) => {
  const products = document.querySelector("#products");
  products.innerHTML = "";
  const send =
    method === "GET"
      ? {}
      : {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        };
  const res = await fetch(`${API}/${category}`, { method, ...send });
  const data = await res.json();
  for (const product of data) {
    const item = document.createElement("product-item");
    for (const key of ["name", "rrp", "info"]) {
      const span = document.createElement("span");
      span.slot = key;
      span.textContent = product[key];
      item.appendChild(span);
    }
    products.appendChild(item);
  }
};

// const category = document.querySelector("#category");

const category = document.querySelector("#category");
const add = document.querySelector("#add");

// document.querySelector("#fetch").addEventListener("click", async () => {
//   await populateProducts();
// });

// document.querySelector("#fetch").addEventListener("click", async () => {
//   await populateProducts();
// });

// category.addEventListener("input", async ({ target }) => {
//   await populateProducts(target.value);
// });

category.addEventListener("input", async ({ target }) => {
  add.style.display = "block";
  await populateProducts(target.value);
});

add.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { target } = e;
  const payload = {
    name: target.name.value,
    rrp: target.rrp.value,
    info: target.info.value,
  };
  await populateProducts(category.value, "POST", payload);
  target.reset();
});

// customElements.define(
//   "product-item",
//   class Item extends HTMLElement {
//     constructor() {
//       super();
//       const itemTmpl = document.querySelector("#item").content;
//       this.attachShadow({ mode: "open" }).appendChild(itemTmpl.cloneNode(true));
//     }
//   }
// );

// customElements.define(
//   "product-item",
//   class Item extends HTMLElement {
//     constructor() {
//       super();
//       const itemTmpl = document.querySelector("#item").content;
//       this.attachShadow({ mode: "open" }).appendChild(itemTmpl.cloneNode(true));
//     }
//   }
// );

// customElements.define(
//   "product-item",
//   class Item extends HTMLElement {
//     constructor() {
//       super();
//       const itemTmpl = document.querySelector("#item").content;
//       this.attachShadow({ mode: "open" }).appendChild(itemTmpl.cloneNode(true));
//     }
//   }
// );

customElements.define(
  "product-item",
  class Item extends HTMLElement {
    constructor() {
      super();
      const itemTmpl = document.querySelector("#item").content;
      this.attachShadow({ mode: "open" }).appendChild(itemTmpl.cloneNode(true));
    }
  }
);
