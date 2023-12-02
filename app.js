let order = document.querySelector(".order")
let btn = document.querySelector(".btn")
let list = document.querySelector(".list")
let clear = document.querySelector("button")
let counter = document.querySelector(".count")
let alert = document.querySelector(".alert")
// let yes = document.querySelector(".yes")
// let no = document.querySelector(".no")
let items = []



list.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        removeFromlocal(e.target.parentElement.getAttribute("data-id"))
        e.target.parentElement.remove()// delete from the page
        count()
        alertNotification("remove a task", "remove")
    }
    if (e.target.classList.contains("item")) {
        statusDone(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done")// delete from the page
        done()
    }
})
// have the item back if you reload the page
if (localStorage.getItem("items")) {
    items = JSON.parse(localStorage.getItem("items")); 
}
getfromlocal()
btn.onclick = function (e) {
    e.preventDefault();
    if (order.value !== "") {
        alertNotification("add a task", "add")
        addOrder(order.value);
        count()
        order.value = "";
    } else {
        alertNotification("please add a task", "remove")
    }
};

function addOrder(text) {
    let item = {
        id: Date.now(),
        content: text,
        stats: false,
    }
    items.push(item)
    toPage(items)
    addtolocal(items)
}
function toPage(items) {
    list.innerHTML = "";
    items.forEach((i) => {
        let div = document.createElement("div")
        div.setAttribute("data-id",i.id)
        let p = document.createElement("p")
        div.className = "item"
        p.appendChild(document.createTextNode(i.content))
        let span = document.createElement("span")
        span.className = "del"
        span.appendChild(document.createTextNode("Delete"))
        div.appendChild(p)
        div.appendChild(span)
        list.appendChild(div)
    });
}
function addtolocal(i) {
    window.localStorage.setItem("items", JSON.stringify(i))
}
function getfromlocal() { // have the item back if you reload the page
    let data = window.localStorage.getItem("items")
    if (data) {
        let tasks = JSON.parse(data)
        toPage(tasks) // if you remove this the items will appear after you add new item after reloading only
    }
}
function removeFromlocal(itemId) {
    items = items.filter((i) => (i.id != itemId)); // this will make loop for all id and will turn the different onces
    addtolocal(items)
}
function statusDone(itemId) {
    for (i = 0; i < items.length; i++) {
        if (items[i].id == itemId) {
            items[i].stats == false ? (items[i].stats = true): (items[i].stats = false);
        }
        // if (e.target.classList.toggle("done")) {
        //     yes.innerHTML = ++i
        // }
    }
    addtolocal(items)
}

function alertNotification(text, action) {
    alert.textContent = text;
    alert.classList.add(`${action}`)

    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`${action}`)
    },1000) 
}
function count() {
    if (items.length > 0) {
        counter.innerHTML = items.length
        counter.classList.add("show")
    } else {
        counter.innerHTML = ""
        counter.classList.remove("show")
    }
}
clear.addEventListener("click", function () {
    if (items.length > 0) {
        localStorage.removeItem("items")
        list.innerHTML = "";
        items.length = 0;
        count()
        alertNotification("all tasks removed", "remove")
    }
})
// function done() {
//     for (i = 0; i < items.length; i++) {
//         if (items[i].stats === true) {
//             yes.innerHTML = `${+i}`
//         } else {
//             no.innerHTML = `${-i}`
//         }
//     }
// }