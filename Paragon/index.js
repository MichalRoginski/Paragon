let itemCollection = [];
let editing = false;
let nameCorrect = true;
let countCorrect = true;
let priceCorrect = true;
let validationCorrect = true;
if (localStorage.getItem("collection").length > 2) {
    itemCollection = JSON.parse(localStorage.getItem("collection"));
}

class Item {
    constructor(id, name, count, price) {
        this.id = id;
        this.name = name;
        this.ccount = count;
        this.price = price;
        this.sum = count * price;
        this.sum = (+this.sum).toFixed(2);
    }
}
function disableButtons(except) {
    let buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
    editing = true;
    if (except != "nothing")
        document.getElementById(except).disabled = false;
}
function enableButtons() {
    let buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
    editing = false;
}
function addClick() {

    let listElements = document.getElementsByClassName("row");
    let id = (listElements.length + 1);
    if (listElements.length === 0) {
        listElements = document.getElementsByClassName("startingRow");
    }
    let newRow = document.createElement("tr");
    newRow.className = "row";
    newRow.id = "inputrow" + id;
    newRow.innerHTML = "<td class='index'>" + id + "</td>" +
        "<td><input type='text' placeholder='nazwa' id='inputName'></td>" +
        "<td><input type='text' placeholder='ilość' id='inputCount'></td>" +
        "<td><input type='text' placeholder='cena' id='inputPrice'></td>" +
        "<td>-.-- zł</td>";
    listElements[listElements.length - 1].after(newRow);
    document.getElementById("addButton").onclick = confirmClick;
    document.getElementById("addButton").innerText = "Zatwierdź";
    disableButtons("addButton");
    document.addEventListener("keyup", function confirmWithEnter(event) {
        if (event.code == "Enter") {
            document.removeEventListener("keyup", confirmWithEnter);
            confirmClick();
        }
    });
}

function confirmClick() {
    let id = document.getElementsByClassName("row").length;
    let name = document.getElementById("inputName").value;
    let count = document.getElementById("inputCount").value;
    let price = document.getElementById("inputPrice").value;
    if (name.length === 0)
        nameCorrect = false;
    if (isNaN(count) || count.length === 0)
        countCorrect = false;
    if (isNaN(price) || price.length === 0)
        priceCorrect = false;
    if (nameCorrect === false) {
        nameCorrect = true;
        validationCorrect = false;
        document.getElementById("inputName").style.border = "red solid";
    } else document.getElementById("inputName").style.border = null;
    if (countCorrect === false) {
        countCorrect = true;
        validationCorrect = false;
        document.getElementById("inputCount").style.border = "red solid";
    } else document.getElementById("inputCount").style.border = null;
    if (priceCorrect === false) {
        priceCorrect = true;
        validationCorrect = false
        document.getElementById("inputPrice").style.border = "red solid";
    } else document.getElementById("inputPrice").style.border = null;
    if (validationCorrect === false) {
        validationCorrect = true;
        document.addEventListener("keyup", function confirmWithEnter(event) {
            if (event.code == "Enter") {
                document.removeEventListener("keyup", confirmWithEnter);
                confirmClick();
            }
        });
        return;
    }

    price = (+price).toFixed(2);
    count = (+count).toFixed(2);
    if (name.length === 0)
        name = "placeholder";
    let newRow = new Item(id, name, count, price);
    itemCollection.push(newRow);
    localStorage.setItem("collection", JSON.stringify(itemCollection));
    refresh();
    document.getElementById("addButton").onclick = addClick;
    document.getElementById("addButton").innerText = "Dodaj";
    console.log("test");
    enableButtons();
    console.log("test2");
}

function refresh() {
    let listElements = document.getElementsByClassName("row");
    while (listElements.length > 0) {
        listElements[0].remove();
    }
    let oldRow = document.getElementById("startingRow");
    let allSum = 0;
    for (let i = 0; i < itemCollection.length; i++) {
        allSum += (+itemCollection[i].sum);
        let newRow = document.createElement("tr");
        newRow.addEventListener("dblclick", function editStart() {
            if (editing === true)
                return;
            editing = true;
            disableButtons("nothing");
            this.removeEventListener("dblclick", editStart);
            this.innerHTML = "<td class='index'>" + itemCollection[i].id + "</td>" +
                "<td><input type='text' value='" + itemCollection[i].name + "' id=inputName" + itemCollection[i].id + "></td>" +
                "<td><input type='text' value=" + itemCollection[i].ccount + " id=inputCount" + itemCollection[i].id + "></td>" +
                "<td><input type='text' value=" + itemCollection[i].price + " id=inputPrice" + itemCollection[i].id + "></td>" +
                "<td>-.-- zł</td>";
            this.addEventListener("keyup", function editEnd(event) {
                if (event.code == "Enter") {
                    tempname = document.getElementById("inputName" + itemCollection[i].id).value;
                    tempcount = document.getElementById("inputCount" + itemCollection[i].id).value;
                    tempprice = document.getElementById("inputPrice" + itemCollection[i].id).value;
                    if (tempname.length === 0)
                        nameCorrect = false;
                    if (isNaN(tempcount) || tempcount.length === 0)
                        countCorrect = false;
                    if (isNaN(tempprice) || tempprice.length === 0)
                        priceCorrect = false;
                    if (nameCorrect === false) {
                        nameCorrect = true;
                        validationCorrect = false;
                        document.getElementById("inputName" + itemCollection[i].id).style.border = "red solid";
                    } else document.getElementById("inputName" + itemCollection[i].id).style.border = null;

                    if (countCorrect === false) {
                        countCorrect = true;
                        validationCorrect = false;
                        document.getElementById("inputCount" + itemCollection[i].id).style.border = "red solid";
                    } else document.getElementById("inputCount" + itemCollection[i].id).style.border = null;

                    if (priceCorrect === false) {
                        priceCorrect = true;
                        validationCorrect = false
                        document.getElementById("inputPrice" + itemCollection[i].id).style.border = "red solid";
                    } else document.getElementById("inputPrice" + itemCollection[i].id).style.border = null;

                    if (validationCorrect === false) {
                        validationCorrect = true;
                        return;
                    }


                    itemCollection[i].sum = (tempprice * tempcount);
                    itemCollection[i].price = (+tempprice).toFixed(2);
                    itemCollection[i].ccount = (+tempcount).toFixed(2);
                    itemCollection[i].sum = (+itemCollection[i].sum).toFixed(2);
                    localStorage.setItem("collection", JSON.stringify(itemCollection));
                    this.removeEventListener("keyup", editEnd);
                    refresh();
                    editing = false;
                    enableButtons();
                }
            })
        })
        newRow.className = "row";
        newRow.id = "datarow" + itemCollection[i].id;
        newRow.innerHTML = "<td class='index'>" + itemCollection[i].id + "</td>" +
            "<td>" + itemCollection[i].name + "</td>" +
            "<td>" + itemCollection[i].ccount + "</td>" +
            "<td>" + itemCollection[i].price + " zł</td>" +
            "<td>" + itemCollection[i].sum + " zł</td>";
        oldRow.after(newRow);
        oldRow = newRow;
    }
    allSum = (+allSum).toFixed(2);
    document.getElementById("allSum").innerText = allSum + " zł";
}

function resetLocalstorage() {
    localStorage.setItem("collection", JSON.stringify(""));
    itemCollection = [];
    refresh();
}

function removeClick() {
    let listElements = document.getElementsByClassName("index");
    for (let i = 0; i < listElements.length; i++) {
        listElements[i].innerHTML = "<input type='checkbox' id=checkbox" + (i + 1) + ">";
    }
    document.getElementById("removeButton").onclick = confirmRemove;
    document.getElementById("removeButton").innerText = "Zatwierdź";
    disableButtons("removeButton");
}
function confirmRemove() {
    let listElements = document.getElementsByClassName("index");
    for (let i = 0; i < listElements.length; i++) {
        let checkbox = document.getElementById("checkbox" + (i + 1));
        if (checkbox.checked) {
            let removeAt = itemCollection.findIndex(item => item.id === (i + 1));
            itemCollection.splice(removeAt, 1);
        }
    }
    localStorage.setItem("collection", JSON.stringify(itemCollection));
    recount();
    refresh();
    document.getElementById("removeButton").onclick = removeClick;
    document.getElementById("removeButton").innerText = "Usuń";
    enableButtons();
}
function recount() {
    for (let i = 0; i < itemCollection.length; i++) {
        itemCollection[i].id = i + 1;
    }
    localStorage.setItem("collection", JSON.stringify(itemCollection));
}

function moveClick() {
    disableButtons("moveButton");
    let listElements = document.getElementsByClassName("index");
    for (let i = 0; i < listElements.length; i++) {
        if (i == 0) {
            listElements[i].innerHTML = "<button id=" + i + " onclick=" + "moveButtonDown(this.id)" + ">▼</button>"
        } else if (i == listElements.length - 1) {
            listElements[i].innerHTML = "<button id=" + i + " onclick=" + "moveButtonUp(this.id)" + ">▲</button>"
        } else {
            listElements[i].innerHTML = "<button id=" + i + " onclick=" + "moveButtonUp(this.id)" + ">▲</button><br><button id=" + i + " onclick=" + "moveButtonDown(this.id)" + ">▼</button>";
        }
    }
    document.getElementById("moveButton").onclick = confirmMoves;
    document.getElementById("moveButton").innerText = "Anuluj";

}
function moveButtonDown(id) {
    let id1 = ++id;
    id--;
    itemCollection.splice((id1), 0, itemCollection.splice(id, 1)[0]);
    localStorage.setItem("collection", JSON.stringify(itemCollection));
    recount();
    refresh();
    moveClick();
}
function moveButtonUp(id) {
    itemCollection.splice(id - 1, 0, itemCollection.splice(id, 1)[0]);
    localStorage.setItem("collection", JSON.stringify(itemCollection));
    recount();
    refresh();
    moveClick();
}

function confirmMoves() {
    refresh();
    document.getElementById("moveButton").onclick = moveClick;
    document.getElementById("moveButton").innerText = "Przesuń";
    enableButtons();
}
refresh();