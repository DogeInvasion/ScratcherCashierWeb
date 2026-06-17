/* ========================================
   SCRATCHER TERMINAL vFINAL
======================================== */


/* ========================================
   SOUND SYSTEM
======================================== */

function playSound(id){

    let sound = document.getElementById(id);

    if(sound){

        sound.currentTime = 0;

        sound.play().catch(() => {});

    }

}


/* ========================================
   BOOT SEQUENCE
======================================== */

playSound("bootSound");

let bootProgress = 0;

let bootInterval = setInterval(function(){

    bootProgress += 5;

    document.getElementById("bootBar").style.width =
        bootProgress + "%";

    if(bootProgress >= 100){

        clearInterval(bootInterval);

        document.getElementById("bootScreen").style.display =
            "none";

        document.getElementById("app").style.display =
            "block";

    }

},120);


/* ========================================
   CLOCK SYSTEM
======================================== */

function updateClock(){

    let now = new Date();

    let time = now.toLocaleTimeString();

    document.getElementById("clock").innerText =
        time;

}

setInterval(updateClock,1000);

updateClock();


/* ========================================
   ORDER DATA
======================================== */

let total = 0;

let receipt = [];


/* ========================================
   TERMINAL POPUP MESSAGE
======================================== */

function terminalMessage(text){

    let popup = document.getElementById("popup");

    popup.style.display = "flex";

    document.getElementById("popupText").innerText =
        text;

    setTimeout(function(){

        popup.style.display = "none";

    },700);

}


/* ========================================
   UPDATE RECEIPT
======================================== */

function updateReceipt(){

    document.getElementById("receipt").innerText =
        receipt.join("\n");

    document.getElementById("total").innerText =
        "TOTAL: $" + total;

}


/* ========================================
   ADD ORDER
======================================== */

function addOrder(){

    playSound("clickSound");

    terminalMessage("ADDING ORDER...");

    let pizza =
        document.getElementById("pizza");

    let combo =
        document.getElementById("combo");

    let extra =
        document.getElementById("extra");

    let pizzaQty =
        parseInt(
            document.getElementById("pizzaQty").value
        );

    let comboQty =
        parseInt(
            document.getElementById("comboQty").value
        );

    let extraQty =
        parseInt(
            document.getElementById("extraQty").value
        );

    let added = false;


    /* Pizza */

    if(Number(pizza.value) > 0){

        let cost =
            Number(pizza.value) * pizzaQty;

        receipt.push(
            pizza.options[pizza.selectedIndex].text +
            " x" +
            pizzaQty +
            " = $" +
            cost
        );

        total += cost;

        added = true;
    }


    /* Combo */

    if(Number(combo.value) > 0){

        let cost =
            Number(combo.value) * comboQty;

        receipt.push(
            combo.options[combo.selectedIndex].text +
            " x" +
            comboQty +
            " = $" +
            cost
        );

        total += cost;

        added = true;
    }


    /* Extra */

    if(Number(extra.value) > 0){

        let cost =
            Number(extra.value) * extraQty;

        receipt.push(
            extra.options[extra.selectedIndex].text +
            " x" +
            extraQty +
            " = $" +
            cost
        );

        total += cost;

        added = true;
    }


    /* Error */

    if(!added){

        playSound("errorSound");

        terminalMessage(
            "ERROR 22\nNO FOOD SELECTED"
        );

        return;
    }

    updateReceipt();

}


/* ========================================
   CLEAR ORDER
======================================== */

function clearOrder(){

    playSound("clickSound");

    terminalMessage("CLEARING TERMINAL...");

    receipt = [];

    total = 0;

    document.getElementById("receipt").innerText =
        "Awaiting order...";

    document.getElementById("total").innerText =
        "TOTAL: $0";

    document.getElementById("orderNumber").innerText =
        "ORDER #----";

}


/* ========================================
   BUY ORDER
======================================== */

function buy(){

    if(total === 0){

        playSound("errorSound");

        terminalMessage(
            "NO ORDER SELECTED"
        );

        return;
    }


    let payment =
        document.getElementById("payment").value;


    /* Payment sound */

    if(payment === "Cash"){

        playSound("cashSound");

    }else{

        playSound("cardSound");

    }


    let popup =
        document.getElementById("popup");

    popup.style.display = "flex";


    /* Step 1 */

    document.getElementById("popupText").innerText =
        "CONNECTING TO KITCHEN...";


    /* Step 2 */

    setTimeout(function(){

        playSound("printerSound");

        document.getElementById("popupText").innerText =
            "PRINTING RECEIPT...\n|||||||||||||||||";

    },2000);


    /* Step 3 */

    setTimeout(function(){

        let number =
            Math.floor(
                Math.random() * 9000
            ) + 1000;

        document.getElementById("orderNumber").innerText =
            "ORDER #" + number;

        document.getElementById("popupText").innerText =
            "ORDER COMPLETE\n\nPAYMENT ACCEPTED\n\nKITCHEN RECEIVED ORDER";

    },4000);


    /* Step 4 */

    setTimeout(function(){

        popup.style.display =
            "none";

        document.getElementById("inventory").innerHTML =

            "DOUGH: " +
            (Math.floor(Math.random()*20)+5) +

            "<br>WINGS: " +

            (Math.floor(Math.random()*50)+10) +

            "<br>ROLLS: " +

            (Math.floor(Math.random()*30)+5);


        clearOrder();

    },7000);

}


/* ========================================
   HOTKEY SYSTEM
======================================== */

document.addEventListener(
    "keydown",
    function(event){

        let tag =
            document.activeElement.tagName;

        /* Don't trigger while typing */

        if(tag === "INPUT"){

            return;

        }

        let key =
            event.key.toLowerCase();


        /* A = ADD ORDER */

        if(key === "a"){

            playSound("clickSound");

            addOrder();

        }


        /* B = BUY ORDER */

        if(key === "b"){

            buy();

        }


        /* C = CLEAR */

        if(key === "c"){

            playSound("clickSound");

            clearOrder();

        }

    }
);
