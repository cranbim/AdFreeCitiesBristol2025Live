class AdPlayer{
    constructor(windowFrame,video){
        this.x=windowFrame.x
        this.y=windowFrame.y
        this.w=windowFrame.w
        this.h=windowFrame.h
        this.video=video
        video.loop()
        // video.volume(0);
        // this.video=loadVideo
        this.xOff=0
        this.scl=this.w/video.width
        this.yOff=(this.h-video.height*this.scl)/2
        this.isPlaying=true
        console.log(this.scl, this.yOff)
        this.ttStart=100
    }

    reset(video){
        this.video=video
        video.loop()
    }

    display(productReady){
        push()
        translate(this.x, this.y)
        if(this.ttStart>0){
            this.ttStart--;
            fill(cols.accent1.r, cols.accent1.g, cols.accent1.b)
            // fill(255,0,255)
            noStroke()
            rect(0,0,this.w, this.h)
        } else {
            noStroke()
            fill(255)
            rect(0,0,this.w, this.h)
            if(productReady){
                // stroke(255,0,0)
                // line(0,0,this.w, this.h)
                // line(this.w,0,0, this.h)
                let img = this.video.get();
                push()
                scale(this.scl)
                image(img,this.xOff,this.yOff)
                pop()
            } else {
                textAlign(CENTER)
                textSize(this.w*0.08)
                noStroke()
                let rel=sin(frameCount*0.2)*0.5+0.5
                fill(0+255*rel)
                // text("building ads...", this.w/2, this.h/2)
                text("Please hold,", this.w/2, this.h*0.40)
                text("satirical", this.w/2, this.h*0.45)
                text("surveillance capitalism", this.w/2, this.h*0.5)
                text("in progress...", this.w/2, this.h*0.55)
            }
        }
        
        pop()
    }


}