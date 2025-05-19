class EmojiJoy{
    constructor(windowFrame,product,emojis){
        this.x=windowFrame.x
        this.y=windowFrame.y
        this.w=windowFrame.w
        this.h=windowFrame.h
        this.product=product
        this.emojis=emojis
        this.emojiList=Object.keys(emojis)
        // video.volume(0);
        // this.video=loadVideo
        this.xOff=0
        this.scl=this.w/video.width
        this.yOff=(this.h-video.height*this.scl)/2
        this.isPlaying=true
        this.flashes=[]
        this.numFlashes=25
        this.buf=createGraphics(this.w,this.h)
        this.ttStart=100
    }

    reset(product){
        this.product=product
        this.flashes=[]
    }

    display(productReady){
        push()
        translate(this.x, this.y)
        if(this.ttStart>0){
            this.ttStart--;
            fill(cols.accent2.r, cols.accent2.g, cols.accent2.b)
            // fill(255,0,255)
            noStroke()
            rect(0,0,this.w, this.h)
        } else {
            noStroke()
            fill(0)
            rect(0,0,this.w, this.h)
            if(productReady){
                // stroke(255,0,0)
                // line(0,0,this.w, this.h)
                // line(this.w,0,0, this.h)
                imageMode(CENTER)
                // displayFirstInQueueFrames(this.buf,0,0,this.w, this.h)
                displayFirstInQueueFrames(this.buf,this.w/2,this.h/2,this.w, this.h)
                image(this.buf.get(),this.w/2,this.h/2)
                // image(this.product,100,100)
                // image(this.emojis[this.emojiList[0]],200,200)
                push()
                for(let i=this.flashes.length-1; i>=0; i--){
                    if(this.flashes[i].run()){
                        this.flashes[i].show()
                    } else {
                        this.flashes.splice(i,1)
                    }
                }
                pop()
                if(this.flashes.length<this.numFlashes && random(10)<3){
                    let image=random(10)<5?
                        this.product:
                        this.emojis[random(this.emojiList)]
                    this.flashes.push(new ImageFlash(image,this.w/2,this.h/2,this.h*0.15))
                }
                // push()
                // scale(this.scl)
                // // image(img,this.xOff,this.yOff)
                // pop()
            } else {
                textAlign(CENTER)
                textSize(this.w*0.03)
                noStroke()
                let rel=sin(frameCount*0.2)*0.5+0.5
                fill(255*rel)
                textFont('courier')
                text("determining product recommendation...", this.w/2, this.h/2)
            }
        }
        
        pop()
        
        // console.log(this.flashes)
        
    }


}

class ImageFlash{
    constructor(image,cx,cy,r){
        let a=random(TWO_PI)
        this.x=cx+cos(a)*r
        this.xDrift=cos(a)*r*0.01*2
        this.y=cy+sin(a)*r
        this.yDrift=sin(a)*r*0.01
        this.image=image
        this.scl=0.1
        this.grow=1.02
        this.a=random(TWO_PI)
        this.rot=(PI/50) * random(-1,1)
        this.ttlMax=80
        this.ttl=this.ttlMax
    }

    run(){
        if(this.ttl>0){
            this.ttl--
        }
        this.scl*=this.grow
        this.a+=this.rot
        this.x+=this.xDrift
        this.y+=this.yDrift
        return this.ttl>0
    }

    show(){
        push()
        translate(this.x, this.y)
        scale(this.scl)
        rotate(this.a)
        imageMode(CENTER)
        tint(255,80+170*this.ttl/this.ttlMax)
        image(this.image,0,0)
        pop()
    }
}