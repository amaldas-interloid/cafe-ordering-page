const menu = [
  {
    id: 1,
    name: "Ghee Roast Dosa",
    category: "tiffin",
    price: 120,
    veg: true,
    icon: "🥞",
    desc: "Crisp paper dosa with sambar and three chutneys.",
  },
  {
    id: 2,
    name: "Idli Vada Combo",
    category: "tiffin",
    price: 80,
    veg: true,
    icon: "🍚",
    desc: "Two soft idlis and one medu vada.",
  },
  {
    id: 3,
    name: "Egg Dosa",
    category: "tiffin",
    price: 110,
    veg: false,
    icon: "🍳",
    desc: "Dosa topped with a spiced egg layer.",
  },
  {
    id: 4,
    name: "Rava Pongal",
    category: "tiffin",
    price: 90,
    veg: true,
    icon: "🥣",
    desc: "Pepper and cumin pongal with coconut chutney.",
  },
  {
    id: 5,
    name: "South Indian Meals",
    category: "meals",
    price: 180,
    veg: true,
    icon: "🍛",
    desc: "Rice, sambar, rasam, two poriyals, curd, payasam.",
  },
  {
    id: 6,
    name: "Chicken Biryani",
    category: "meals",
    price: 240,
    veg: false,
    icon: "🍗",
    desc: "Seeraga samba biryani with raita and brinjal curry.",
  },
  {
    id: 7,
    name: "Curd Rice",
    category: "meals",
    price: 90,
    veg: true,
    icon: "🍚",
    desc: "Cool curd rice with pomegranate and pickle.",
  },
  {
    id: 8,
    name: "Chicken 65",
    category: "snacks",
    price: 190,
    veg: false,
    icon: "🍖",
    desc: "Crispy, red-chilli fried chicken bites.",
  },
  {
    id: 9,
    name: "Onion Pakoda",
    category: "snacks",
    price: 60,
    veg: true,
    icon: "🧅",
    desc: "Crunchy onion fritters, fresh from the kadai.",
  },
  {
    id: 10,
    name: "Bajji Platter",
    category: "snacks",
    price: 70,
    veg: true,
    icon: "🌶️",
    desc: "Chilli, raw banana and potato bajji.",
  },
  {
    id: 11,
    name: "Filter Kaapi",
    category: "drinks",
    price: 40,
    veg: true,
    icon: "☕",
    desc: "Our house decoction with frothy milk.",
  },
  {
    id: 12,
    name: "Rose Milk",
    category: "drinks",
    price: 55,
    veg: true,
    icon: "🥛",
    desc: "Chilled milk with rose syrup and sabja.",
  },
];

const cart = [];

const menuGrid = document.querySelector("#menu-grid");
const cartList = document.querySelector("#cart-list");
const cartEmpty = document.querySelector("#cart-empty");
const cartTitle = document.querySelector("#cart-title");
const totalElement = document.querySelector("#total");

function renderMenu() {
  menu.forEach((dish) => {
    const article = document.createElement("article");

    article.className = "dish";

    if (!dish.veg) {
      article.classList.add("nonveg");
    }

    const dishArt = document.createElement("div");
    dishArt.className = "dish-art";
    dishArt.textContent = dish.icon;

    const dishBody = document.createElement("div");
    dishBody.className = "dish-body";

    const dishTitle = document.createElement("div");
    dishTitle.className = "dish-title";

    const foodMark = document.createElement("span");
    foodMark.className = "food-mark";
    foodMark.title = dish.veg ? "Vegetarian" : "Non-vegetarian";

    const dishName = document.createElement("h3");
    dishName.textContent = dish.name;

    dishTitle.append(foodMark, dishName);

    const dishDescription = document.createElement("p");
    dishDescription.className = "dish-desc";
    dishDescription.textContent = dish.desc;

    const dishFoot = document.createElement("div");
    dishFoot.className = "dish-foot";

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = `₹${dish.price}`;

    const addButton = document.createElement("button");
    addButton.className = "add-button";
    addButton.type = "button";

    const cartLine = cart.find((item) => item.id === dish.id);

    if (cartLine) {
      addButton.textContent = `Added (${cartLine.qty})`;
    } else {
      addButton.textContent = "Add";
    }

    addButton.addEventListener("click", () => {
      addToCart(dish.id);
    });

    dishFoot.append(price, addButton);

    dishBody.append(dishTitle, dishDescription, dishFoot);

    article.append(dishArt, dishBody);

    menuGrid.append(article);
  });
}

function addToCart(id) {
  const line = cart.find((item) => item.id === id);

  if (line) {
    line.qty++;
  } else {
    cart.push({
      id: id,
      qty: 1,
    });
  }
  renderMenu();
  renderCart();
}


function renderCart() {

  let total = 0;
  let itemCount = 0;

  cart.forEach((line) => {
    const dish = menu.find((item) => item.id === line.id);

    const linePrice = dish.price * line.qty;

    total += linePrice;
    itemCount += line.qty;

    const listItem = document.createElement("li");
    listItem.className = "cart-item";

    const name = document.createElement("span");
    name.className = "cart-item-name";
    name.textContent = `${dish.name} x ${line.qty}`;

    const price = document.createElement("span");
    price.className = "cart-item-price";
    price.textContent = `₹${linePrice}`;

    listItem.append(name, price);

    cartList.append(listItem);
  });
}
renderMenu();
