class Sprite {
    constructor({position, imageSrc, scale = 1, frameMax = 1,
         offset = {x:0,y:0 }}){
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.frameMax = frameMax
        this.frameCurrent = 0
        this.frameElapsed = 0 
        this.frameHold = 5
        this.offset = offset

    }
    
        drawCreatePlayer(){
            context.drawImage(this.image,
                this.frameCurrent * (this.image.width / this.frameMax),
                0,
                this.image.width/ this.frameMax,
                this.image.height,
                this.position.x - this.offset.x,
                 this.position.y - this.offset.y, 
                (this.image.width/this.frameMax) * this.scale,
                 this.image.height * this.scale)
        }

        animateframes(){
            this.frameElapsed++
            if (this.frameElapsed % this.frameHold === 0  ){
            if(this.frameCurrent < this.frameMax - 1){
                this.frameCurrent++
            }
            else{
                this.frameCurrent = 0 
            }
        }
        }

        gravity(){
            this.drawCreatePlayer()
            this.animateframes()
            
        }

    }


//Fighter

class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        color,
        imageSrc,
        scale = 1, 
        frameMax = 1,
        offset  = {x:0,y:0 },
        sprites,
        attackbox = { 
            offset: {}, 
            width : undefined, 
            height : undefined
        }
        }){

        super({
            position,
            imageSrc,
            scale,
            frameMax,
            offset
        })
        
         
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastkey;
        this.attackbox = {
            position : {
                x:this.position.x ,
                y:this.position.y
            },  
            offset : attackbox.offset,
            width: attackbox.width,
            height : attackbox.height,
           
           
        }
       
        this.color = color
        this.isAttacking 
        this.health = 100
        this.frameCurrent = 0
        this.frameElapsed = 0 
        this.frameHold = 5
        this.sprites = sprites
        this.dead = false

        for (const sprite in this.sprites){
            sprites[sprite].image = new Image()
           sprites[sprite].image.src = sprites[sprite].imageSrc
        }
        
        
    }

   

   
    gravity(){
        
        this.drawCreatePlayer()
        if(!this.dead) this.animateframes()
        this.attackbox.position.x = this.position.x + this.attackbox.offset.x 
        this.attackbox.position.y = this.position.y + this.attackbox.offset.y

        //draw attackbox
        // context.fillRect(this.attackbox.position.x ,this.attackbox.position.y , this.attackbox.width, this.attackbox.height)

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 96){
            this.velocity.y = 0
           this.position.y = 330
        }
        
        else{
            this.velocity.y += gravitation
        }

    }
    

    attack(){
        this.switchSprite("attack1")
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100);
       
    }

    takeHit(){
       
        this.health -= 10

        if(this.health <= 0 ){
            this.switchSprite("death")
        }
        else
            this.switchSprite("takeHit")
        
    }

    switchSprite(sprite){
        if(this.image === this.sprites.death.image) {
            if(this.frameCurrent === this.sprites.death.frameMax - 1){
                this.dead = true
            }
            return

        } 
        
        if(this.image === this.sprites.attack1.image &&
           this.frameCurrent < this.sprites.attack1.frameMax  -1) return
        
           if(this.image === this.sprites.takeHit.image &&
            this.frameCurrent < this.sprites.takeHit.frameMax  -1) return

        switch(sprite){
            case "idle":
                if(this.image !== this.sprites.idle.image){
                this.image = this.sprites.idle.image
                this.frameMax = this.sprites.idle.frameMax
                this.frameCurrent = 0
            }
                break;
             case "run":
                if(this.image !== this.sprites.run.image){
                this.image = this.sprites.run.image
                this.frameMax = this.sprites.run.frameMax
                this.frameCurrent = 0
            }
                break;
             case "jump":
               if(this.image !== this.sprites.jump.image){
                 this.image = this.sprites.jump.image
                 this.frameMax = this.sprites.jump.frameMax
                 this.frameCurrent = 0
                }
                 break;   

                 case "fall":
                    if(this.image !== this.sprites.fall.image){
                      this.image = this.sprites.fall.image
                      this.frameMax = this.sprites.fall.frameMax
                      this.frameCurrent = 0
                     }
                      break; 

                      case "attack1":
                        if(this.image !== this.sprites.attack1.image){
                          this.image = this.sprites.attack1.image
                          this.frameMax = this.sprites.attack1.frameMax
                          this.frameCurrent = 0
                         }
                          break;     
                     case "takeHit":
                    if(this.image !== this.sprites.takeHit.image){
                     this.image = this.sprites.takeHit.image
                     this.frameMax = this.sprites.takeHit.frameMax
                     this.frameCurrent = 0
                      }
                     break;   

                     case "death":
                        if(this.image !== this.sprites.death.image){
                         this.image = this.sprites.death.image
                         this.frameMax = this.sprites.death.frameMax
                         this.frameCurrent = 0
                          }
                         break;   
        } 
    }

   
}



