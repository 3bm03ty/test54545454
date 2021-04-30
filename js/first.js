var productNameInput = document.getElementById("productNameInput"); //Input klo
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");

var addBtn = document.getElementById("addbtn");

var searchInput = document.getElementById("searchInput")

var tableBody = document.getElementById("tableBody");
var mainIndex = 0


if (localStorage.getItem("productsList") != null) {
  var productsList = JSON.parse(localStorage.getItem("productsList"))
  displayProducts(productsList);
} else {
  var productsList = []
}


addBtn.addEventListener("click", function () {
  if (validatData() == true) {

    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescInput.value
    }


    if (addBtn.innerHTML == "Add product") {
      productsList.push(product)
    } else {
      productsList.splice(mainIndex,1,product)
      addBtn.innerHTML = "Add product"
    }

    clearData()
    displayProducts(productsList)
    localStorage.setItem("productsList", JSON.stringify(productsList))

  } else {
    alert("00")
  }
})


function displayProducts(anyArray) {
  var trs = "";
  for (var i = 0; i < anyArray.length; i++) {
    trs += `<tr>
            <td>${i}</td>
            <td>${anyArray[i].name}</td>
            <td>${anyArray[i].price}</td>
            <td>${anyArray[i].category}</td>
            <td>${anyArray[i].desc}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
          </tr>`
  }
  tableBody.innerHTML = trs
}

function validatData() {
  if (productNameInput.value != "" && productPriceInput.value != "" && productCategoryInput.value != "" && productDescInput.value != "") {
    return true;
  }
}


function deleteProduct(index) {
  productsList.splice(index, 1)


  displayProducts()
  localStorage.setItem("productsList", JSON.stringify(productsList))
}

function updateProduct(index) {
  productNameInput.value = productsList[index].name;
  productPriceInput.value = productsList[index].price;
  productCategoryInput.value = productsList[index].category;
  productDescInput.value = productsList[index].desc;

  addBtn.innerHTML = "Update product"

  mainIndex = index;
}


function clearData(){
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}


searchInput.addEventListener("keyup",function(){
  var wantedArray = []
  for(var i = 0 ; i < productsList.length ; i++){
    if(productsList[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
      wantedArray.push(productsList[i])
    }
  }

  displayProducts(wantedArray)
})
