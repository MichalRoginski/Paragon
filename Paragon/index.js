let itemCollection = [];
let editing = false;
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
}
function disableButtons(except){
    let buttons = document.getElementsByClassName("button");
    for(let i=0;i<buttons.length;i++){
        buttons[i].disabled = true;
    }
    if(except != "nothing")
        document.getElementById(except).disabled = false;
}
function enableButtons(){
    let buttons = document.getElementsByClassName("button");
    for(let i=0;i<buttons.length;i++){
        buttons[i].disabled = false;
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
        "<td>-.-- zł</td>";
    listElements[listElements.length - 1].after(newRow);
    document.getElementById("addButton").onclick = confirmClick;
    document.getElementById("addButton").innerText = "Zatwierdź";
    disableButtons("addButton");
    document.addEventListener("keyup",function confirmWithEnter(event){
        if(event.code == "Enter"){
            document.removeEventListener("keyup",confirmWithEnter);
            confirmClick();
        }
    });
}

function confirmClick() {
    let id = document.getElementsByClassName("row").length;
    let name = document.getElementById("inputName").value;
    let count = document.getElementById("inputCount").value;
    let price = document.getElementById("inputPrice").value;
    if(isNaN(count))
        count=0;
    if(isNaN(price))
        price=0;
    let newRow = new Item(id, name, count, price);
    itemCollection.push(newRow);
    localStorage.setItem("collection", JSON.stringify(itemCollection));
    refresh();
    document.getElementById("addButton").onclick = addClick;
    document.getElementById("addButton").innerText = "Dodaj";

    enableButtons();
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
        newRow.addEventListener("dblclick", function editStart(){
            if(editing === true)
                return;
            editing = true;
            disableButtons("nothing");
            this.removeEventListener("dblclick",editStart);
            this.innerHTML =    "<td class='index'>" + itemCollection[i].id + "</td>" +
                                "<td><input type='text' value='" + itemCollection[i].name + "' id=inputName" + itemCollection[i].id + "></td>" +
                                "<td><input type='text' value=" + itemCollection[i].ccount + " id=inputCount" + itemCollection[i].id + "></td>" +
                                "<td><input type='text' value=" + itemCollection[i].price + " id=inputPrice" + itemCollection[i].id + "></td>" +
                                "<td>-.-- zł</td>";
            this.addEventListener("keyup", function editEnd(event){
                if(event.code=="Enter"){
                    itemCollection[i].name = document.getElementById("inputName"+itemCollection[i].id).value;
                    itemCollection[i].ccount = document.getElementById("inputCount"+itemCollection[i].id).value;
                    itemCollection[i].price = document.getElementById("inputPrice"+itemCollection[i].id).value;
                    if(isNaN(itemCollection[i].ccount))
                        itemCollection[i].ccount=0;
                    if(isNaN(itemCollection[i].price))
                        itemCollection[i].price=0;
                    itemCollection[i].sum = (itemCollection[i].price * itemCollection[i].ccount);

                    localStorage.setItem("collection", JSON.stringify(itemCollection));
                    this.removeEventListener("keyup",editEnd);
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
    disableButtons("removeButton");
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
    enableButtons();
}
function recount() {
    for(let i=0;i<itemCollection.length;i++){
        itemCollection[i].id=i+1;
    }
    localStorage.setItem("collection", JSON.stringify(itemCollection));
}
refresh();