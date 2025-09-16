class AnalysisScreen{
  constructor(windowFrame, sourceData, cols){
    this.x=windowFrame.x
    this.y=windowFrame.y
    this.w=windowFrame.w
    this.h=windowFrame.h
    this.sourceData=sourceData
    this.cols=cols
    this.ttConvergeMax=200;
    this.persona=new Persona(this.w,this.h*5/8)
    this.pr=new PurchaseRec(this.w,this.h*1/16)
    // this.dr=new DataRoll(w*5/9,h*5/16,16,3)
    // this.persona.generate(sourceData.types[0])
    // this.isConverging=false;
    // this.ttConverge=this.ttConvergeMax;
    this.pulse=0
    this.reset()
    this.ttStart=100;
  }
  
  reset(){
    let data=random(this.sourceData.types)
    // console.log(data)
    this.dr=new DataRoll(this.w*5/9,this.h*5/16,16,3)
    this.pr.reset(data.productName)
    this.persona.generate(data)
    this.isConverging=false;
    // this.ttConvergeMax=200;
    this.ttConverge=this.ttConvergeMax;
    return data.product
  }

  getProductReady(){
    return this.pr.getProductReady()
  }

  overRun(isQueueEmpty){
    push()
    translate(this.x, this.y)
    if(this.ttStart>0){
      this.ttStart--;
      fill(cols.accent1.r, cols.accent1.g, cols.accent1.b)
      // fill(255,0,255)
      noStroke()
      rect(0,0,this.w, this.h)
    } else {
      if(isQueueEmpty){
        // push()
        // translate(this.x, this.y)
        let rel=sin(frameCount*0.2)*0.5+0.5
        fill(cols.dark.r, cols.dark.g, cols.dark.b)
        // fill(255,0,255)
        noStroke()
        rect(0,0,this.w, this.h)
        fill(cols.base.r*rel, cols.base.g*rel, cols.base.b*rel)
        textFont('courier')
        textSize(this.w*0.1)
        text('searching for targets',this.w/2-this.w*0.4, this.h/2-this.w*0.25, this.w*0.8, this.w*0.5)
        // pop()
      } else {
        if(this.run()){
          // push()
          // translate(aX, aY)
          let rel=sin(frameCount*0.2)*0.5+0.5
          fill(cols.dark.r, cols.dark.g, cols.dark.b)
          noStroke()
          rect(0,0,this.w, this.h)
          fill(cols.base.r*rel, cols.base.g*rel, cols.base.b*rel)
          textFont('courier')
          textSize(this.w*0.1)
          text('targeting adverts',this.w/2-this.w*0.4, this.h/2-this.w*0.25, this.w*0.8, this.w*0.5)
          // pop()
        } else {
          // push()
          // translate(aX, aY)
          displayFirstInQueue(this.w*1/18,this.w*1/18,this.w*4/9)
          // pop()
          // displayFirstInQueueFrames(300,300)
          
        }
      }
    }
    
    pop()

  }
  
  run(){
    // push()
    // translate(this.x,this.y)
    textFont('courier')
    if(this.ttConverge>0){
      // background(0,pulse, pulse)
      this.pulse=sin(frameCount/5)*0.5+0.5
      fill(this.cols.accent1.r*this.pulse, this.cols.accent1.g*this.pulse, this.cols.accent1.b*this.pulse)
      noStroke()
      rect(0,0,this.w, this.h)
      this.ttConverge--;
    } else {
      // pulse+=(0-pulse)/20
      this.isConverging=true;
    }
    // fill(0, this.pulse,this.pulse)
    // noStroke()
    // rect(0,0,this.w, this.h)
    fill(0)
    rect(0,0,this.w*(1-this.ttConverge/this.ttConvergeMax),this.h)
    // background(isConverging?40:100);
    this.pr.show(0,this.h*5/16, this.cols)
    this.pr.run(this.isConverging)
    this.dr.show(this.w*4/9,0,this.isConverging, this.cols)
    // this.dr.run(this.isConverging)
    if(this.persona){
      this.persona.show(0,this.h*3/8,this.isConverging, this.cols)
      this.persona.run(this.isConverging)
    }
    // pop()
    return this.persona.analysIsDone
  }
}


class PurchaseRec{
  constructor(w,h){
    this.baseText="LIKELY TO BUY"
    this.productDisp="..."
    this.product="...."
    this.value=0
    this.valueDisp=0
    this.targetValue=floor(random(2000,10000))/100
    this.strVal=""
    this.stepVal=0.57
    this.w=w
    this.h=h
    this.ts=this.w*0.04
    this.locking=false
  }
  
  lock(){
    this.locking=!this.locking
    this.targetValue=floor(random(2000,10000))/100
    console.log(this.targetValue)
  }
  
  reset(product){
    this.product=product
    this.valueDisp=0
    this.productDisp="..."
    this.targetValue=floor(random(2000,10000))/100
  }
  
  run(isRunning){
    // if(this.locking){
    if(isRunning){
      if(abs(this.targetValue-this.value)<3){
        this.productDisp=this.product
        this.valueDisp=this.value
      }
      this.value+=(this.targetValue-this.value)/40
    } else {
      // this.value=(this.value+this.stepVal)%99.99
      if(frameCount%3==0) this.value=random(100)
    }
    
  }

  getProductReady(){
    return (this.productDisp==this.product)
  }
  
  show(x,y, cols){
    push()
    translate(x,y)
    if(this.productDisp==this.product &&
      abs(this.targetValue-this.value)<2){
      fill(cols.accent2.r, cols.accent2.g, cols.accent2.b)
    } else {
      fill(cols.accent1.r, cols.accent1.g, cols.accent1.b)
    }
    noStroke()
    rect(this.w*0.02,this.h*0.03,this.w*0.96,this.h-this.h*0.04,this.h*0.2)
    textAlign(LEFT,CENTER)
    textSize(this.ts)
    fill(cols.dark.r, cols.dark.g, cols.dark.b)
    noStroke()
    text(`${this.baseText}: ${this.productDisp}  ${nf(this.valueDisp,0,1)} %`,this.w*0.1,this.h/2)
    pop()
  }
}

class DataRoll{
  constructor(w,h,nl,nc){
    this.w=w;
    this.h=h
    this.nl=nl
    this.nc=nc
    this.cols=[]
    for(let i=0; i<nc; i++){
      this.cols.push(new codeColumn(w/(nc+1),h*0.9,nl))
    }
    console.log(this.cols)
  }
  
//   run(isRunning){
    
//   }
  
  show(x,y,isRunning, cols){
    push()
    translate(x,y)
    noFill()
    stroke(cols.accent1.r, cols.accent1.g, cols.accent1.b)
    strokeWeight(this.w*0.015)
    rect(this.w*0.05, this.w*0.05, this.w*0.9, this.h-this.w*0.08, this.w*0.03)
    this.cols.forEach((col,i)=>{
      col.show(this.w*0.1+i*this.w*0.8/this.nc,this.w*0.05, cols)
      col.run(isRunning)
    })
    pop()
  }
  
  
}

class codeColumn{
  constructor(w,h,nl){
    this.w=w;
    this.h=h
    this.nl=nl
    this.ts=h/(nl)
    this.currentLine=0
    this.codes=[]
    for(let i=0; i<nl; i++){
      this.codes.push(new HexCode(0, i*this.ts, 6, this.ts))
    }
  }
  
  run(isRunning){
    this.codes.forEach(code=>{
      if(random(100)<2 && isRunning){
        if(!code.isSaved){
          code.saveCode()
        }
      }
    })
    if(frameCount%3==0){
      this.currentLine=(this.currentLine+1)%100      
    }
    
  }
  
  show(x,y, cols){
    push()
    translate(x,y)
    this.codes.forEach(code=>{
      code.show(cols)
      code.run()
    })
    pop()
  }
  
}

class HexCode{
  constructor(xOff, yOff, nChars, ts){
    let val, strVal
    val=random(0,999)
    strVal=('000000000000' + val.toString(16).toUpperCase()).slice(-nChars);
    this.strVal=strVal
    this.xOff=xOff
    this.yOff=yOff
    this.ts=ts
    this.nChars=nChars
    this.isSaved=false
    this.accent=0
    this.accentMax=255
    this.age=100
  }
  
  saveCode(){
    if(this.age<=0){
      this.isSaved=true
      this.accent=this.accentMax
    }
  }
  
  run(){
    if(this.age>0){
      this.age--
    }
    this.accent+=(0-this.accent)/50
    if(!this.isSaved && frameCount%4==0){
      let val
      val=random(0,999)
      this.strVal=('000000000000' + val.toString(16).toUpperCase()).slice(-this.nChars);
    }
  }
  
  show(cols){
    textSize(this.ts)
    textAlign(LEFT,TOP)
    noStroke()
    fill(cols.accent1.r, cols.accent1.g, cols.accent1.b)
    if(this.isSaved){
      strokeWeight(0.5+1.5*this.accent/this.accentMax)
      stroke(cols.base.r, cols.base.g, cols.base.b)
      fill(cols.base.r, cols.base.g, cols.base.b)
      
    }
    // fill(0)//(255,0,0)
    text(this.strVal, this.xOff, this.yOff)
  }
  
}

class Persona{
  constructor(w,h){
    this.w=w
    this.h=h
    this.ts=w*0.035
    this.tss=w*0.04
    this.data=null
    this.targetVals=[
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
      ]
    this.currentVals=[
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
      ]
    this.isDone=false;
    this.count=0
    this.ttSettle=100
    this.ttAnalyse=300
    this.analysIsDone=0;
  }
  
  generate(data){
    this.data=data
    console.log(this.data)
    this.targetVals=[
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
      ]
    this.currentVals=[
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
      ]
    this.isDone=false;
    this.count=0
    this.analysIsDone=false;
    // this.ttSettle=100
  }
  
  show(x,y,isRunning, cols){
    let xOff=this.w*0.7-this.ts
    let yOff=this.w*0.05;
    let rel=(sin(frameCount/5)*0.5+0.5)
    push()
    translate(x,y)
    noFill()
    stroke(cols.accent1.r, cols.accent1.g, cols.accent1.b)
    if(this.analysIsDone){
      stroke(cols.accent2.r, cols.accent2.g, cols.accent2.b)
    }
    strokeWeight(this.w*0.01)
    rect(this.w*0.025, this.w*0.025, this.w*0.95, this.h-this.w*0.05, this.w*0.025)
    if(this.data){
      textSize(this.ts)
      textAlign(LEFT, TOP)
      fill(cols.base.r, cols.base.g, cols.base.b)
      for(let i=0; i<this.data.characteristics.length; i++){
        stroke(cols.base.r, cols.base.g, cols.base.b)
        fill(cols.base.r, cols.base.g, cols.base.b)
        strokeWeight(1)
        textAlign(RIGHT, TOP)
        text((this.data.characteristics[i].characteristic),xOff, yOff)
        yOff+=this.tss
        for(let j=0; j<this.data.characteristics[i].dimensions.length; j++){

          noStroke()
          fill(cols.base.r, cols.base.g, cols.base.b)
          textAlign(RIGHT, TOP)
          text((this.data.characteristics[i].dimensions[j].dimension+":"), xOff, yOff)
          // yOff+=this.ts
          noStroke()
          textAlign(LEFT, TOP)
          if(isRunning){
          // if(this.targetVals[i][j]!=-1){
            fill(cols.base.r, cols.base.g, cols.base.b)
            stroke(cols.base.r, cols.base.g, cols.base.b)//0
            strokeWeight(1)
            text(this.currentVals[i][j],xOff+1*this.ts, yOff)
            
          } else {
            fill(cols.base.r*rel, cols.base.g*rel, cols.base.b*rel)
            text('...analysing',xOff+1*this.ts, yOff)
          }
          yOff+=this.tss
        }
        yOff+=this.tss
      }
    }
    pop()
  }
                                      
  run(isRunning){
    if(isRunning && this.data){
      this.data.characteristics.forEach((ch,i)=>{
        // console.log(ch.dataType)
        ch.dimensions.forEach((dim,j)=>{
          if(this.targetVals[i][j]==-1){
            if(frameCount%3==0){
              if(dim.dataType=="int"){
                this.currentVals[i][j]=nf(floor(random(dim.dataRange.min, dim.dataRange.max)), dim.dataRange.digits,0)
              }
              if(dim.dataType=="list"){
                this.currentVals[i][j]=random(dim.dataRange.list)
              }
              if(dim.dataType=="percent"){
                this.currentVals[i][j]=nf(random(dim.dataRange.min, dim.dataRange.max),1,2)
              }
              if(dim.dataType=="percent"){
                this.currentVals[i][j]=nf(random(dim.dataRange.min, dim.dataRange.max),1,2)+'%'
              }
            }
            if(this.count>this.ttSettle && random(100)<3){
              this.targetVals[i][j]=this.currentVals[i][j]
            }
            
          } else {

          }
        })
      })
      this.isDone=false //calculate when all target values are chosen
      this.analysIsDone=this.count>this.ttSettle+this.ttAnalyse
      this.count++
    }
  }
  
  
}