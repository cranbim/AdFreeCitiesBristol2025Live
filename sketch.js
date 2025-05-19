

let as
let cols={
  dark: {r: 20, g: 20, b: 20},
  base: {r: 220, g: 220, b: 220},
  accent1: {r: 91, g: 217, b: 204},
  accent2: {r: 235, g: 100, b: 20},
}
let aW=450, aH=800
let adW=450, adH=800
let aX, aY

let resetInterval=1000 * 60 * 5 //5 minutes refresh?
let reset=setInterval(resetAll, resetInterval)

// const windowFrames={
//   analysis: {x:50, y:50, w:400, h:700}, 
//   capture: {x:500, y:50, w:700, h:400},
//   adPlayer: {x:1250, y:0, w:450, h:800},
//   emojiJoy: {x:450, y:450, w:800, h:450},
// }

const windowFrames={
  analysis: {x:0, y:0, w:450, h:Math.floor(450/0.629)}, 
  capture: {x:450, y:0, w:700, h:Math.floor(700/1.758)},
  adPlayer: {x:1250, y:0, w:450, h:Math.floor(450/0.571)},
  emojiJoy: {x:450, y:450, y:450, w:800, h:Math.floor(800/1.765)},//, w:400, h:225}//
}
console.log(windowFrames)

// const windowFrames={
//   analysis: {x:50, y:50, w:400, h:700},
//   capture: {x:500, y:50, w:700, h:400},
//   adPlayer: {x:1250, y:0, w:450, h:800},
//   emojiJoy: {x:450, y:450, w:800, h:450},
// }

// const windowFrames={
//   analysis: {x:412, y:103, w:163, h:259},
//   capture: {x:91, y:163, w:262, h:149},
//   adPlayer: {x:60, y:401, w:157, h:275},
//   emojiJoy: {x:310, y:441, w:286, h:162},
// }

let video;
const devices = [];
let numDevices=0
const chosenCameraIndex=0;
let vidW, vidH
let dispX, dispY, dispScl
let dispW=800
let dispH=450
let vidScl
let faceMeshContainer
let ttResetInterval=700;
let ttReset=ttResetInterval
let adPlayer1
let emojiJoy
let adFiles=[{label:"sike", file:"./media/Sike.mp4"},
            {label:"blarepods", file:"./media/Blarepods.mp4"},
            {label:"druel", file:"./media/Druel.mp4"}
          ]
let ads={}
let productPicFiles=[{label:"sike", file:"./media/SikeEMOJI.png"},
                {label:"blarepods", file:"./media/BlarepodsEMOJI.png"},
                {label:"druel", file:"./media/DruelEMOJI.png"}
]
let productPics={}
let emojiFiles=[{label:"buynow", file:"./media/BuyNowEMOJI.png"},
                {label:"shownow", file:"./media/ShopNowEMOJI.png"},
]
let emojis={}
let vid

function preload() {
  loadFaceMeshModel()
  for(let i=0; i<adFiles.length; i++){
    ads[adFiles[i].label]=createVideo(adFiles[i].file)
  }
  for(let i=0; i<productPicFiles.length; i++){
    productPics[productPicFiles[i].label]=loadImage(productPicFiles[i].file)
  }
  for(let i=0; i<emojiFiles.length; i++){
    emojis[emojiFiles[i].label]=loadImage(emojiFiles[i].file)
  }
  navigator.mediaDevices.enumerateDevices()
    .then(gotDevices);
}


function setup() {
  createCanvas(windowWidth*1.5, windowHeight)
  aX=0
  aY=0
  // as=new AnalysisScreen(windowFrames.analysis, sourceData, cols)
  // ar=width/height
  dispX=aW
  dispY=0
  // dispW=width*0.5
  // dispH=dispW/ar
  dispScl=width/dispW
  resetAll()
  // video = createCapture(VIDEO, { flipped: true });
  // video.hide();
  
  let adObjs=Object.keys(ads)
  adObjs.forEach(ad=>{
    ads[ad].hide()
  })
  // vid.loop()
  console.log(dispW,vidW,vidScl)
  // adPlayer1=new AdPlayer(windowFrames.adPlayer,ads["blarepods"])
  // emojiJoy=new EmojiJoy(windowFrames.emojiJoy, productPics["druel"], emojis)
  // startFaceMesh(windowFrames.capture, vidScl)
  // resetProduct()
}

function resetAll(){
  console.log(">>>> resetting >>>>")
  as=new AnalysisScreen(windowFrames.analysis, sourceData, cols)
  
  // video = createCapture(VIDEO, { flipped: true });
  adPlayer1=new AdPlayer(windowFrames.adPlayer,ads["blarepods"])
  emojiJoy=new EmojiJoy(windowFrames.emojiJoy, productPics["druel"], emojis)
  faceMesh.detectStop()
  startFaceMesh(windowFrames.capture, vidScl)
  resetProduct()
}

function gotDevices(deviceInfos) {
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    if (deviceInfo.kind == 'videoinput') {
      devices.push({
        label: deviceInfo.label,
        id: deviceInfo.deviceId
      });
    }
  }
  console.log(devices);
  numDevices=devices.length
  let supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
  console.log(supportedConstraints);
  constraints = {
    flipped: true,
    video: {
      deviceId: {
        exact: devices[chosenCameraIndex].id
      },
    },
    audio: false
  };
  video=createCapture(constraints);
  video.hide()
  vidW=video.width
  vidH=video.height
  console.log(vidW, vidH)
  vidScl=dispW/vidW
}

function draw(){
  background(255,0,0)
  as.overRun(isQueueEmpty())

  runFaceMeshQueue(vidW)
  if(ttReset>0){
    ttReset--
  } else {
    if(!isQueueEmpty()){
      getNextInQueue()
      resetProduct()
    }
    
  }
  adPlayer1.display(as.getProductReady())
  emojiJoy.display(as.getProductReady())
}

function resetProduct(){
  let product=as.reset()
  console.log(">>>>"+product)
  emojiJoy.reset(productPics[product])
  adPlayer1.reset(ads[product])
  ttReset=ttResetInterval
}

function mousePressed(){
  resetProduct()
}

