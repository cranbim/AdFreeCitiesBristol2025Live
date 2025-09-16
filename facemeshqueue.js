// Based originally on Face Mesh Detection - Triangulated Face Mapping  
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/facemesh  
// https://youtu.be/R5UZsIwPbJA  


let faceMesh;
let faces = [];
let triangles;
let cr
let captureW, captureH, captureX, captureY, captureScl
let ttStart=100;

function loadFaceMeshModel() {
    // Load FaceMesh model 
    faceMesh = ml5.faceMesh({ maxFaces: 3, flipped: true });
}

function gotFaces(results) {
    faces = results;
}

function startFaceMesh(windowFrame,scl){
    ttStart=100;
    captureW=windowFrame.w
    captureH=windowFrame.h
    captureX=windowFrame.x
    captureY=windowFrame.y
    // captureW=w
    // captureH=h
    // captureX=x
    // captureY=y
    captureScl=scl
    // Start detecting faces
  faceMesh.detectStart(video, gotFaces);
  // Get predefined triangle connections
  triangles = faceMesh.getTriangles();
  // cr=new CaptureRunner(5,5,60,30,0.7,20)
  cr=new CaptureRunner(3,3,60,30,0.7,20)
}

function runFaceMeshQueue(vidW){
    push()
    translate(captureX, captureY)
    if(ttStart>0){
      ttStart--
      fill(cols.accent2.r, cols.accent2.g, cols.accent2.b)
      // fill(255,0,255)
      noStroke()
      rect(0,0,captureW, captureH)
    } else {
      let xOff=(captureW-vidW)/2
      let yOff=(captureH-vidH)/2
      fill(100)
      noStroke()
      rect(0,0,captureW, captureH)
      // scale(captureScl*0.5)
      // let vidScl=captureW/vidW
      push()
      let vidScl=video.height/windowFrames.capture.h
      scale(1/vidScl)
      image(video,0,0)
      // translate(xOff, yOff)
      faces.forEach(face=>{
          let bbox=face.box
          let currentSize=max(bbox.width, bbox.height)
          stroke(0,200,200)
          strokeWeight(5)
          noFill()
          rect(bbox.xMin, bbox.yMin,bbox.width, bbox.height)
        })
        pop()
        // noStroke()
        // fill(0,100)
        // rect(0,captureH-captureW*0.1,captureW,captureW*0.1)
        // cr.playbackQueue(0,captureH-captureW*0.1,captureW*0.1)
        cr.playbackQueue(captureW*0.82,captureH*0.02,captureW*0.11)
        cr.analyse(video, faces, triangles)
        cr.playback(0,0,captureW*0.1)
      
      //   if(cr.getQueueStats().length>=1){
      //     cr.playbackFirstInQueue(200,200,200)
      //   }
      // stroke(100)
      // strokeWeight(10)
      // noFill()
      // rect(0,0,captureW,captureH)
    }
    
    pop()
}

function isQueueEmpty(){
  // console.log(cr.getQueueStats().length)
  return cr.getQueueStats().length==0
}

function getNextInQueue(){
  cr.removeFirst()
}


function displayFirstInQueue(x,y,s){
    if(cr.getQueueStats().length>=1){
        cr.playbackFirstInQueue(x,y,s)
    }
}

function displayFirstInQueueFrames(buf,x,y,w,h){
  if(cr.getQueueStats().length>=1){
      cr.playbackFirstInQueueFrames(buf,x,y,w,h)
  }
}


class CaptureRunner{
    constructor(maxCaptures, maxQueue, framesPerCapture, framesToIgnore, certaintyThreshold, moveThreshold){
      this.framesPerCapture=framesPerCapture
      this.framesToIgnore=framesToIgnore
      this.maxCaptures=maxCaptures
      this.maxQueue=maxQueue
      this.cThreshold=certaintyThreshold
      this.mThreshold=moveThreshold
      this.captures=[]
      this.queue=[]
      for(let i=0; i<maxCaptures; i++){
        this.captures.push(new FaceCapture(framesPerCapture, framesToIgnore))
      }
    }
  
    analyse(video, faces, triangles){
      faces.forEach((face,i)=>{
        if(!this.captures[i].isFull){
          this.captures[i].addFrame(video, face, triangles)
        } else {
          if(this.queue.length<this.maxQueue /*&& random(100)<50*/){
            this.queue.push(new CaptureFrames(this.captures[i].frames))
          }
          this.captures[i] = new FaceCapture(this.framesPerCapture, this.framesToIgnore)
          console.log(this.queue)
        }
      })
    }
  
  
    playback(x,y,s){
      faces.forEach((face,i)=>{
        if(true){
          this.captures[i].playFrames(x+i*s,y,s,s)
        }
      })
    }
  
    getQueueStats(){
      return {length: this.queue.length}
    }
  
    playbackFirstInQueue(x,y,s){
      if(this.queue.length>=1){
        push()
        translate(x,y)
        this.queue[0].playFrames(0,0,s,s, true, true)
        pop()
      }
    }

    playbackFirstInQueueFrames(buf,x,y,w,h){
      if(this.queue.length>=1){
        buf.push()
        buf.translate(x,y)
        this.queue[0].playFramesOnly(buf,0,0,w,h)
        buf.pop()
      }
    }
  
    playbackQueue(x,y,s){
      // let hover=false
      this.queue.forEach((pq,i)=>{
        // hover=mouseX>i*s && mouseX<i*s+s && mouseY>0 && mouseY<s
        if(true){
          pq.playFrames(x+0,y+i*s,s*0.9,s*0.9, false, false)
        }
        // if(hover){
        //   fill(0,200,0,100)
        //   noStroke()
        //   rect(i*s,0,s,s)
        // }
      })
    }

    removeFirst(){
      if(this.queue.length>0){
        this.queue.splice(0,1)
      }
    }
  
    clickQueue(s){
      let hover=false
      for(let i=this.queue.length-1; i>=0; i--){
        hover=mouseX>i*s && mouseX<i*s+s && mouseY>0 && mouseY<s
        if(hover){
          this.queue.splice(i,1)
        }
      }
    }
    // analyse faces
    // for each add to a capture until the capture is full
    // for each detected face, determin certainty, centre of face
  
    // for loaded faces, playback, on at a time
  }
  
  class CaptureFrames{
    constructor(frames){
      this.frames=frames
      this.currentPlayFrame=0
    }
  
    playFrames(x,y,w,h,invert,showBars){
      if(this.currentPlayFrame<this.frames.length){
        this.frames[this.currentPlayFrame].show(x,y,w,h, invert, showBars)
        this.currentPlayFrame=(this.currentPlayFrame+1)%this.frames.length
      }
    }

    playFramesOnly(buf,x,y,w,h){
      if(this.currentPlayFrame<this.frames.length){
        this.frames[this.currentPlayFrame].showFrame(buf,x,y,w,h)
        this.currentPlayFrame=(this.currentPlayFrame+1)%this.frames.length
      }
    }
  }
  
  class FaceCapture{
    constructor(maxFrames, ignoreFrames){
      this.maxFrames=maxFrames
      this.ignoreFrames=ignoreFrames
      this.frames=[]
      this.isDone=false
      this.isFull=false
      this.currentPlayFrame=0
    }
  
    addFrame(video, face, triangles){
      if(!this.isFull){
        let newFrame=new FaceMeshFrame()
        newFrame.build(video, face, triangles)
        this.frames.push(newFrame)
        if(this.frames.length>=(this.maxFrames + this.ignoreFrames)){
          this.isFull=true
          // this.frames.shift()
          // this.currentPlayFrame=0
          this.frames.splice(0,this.ignoreFrames)
        }
      }
      // console.log(this.currentPlayFrame)
    }
  
    reset(){
      this.currentPlayFrame=0
      this.frames=[]
      this.isFull=false
      console.log('reset')
    }
  
    playFrames(x,y,w,h){
      if(this.currentPlayFrame<this.frames.length){
        this.frames[this.currentPlayFrame].show(x,y,w,h,false,false)
        // fill(255)
        // text(this.frames.length,x,y+30)
        // text(this.isFull+" "+this.maxFrames,x,y+60)
        this.currentPlayFrame=(this.currentPlayFrame+1)%this.frames.length
      }
    }
  
  }
  
  class FaceMeshFrame{
    constructor(){
      this.frame={
        scl: 0.5,
        box: {},
        triangles:[],
        frame: null
      }
      this.built=false
    }
  
    build(video, face, triangles){
      this.frame.frame=video.get()
      this.frame.box=face.box
      this.frame.scl=1/this.frame.box.height
      video.loadPixels()
      for (let i = 0; i < triangles.length; i++) {
        let tri = triangles[i];
        let [a, b, c] = tri;
        let pointA = face.keypoints[a];
        let pointB = face.keypoints[b];
        let pointC = face.keypoints[c];
  
        // Calculate the centroid of the triangle
        let cx = (pointA.x + pointB.x + pointC.x) / 3;
        let cy = (pointA.y + pointB.y + pointC.y) / 3;
  
        // Get color from video pixels at centroid location
        let index = (floor(cx) + floor(cy) * video.width) * 4;
        let rr = video.pixels[index];
        let gg = video.pixels[index + 1];
        let bb = video.pixels[index + 2];
  
        let triangle={
          col:{r: rr, g: gg, b: bb},
          points:{
            a: {x: pointA.x-this.frame.box.xMin, y: pointA.y-this.frame.box.yMin},
            b: {x: pointB.x-this.frame.box.xMin, y: pointB.y-this.frame.box.yMin},
            c: {x: pointC.x-this.frame.box.xMin, y: pointC.y-this.frame.box.yMin},
            o: {x: cx-this.frame.box.xMin, y:cy-this.frame.box.yMin}
          }
        }
        this.frame.triangles.push(triangle)
        this.built=true
      }
    }
  
    showFrame(buf,x,y,w,h){
      buf.push()
      buf.translate(x,y)
      if(this.built){
        // let scl=h*this.frame.scl
        let xOff=0//(w-this.frame.frame.width)/2
        let scl=h/this.frame.frame.height
        buf.scale(scl)
        buf.imageMode(CENTER)
        // buf.image(this.frame.frame,xOff, 0)
        let arD=w/h
        let yEff=this.frame.frame.width/arD
        let yDiff=this.frame.frame.height-yEff
        let yOff=yDiff/2
        buf.image(this.frame.frame,0,0,w,h,xOff, yOff,this.frame.frame.width,yEff)
        buf.filter(POSTERIZE,4)
        // buf.filter(THRESHOLD,0.5)
      } else {
        buf.textSize(20)
        buf.textAlign(LEFT,TOP)
        buf.fill(255)
        buf.noStroke()
        buf.text('No frame built',0,0)
      }
      buf.pop()
    }

    show(x,y,w,h,invert,showBars){
      let barY=(frameCount*2.5)%h
      let barX=(frameCount*3)%w
      let barD=h*0.05
      push()
      translate(x,y)
      if(this.built){
        let scl=h*this.frame.scl
        
        scale(scl)
        beginShape(TRIANGLES);
        let rBar=0, gBar=0, bBar=0
        noStroke()
        this.frame.triangles.forEach(tri=>{
          rBar=gBar=bBar=0
          if(showBars){
            if(abs(tri.points.o.y*scl-barY)<barD){
              gBar=100
              bBar=100
            }
            if(abs(tri.points.o.x*scl-barX)<barD ||
              abs(tri.points.o.x*scl-(w-barX))<barD){
              rBar=100
            }
          }
          if(invert){
            let shade=(tri.col.r+tri.col.g+tri.col.b)/3
            fill(shade+rBar, shade+gBar, shade+bBar);
          } else {
            fill(tri.col.r+rBar, tri.col.g+gBar, tri.col.b+bBar);
          }
          vertex(tri.points.a.x, tri.points.a.y);
          vertex(tri.points.b.x, tri.points.b.y);
          vertex(tri.points.c.x, tri.points.c.y);
        })
        endShape()
        scale(1/scl)
        if(showBars){
          stroke(0,200,200,190)
          strokeWeight(w*0.01)
          line(0,barY,w,barY)
          stroke(255,0,0,190)
          line(barX,0,barX,h)
          line(w-barX,0,w-barX,h)
        }
      } else {
        textSize(20)
        textAlign(LEFT,TOP)
        fill(255)
        noStroke()
        text('No frame built',0,0)
      }
      pop()
    }
  
  }