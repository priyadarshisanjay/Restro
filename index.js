import menuArray from './data.js'
const aboveItemDiv = document.getElementById("above-item")
const yourOrder = document.getElementById("your-order")
let cartArray = []
const itemAdded = document.getElementById('items-added')
const priceEl = document.getElementById('price-el')
const tobeBlured = document.getElementById('to-be-blured')
const completeOrder = document.getElementById('complete-order')
const modalEl = document.getElementById('modal')
const payEl = document.getElementById('pay')
const thanksEl = document.getElementById("thanks")



menuArray.forEach(item => {
    
    const menuDescription = item.ingredients.reduce((accumulator, currentValue)=>{
        return accumulator + ' ' + currentValue
    }, '')
    
    renderItem(menuDescription,item)


})

function renderItem(menuDesc,item){
        
    aboveItemDiv.innerHTML += 
    `   
    <div class="items">
            <div class="menu-image"> ${item.emoji}</div>
            <div class="menu-details">
                <h3 class="menu-title">${item.name}</h3>
                <p class="menu-description">${menuDesc}</p>
                <h4 class="menu-price">${item.price}</h4>
            </div>
            <button id="add-btn" class="plus-btn" data-item-id= "${item.id}" >+</button>
        </div>
        <hr>
    `

    
    
    
}

aboveItemDiv.addEventListener("click", function(event){
    if(event.target.classList.contains('plus-btn')){
        const clickedId = parseInt(event.target.dataset.itemId)
        const clickedItem = menuArray.find(item => item.id === clickedId)
        cartArray.push(clickedItem)
        showOrderedItems()
    }
    
})

yourOrder.addEventListener("click" , function(event){
    if(event.target.tagName === 'P'){
        const itemId = parseInt(event.target.id)
        const itemIndex = cartArray.findIndex(item => item.id === itemId)
        if(itemIndex !== -1){
            cartArray.splice(itemIndex,1)
            showOrderedItems()
        }
    }
})

function showOrderedItems(){
    yourOrder.classList.remove('add-to-cart')
    
    itemAdded.innerHTML = ``
    
    cartArray.forEach(item =>{
        itemAdded.innerHTML += 
        `
        <div class="individual-item">
            <h2>${item.name}</h2>
            <p id="${item.id}">remove</p>
            <h4>$ ${item.price}</h4>
        </div>
        
        `
    })
    
    let price = 0;
    for(let i = 0 ; i< cartArray.length; i++){
        
        price += cartArray[i].price
        
        
    }
    priceEl.innerHTML = `$ ${price}`
    
}

completeOrder.addEventListener('click', function(){
    tobeBlured.style.filter = 'blur(5px)'
    modalEl.style.display = 'block'
})

payEl.addEventListener('click', function(){
    modalEl.style.display = 'none'
    tobeBlured.style.filter = 'none'
    yourOrder.style.display = 'none'
    thanksEl.style.display = 'block'
    cartArray = []
    console.log(cartArray)
    
})




