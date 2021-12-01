let itemCollection = [];
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
    }

    ChangeMe(id, name, count, price) {
        this.id = id;
        this.name = name;
        this.ccount = count;
        this.price = price;
        this.sum = count * price;
        localStorage.setItem("collection", JSON.stringify(itemCollection));
    }
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
        "<td>0.00 zł</td>";
    listElements[listElements.length - 1].after(newRow);
    document.getElementById("addButton").onclick = confirmClick;
    document.getElementById("addButton").innerText = "Zatwierdź";
}

function confirmClick() {
    console.log(itemCollection);
    let id = document.getElementsByClassName("row").length;
    let name = document.getElementById("inputName").value;
    let count = document.getElementById("inputCount").value;
    let price = document.getElementById("inputPrice").value;
    let newRow = new Item(id, name, count, price);
    itemCollection.push(newRow);
    localStorage.setItem("collection", JSON.stringify(itemCollection));
    refresh();
    document.getElementById("addButton").onclick = addClick;
    document.getElementById("addButton").innerText = "Dodaj";

}

function refresh() {
    let listElements = document.getElementsByClassName("row");
    while (listElements.length > 0) {
        listElements[0].remove();
    }
    let oldRow = document.getElementById("startingRow");
    let allSum = 0;
    for (let i = 0; i < itemCollection.length; i++) {
        allSum += itemCollection[i].sum;
        let newRow = document.createElement("tr");
        newRow.className = "row";
        newRow.id = "datarow" + itemCollection[i].id;
        newRow.innerHTML = "<td class='index'>" + itemCollection[i].id + "</td>" +
            "<td>" + itemCollection[i].name + "</td>" +
            "<td>" + itemCollection[i].ccount + "</td>" +
            "<td>" + itemCollection[i].price + "</td>" +
            "<td>" + itemCollection[i].sum + " zł</td>";
        oldRow.after(newRow);
        oldRow = newRow;
    }
    document.getElementById("allSum").innerText = allSum + " zł";
}

function resetLocalstorage() {
    localStorage.setItem("collection", JSON.stringify(""));
    itemCollection = [];
    refresh();
}

function removeClick() {
    let listElements = document.getElementsByClassName("index");
    for(let i=0;i<listElements.length;i++){
        listElements[i].innerHTML = "<input type='checkbox' id=checkbox"+(i+1)+">";
    }
    document.getElementById("removeButton").onclick = confirmRemove;
    document.getElementById("removeButton").innerText = "Zatwierdź";
}
function confirmRemove() {
    let listElements = document.getElementsByClassName("index");
    for(let i=0;i<listElements.length;i++){
        let checkbox = document.getElementById("checkbox"+(i+1));
        if(checkbox.checked){
            let removeAt = itemCollection.findIndex(item => item.id===(i+1));
            itemCollection.splice(removeAt,1);
        }
    }
    localStorage.setItem("collection", JSON.stringify(itemCollection));
    recount();
    refresh();
    document.getElementById("removeButton").onclick = removeClick;
    document.getElementById("removeButton").innerText = "Usuń";
}
function recount() {
    for(let i=0;i<itemCollection.length;i++){
        itemCollection[i].id=i+1;
    }
    localStorage.setItem("collection", JSON.stringify(itemCollection));
}
function editRow() {

}