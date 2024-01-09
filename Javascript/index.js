const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d")

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0 , canvas.width, canvas.height)

//this takes the full size of the canvas meaning we can't actually add normal css into our canvas tag we need to use the fillrect api to draw objects then we can now give that object a style, so what we did now was to differenciate our browser from the canvas 

const gravitation = 0.7

const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc:"/Assets/background.png"

})

const shop = new Sprite({
    position:{
        x:610,
        y:127
    },
    imageSrc:"/Assets/shop.png",
    scale: 2.75,
    frameMax: 6
})

const player  = new Fighter({
    position:{
    x:70,
    y:0
},
velocity:{
x:0,
y:0
},
color: "red",
offset:{
    x:0,
    y:0
},
imageSrc:"/Assets/Medieval Warrior Pack/Idle.png",
scale:2,
frameMax:8,
offset:{
    x:215,
    y:100,
},
sprites:{
    idle:{
        imageSrc: "/Assets/Medieval Warrior Pack/Idle.png",
        frameMax :6
    },
    run:{
        imageSrc: "/Assets/Medieval Warrior Pack/Run.png",
        frameMax :8
    },
    jump:{
        imageSrc: "/Assets/Medieval Warrior Pack/Jump.png",
        frameMax : 2
    },
    fall:{
        imageSrc: "/Assets/Medieval Warrior Pack/Fall.png",
        frameMax : 2
    },
    attack1:{
        imageSrc: "/Assets/Medieval Warrior Pack/Attack1.png",
        frameMax : 4
    },
    takeHit:{
    imageSrc : "/Assets/Medieval Warrior Pack/Hit.png",
    frameMax : 3
    },

    death:{
        imageSrc : "/Assets/Medieval Warrior Pack/Death.png",
        frameMax : 9
    }

},

attackbox:{
    offset:{
        x:100,
        y:30,
    },
    width : 155,
    height: 50
}

})



const enemy = new Fighter({
    position:{
    x:950,
    y:100
},
velocity:{
    x:0,
    y:0
},
color : "blue",
offset:{
    x:-50,
    y:0
},

imageSrc:"/Assets/Sprite/Idle.png",
scale:2.5,
frameMax:4,
offset:{
    x:215,
    y:170,
},
sprites:{
    idle:{
        imageSrc: "/Assets/kenji/Idle.png",
        frameMax :4
    },
    run:{
        imageSrc: "/Assets/kenji/Run.png",
        frameMax :8
    },
    jump:{
        imageSrc: "/Assets/kenji/Jump.png",
        frameMax : 2
    },
    fall:{
        imageSrc: "/Assets/kenji/Fall.png",
        frameMax : 2
    },
    attack1:{
        imageSrc: "/Assets/kenji/Attack1.png",
        frameMax : 4
    },
    takeHit:{
        imageSrc : "/Assets/kenji/Take hit.png",
        frameMax : 3
    },

    death:{
        imageSrc : "/Assets/kenji/Death.png",
        frameMax : 7
    }

},

attackbox:{
    offset:{
        x:-170,
        y:40,     
    },
    width : 155,
    height: 50
}

})
 
const keys = {
    d: {
        pressed : false
   },
    a: {
       pressed : false
   },
   w: {
    pressed : false
   },

   ArrowRight: {
    pressed : false
   },

   ArrowLeft:{
    pressed : false
   },

   ArrowUp:{
    pressed : false
   }



}

let lastkey;

function rectangularcollision ({rectangle1, rectangle2}){
    return (
        rectangle1.attackbox.position.x + rectangle1.attackbox.width >= rectangle2.position.x && 
        rectangle1.attackbox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.attackbox.position.y + rectangle1.attackbox.height >=rectangle2.position.y &&
        rectangle1.attackbox.position.y <= rectangle2.position.y + rectangle2.height 
    )
}

function determineWinner({player,enemy,timerId}){
    clearTimeout(timerId)
    if(player.health === enemy.health){
        console.log("tie")
       tie.innerHTML = "Tie"
    } 
    else if (player.health > enemy.health){
        tie.innerHTML = "Player 1 Wins "
    }

    else if (enemy.health > player.health){
        tie.innerHTML = "Player 2 Wins"
    }
}

let tie = document.querySelector("#tie")
let timer = 60
function decreaseTimer() {
    timerId = setTimeout(decreaseTimer, 1000)
    if(timer > 0 ) {
        timer--
        document.querySelector('#timer').innerHTML = timer
    }


    if(timer === 0){
        determineWinner({player,enemy,timerId})
}
}
 
decreaseTimer() 

function animate (){
    window.requestAnimationFrame(animate)
     
    context.fillStyle = "black"
    context.fillRect(0,0, canvas.width, canvas.height)
    background.gravity()
    shop.gravity()
   player.gravity()
   enemy.gravity()
  
    player.velocity.x = 0
    enemy.velocity.x = 0

// player movements

if(keys.d.pressed && player.lastkey === "d" ){
    player.velocity.x = 5
    player.switchSprite("run")  
}
else if(keys.a.pressed && player.lastkey === "a" ){
    player.velocity.x = -5
    player.switchSprite("run")
}
else{
    player.switchSprite("idle")
}
if(player.velocity.y < 0){
    player.switchSprite("jump")
}
else if(player.velocity.y > 0){
    player.switchSprite("fall")
}
//enemy movements

if(keys.ArrowRight.pressed && enemy.lastkey === "ArrowRight" ){
    enemy.velocity.x = 5
    enemy.switchSprite("run")  
}
else if(keys.ArrowLeft.pressed && enemy.lastkey === "ArrowLeft" ){
    enemy.velocity.x = -5
    enemy.switchSprite("run")
}
else{
    enemy.switchSprite("idle")
}

if(enemy.velocity.y < 0){
    enemy.switchSprite("jump")
}
else if(enemy.velocity.y > 0){
    enemy.switchSprite("fall")
}


if( rectangularcollision({
    rectangle1: player,
    rectangle2: enemy
})&&
     player.isAttacking && player.frameCurrent=== 1){
     
    enemy.takeHit()    
    player.isAttacking = false
    
    document.querySelector("#enemyHealth").style.width = enemy.health + "%"
    gsap.to("#enemyHealth",{
       width: enemy.health + "%" 
    })
}

if(player.isAttacking && player.frameCurrent === 4 ){
    player.isAttacking = false   
}

if( rectangularcollision({
    rectangle1: enemy,
    rectangle2: player
})&&
     enemy.isAttacking ){

    player.takeHit()
    enemy.isAttacking = false
    
    document.querySelector("#playerHealth").style.width = player.health + "%"
    gsap.to("#playerHealth",{
        width:player.health + "%"
    })
}

if (enemy.health <= 0 || player.health <= 0 )
determineWinner({player,enemy,timerId})
}

animate()

window.addEventListener("keydown",(event)=>{

 if(!player.dead){

switch (event.key) {
    case "d":
       keys.d.pressed = true
       player.lastkey = "d"
        break;

    case "a":
        keys.a.pressed = true
        player.lastkey = "a"
         break; 
         
     case "w":
       player.velocity.y = -20
        break;

    case " ":
         player.attack()
         break ; 
} 
 }
//enemy keyDown

if( !enemy.dead){
    switch(event.key){
     case "ArrowRight":
         keys.ArrowRight.pressed = true
         enemy.lastkey = "ArrowRight"
        break;

    case "ArrowLeft":
        keys.ArrowLeft.pressed = true
        enemy.lastkey = "ArrowLeft"
         break; 
         
     case "ArrowUp":
       enemy.velocity.y = -20
        break;

        case "ArrowDown":
         enemy.attack()
         break   

}}
})



window.addEventListener("keyup",(event)=>{


    switch (event.key) {
        case "d":
            keys.d.pressed = false
            break;

         case "a":
            keys.a.pressed = false
            break;
//enemy keyUp
         case "ArrowRight":
            keys.ArrowRight.pressed = false
            break;
       
          case "ArrowLeft":
            keys.ArrowLeft.pressed = false
                break;         
            
       
    }
    })