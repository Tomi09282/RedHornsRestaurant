const order_identifier = "redhorns__cart" // Key,value

var orders = {}

var __orders = localStorage.getItem(order_identifier) // lekéri a rendelésekeet

if (!__orders) localStorage.setItem(order_identifier, JSON.stringify({})) // ha üres/nem létezik a rendelés field, akkor beállítja.
else {
  try {
    const parsed_orders = JSON.parse(__orders) // a string jsont átalakítja rendes jsonné.
    orders = parsed_orders // beállítja a globális variable 'orders'-T

    setTimeout(() => {
      __REFRESH__ORDERS__() // 1000 másodperc után a domot frissíti.
    }, 1000);
  } catch {
    localStorage.setItem(order_identifier, JSON.stringify({})) // ha nem tudja átalakítani, akkor reseteli.
  }
}

const ORDERS = {
  get_orders: () => { return orders }, // visszaadja, a rendeléseket.
  set_order: (type, value) => {
    if (value) { // megnézi hogy van-e megadott adat.
      orders[type] = value
    } else { // ha nincs akkor kitörli az objectből az adott keyt.
      delete orders[type]
    }
    localStorage.setItem(order_identifier, JSON.stringify(orders)) // frissíti a local storaget

    __REFRESH__ORDERS__() // frissíti a DOMot
    return orders // visszaadja az új listát.
  }
}

// A RENDELÉS MENÜ MEGNYITÓJA

const OPEN_ORDER = () => {
  const order_container = document.querySelector(".order-container") // kiválasztjuk az order-container elemet a domból.
  const navbar_links_c = document.querySelector(".navbar-links-c") // kiválasztjuk az navbar-links-c elemet a domból.

  if (!order_container) {
    navbar_links_c.innerHTML += `<div class="order-container"><h1>Rendelésed</h1><div class="order-list"></div></div>` // ha nem létezik, hozzáadja az elemet a domba.
    __REFRESH__ORDERS__() // frissíti a DOMot.
  } else {
    order_container.remove() // ha találja, akkor kitörli szimplán.
  }
}

const __REFRESH__ORDERS__ = () => {
  const order_container = document.querySelector(".order-container")
  if (!order_container) return // ha nincs order-container akkor lépjen ki, ne folytassa, hibázzon.

  const order_list = document.querySelector(".order-list")

  if (Object.keys(orders).length === 0) { // átalakítja az objectet, csak a keyekre, így meglehet nézni, az array hosszúságát.
    order_list.innerHTML = `Nincs semmi a kosaradban!`
  } else {
    order_list.innerHTML = Object.entries(orders) // átalakítja az objectet egy arrayra: ["key", "value"]
    .map( // átformázza az arrayben lévő adatokat, és a megadott forma szerint visszaadja.
      (order) => `<button data-type="${order[1].type}" onclick="DELETE_ORDER(this)">* ${order[1].title} (${order[1].price}Ft)</button>`
    )
    .join("") // html bug fix, mert a ,-ők látszódtak
  }

}

const DELETE_ORDER = (e) => {
  // ?. => lehet hogy nem létezik, az adott index, ezért nem fog kierrorozni!
  if (!e.dataset?.type) return // ha nincs type megadva a dom elementen, akkor abbahagyjuk a futtatást.

  ORDERS.set_order(e.dataset?.type) // hívja a global functiont! - 21-34
}
