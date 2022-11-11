const daily_container = document.querySelector(".daily-container") //Kiválasztja a "-daily-container" -el ellátott elemet

const order_item = (e) => {
  const btn = e.path[1] // lekéri a dom elementet, hiszen a 2 headertől furán adja vissza.
  const btn_data = e.path[1].dataset // lekéri az adatokat a dom elementről

  if (!btn_data?.type) { console.error("nem találtunk típust!"); return } // megnézi, hogy létezik-e
  if (!btn_data?.id) { console.error("nem találtunk idt!"); return }      // megnézi, hogy létezik-e
  if (!btn_data?.price) { console.error("nem találtunk price!"); return } // megnézi, hogy létezik-e

  const orders = ORDERS.get_orders() // lekéri a rendeléseket

  if (orders[btn_data?.type]?.id !== btn_data.id) ORDERS.set_order(btn_data?.type, { type: btn_data.type, title: btn_data.title, id: btn_data.id, price: btn_data.price }) // hozzáadja a rendelésekhez, ezt a tárgyat.
}

// Megcsinálja egy étel típusnak a DOM részeit.
const createType = (title, type, meals) => {

  // fő container
  const content_w = document.createElement("div")
  content_w.classList.add("daily-content-w")

  // header
  const daily_type = document.createElement("h1")
  daily_type.classList.add("daily-type")
  daily_type.innerText = title || "Hiba..."

  // az ételek containerje.
  const __meals = document.createElement("div")
  __meals.classList.add("daily-meals")

  // hozzáadja a fő containerhez őket
  content_w.appendChild(daily_type)
  content_w.appendChild(__meals)
  daily_container.appendChild(content_w)


  // végig megy a kajákon (Start: 53. Sor)
  meals.forEach(element => {
    __meals.appendChild(createMeal(element, type))
  })

}


// létrehozza az ételt
const createMeal = (meal, meal_type) => {
  const elements_c = document.createElement("div")
  elements_c.classList.add("daily-elements") // hozzáadja a class-t

  const meal_c = document.createElement("div") // létrehozza a "div" elementet
  meal_c.classList.add("daily-elements-c")

  const bg = document.createElement("div")
  bg.classList.add("daily-elements-bg")
  bg.style.setProperty('--img', `url(../foods/${meal.id}.jpg)`) // a "--img"-nek beállítja a listában megadott képet (${meal.id} - Visszaadja a listába beírt képet)), így a css feltudja használni.

  const btn = document.createElement("button")

  btn.classList.add("daily-elements-order")
  // beállítja az adatokat a domon.
  btn.dataset.type = meal_type
  btn.dataset.title = meal.title
  btn.dataset.id = meal.id
  btn.dataset.price = meal.price

  btn.addEventListener("click", order_item)

  btn.innerHTML = `<h1>${meal.title}</h1><h1>Megrendelem - ${meal.price} Ft</h1>`

  meal_c.appendChild(bg)
  meal_c.appendChild(btn)

  elements_c.appendChild(meal_c)

  return elements_c
}
// létrehozza a Leveseket (Id = Kép, Title = Név, Price = Ár)
createType(
  "Levesek",
  "soups",
  [ 
    {
      id: "paloczleves",
      title: "Palóczleves",
      price: 1400
    },
    {
      id: "gulyasleves",
      title: "Gulyásleves",
      price: 2800
    },
    {
      id: "zoldsegleves",
      title: "Zöldségleves",
      price: 1600
    },
    {
      id: "husleves",
      title: "Húsleves",
      price: 1900
    },
    {
      id: "frankleves",
      title: "Frakfurti Leves",
      price: 1200
    },
    {
      id: "gyumolcsleves",
      title: "Gyümölcsleves",
      price: 1000
    }
  ]
)
// létrehozza a Főételeket (Id = Kép, Title = Név, Price = Ár)
createType(
  "Főételek",
  "main",
  [ 
    {
      id: "rakottkrumpli",
      title: "Rakott krumpli",
      price: 1400
    },
    {
      id: "porkolt",
      title: "Pörkölt",
      price: 2300
    },
    {
      id: "hamburger",
      title: "Hamburger",
      price: 2100
    },
    {
      id: "rantotthus",
      title: "Rántotthús",
      price: 1600
    },
    {
      id: "grizesteszta",
      title: "Grízes Tészta",
      price: 1750
    },
    {
      id: "lasange",
      title: "Lasagne",
      price: 2800
    },
  ]
)
// létrehozza a Desszerteket (Id = Kép, Title = Név, Price = Ár)
createType(
  "Desszert",
  "dessert",
  [ 
    {
      id: "meggyespite",
      title: "Meggyes Pite",
      price: 800
    },
    {
      id: "gofri",
      title: "Gofri",
      price: 1250
    },
    {
      id: "palacsinta",
      title: "Palacsinta",
      price: 950
    },
    {
      id: "mignon",
      title: "Mignon",
      price: 1185
    },
    {
      id: "kokuszgolyo",
      title: "Kókusz Golyó",
      price: 1750
    },
    {
      id: "madartej",
      title: "Madártej",
      price: 2250
    },
  ]
)
// létrehozza az italokat (Id = Kép, Title = Név, Price = Ár)
createType(
  "Italok", 
  "drinks",
  [ 
    {
      id: "fanta",
      title: "Fanta",
      price: 450
    },
    {
      id: "viz",
      title: "Víz",
      price: 225
    },
    {
      id: "mountaine",
      title: "Mountaine Dew",
      price: 650
    },
    {
      id: "kinley",
      title: "Kinley",
      price: 500
    },
    {
      id: "limonade",
      title: "Limonádé",
      price: 850
    },
    {
      id: "cocacola",
      title: "Coca Cola",
      price: 485
    },
  ]
)