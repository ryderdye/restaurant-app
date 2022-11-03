import {menuArray} from '/data.js'

//I understand that this could probably be done in a more concise(DRY) way but every time I 
//tried to make things simpler I would end up breaking the site and this would get very confusing
//It took me forever to finish becuase I would get stuck often but I'm happy with how it turned
//out I hope you like it! Thank you so much for your feedback!



let orderArray = []

let yourOrderDisplay = document.getElementById('your-order-display')
let completeOrderModal = document.getElementById('complete-order-modal')
let processingOrder = document.getElementById('processing-order')


document.addEventListener('click', function(e){
    // clicking the add button displays the order array and also removes the final message that is //displayed "thank you for your order", so in a way, clicking the add button starts and also //resets the whole thing
    if(e.target.dataset.add){
    yourOrderDisplay.style.display = 'block'     
    addItem(e.target.dataset.add)
    processingOrder.style.display = 'none'
    document.getElementById('form').reset()
    }
    // clicking the complete button makes the order disappear, runs/diplays the modal() and changes //the background color a bit while the modal is on display //
    else if (e.target.dataset.complete){
    yourOrderDisplay.style.display = 'none'
    completeOrderModal.style.display = 'block'
    document.body.style.backgroundColor = '#f0e3dd'
    modal()
    }
    else if(e.target.dataset.remove){
    removeItem(e.target.dataset.remove)
    }
    //clicking the pay button makes the modal disappear, changes the background color back to its //original color, grabs the name input, displays the final messages & clears the order array
    else if(e.target.dataset.pay){
    completeOrderModal.style.display = 'none'
    document.body.style.backgroundColor = 'white'
    processingOrder.style.display = 'block'
    
    e.preventDefault()
    
    let customerName = document.getElementById('customer-name')
    
    setTimeout(function(){
        processingOrder.innerHTML = `<p>Thanks ${customerName.value}! Your order is on it's way!</p>`
    }, 1500)
    
    orderArray = []
    }
})



function getMenuHTML(){
    
    let menuHTML = ``
    
    menuArray.forEach(function(menuItem){
        menuHTML += `
                <div class="menu-inner">
                    <h1 class="food-icon">${menuItem.emoji}</h1>
                    <div class="food-text">
                        <p class="food-name">${menuItem.name}</p>
                        <p class="food-ingredients">${menuItem.ingredients}</p>
                        <p class="food-price">$${menuItem.price}</p>
                    </div>
                    <button class="add-btn" data-add="${menuItem.id}">+</button>
                </div>`
    })
    return menuHTML    
}

function renderMenu(){
    document.getElementById('render-menu').innerHTML = getMenuHTML()
}
renderMenu()






function addItem(menuItemId){
    
    const menuItemObj = menuArray.filter(function(menuItem){
        return menuItem.id === menuItemId
    })[0]
 
    orderArray.push(menuItemObj)
    
    getOrderHTML()
    renderOrder()
    getTotalHTML()
    renderTotal()
}
    
function getOrderHTML(){
    
    let orderHTML = ``
         
        orderArray.forEach(function(item, index){
            orderHTML += `
                <div class="order-items-inner">
                    <p class="order-food-name">${item.name}</p>
                    <button class="remove-btn" data-remove="${index}">remove</button>
                    <p class="order-food-price">$${item.price}</p> 
                </div>`
        })
        return orderHTML
    }
    
function renderOrder(){
    document.getElementById('render-order').innerHTML = getOrderHTML()    
}



function getTotalHTML(){
    
    let price = 0
    orderArray.forEach(function(item){
        price += item.price
    })
    return price
    console.log(price)
}

function renderTotal(){
        document.getElementById('total-price').innerHTML = "$" + getTotalHTML()
}




function removeItem(itemIndex){
    
    orderArray.splice(itemIndex, 1)
    
    getOrderHTML()
    renderOrder()
    getTotalHTML()
    renderTotal()
    
    if (orderArray.length === 0){
        yourOrderDisplay.style.display = 'none'
    }
}
    
    
    
function modal(){
    
    let processingPayment = document.getElementById('processing-payment')
    
    processingPayment.innerHTML = `processing your payment of $` + getTotalHTML()
    
}
    
