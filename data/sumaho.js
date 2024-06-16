let ts = document.createElement('script');
ts.src = "headCode.js";
console.log(kazu);

let scene = document.querySelector('a-scene');

let getObj;
let oya;
//  let maePos  <---  これできない　　なんで
let maeX; // 1フレーム前のｘ座標  オブジェクトの
let maeY; // 1フレーム前のｙ座標　オブジェクトの
let maeZ; // 1フレーム前のｚ座標　オブジェクトの

//  let pos　<---  これできない　　なんで
let xx;  // xのいま
let yy;  // yのいま
let zz;  // zのいま

// let mouseMaePos　<---  これできない    なんで
let mouseMaeX;   // 1フレーム前のｘ座標  マウスの
let mouseMaeY;   // 1フレーム前のｙ座標  マウスの

let pushMouse = false;  // レイに当たった　子オブジェクト　を移動するか

let pushQ = false; // レイに当たった子オブジェクトの　親オブジェクト　を移動するか　　　指だと２本にしたらいい？

let supportTouch = 'ontouchend' in document;
console.log(supportTouch);
let TOUCHSTART = supportTouch ? 'touchstart' : 'mousedown';
let TOUCHMOVE = supportTouch ? 'touchmove' : 'mousemove';
let TOUCHEND = supportTouch ? 'touchend' : 'mouseup';

AFRAME.registerComponent('raycaster-listen', {
	init: function () {
    this.el.addEventListener('raycaster-intersected', evt => {
      this.raycaster = evt.detail.el;
      // レイに当たったオブジェクト取得
      getObj = evt.target;

      //最初に取得するオブジェクトの座標
      maeX = getObj.getAttribute('position').x;
      maeY = getObj.getAttribute('position').y;
      maeZ = getObj.getAttribute('position').z;

      zz = maeZ;

      // 今このオブジェクト移動してるよって
      getObj.setAttribute('material', 'color', 'green');

    });
    this.el.addEventListener('raycaster-intersected-cleared', evt => {
      evt.target.setAttribute('material', 'color', 'red');
      this.raycaster = null;
      getObj =null;
      oya = null;
    });
  },
  
  tick: function () {
    if (!this.raycaster) { return; }  // Not intersecting.

    let intersection = this.raycaster.components.raycaster.getIntersection(this.el);
    if (!intersection) { return; }

    //　スマホ
    if(supportTouch)
    {
      const body = document.querySelector('body');
      body.ontouchstart = start_handler;
      body.ontouchmove = move_handler;

      if (getObj != null && yubi == 1)     //　子オブジェクトの移動　　１指移動
      {
        // 今と１フレーム前のマウスの位置の差　１０は定数
        let saX = (xx - mouseMaeX)/100.0 ;
        let saY = (yy - mouseMaeY)/100.0 ;
        // ｚ座標はよくわかりませんでした　　平面検知で別のコード？
        getObj.setAttribute('position', (maeX + saX) + ' ' + (maeY - saY) + ' ' + zz);//getObj.getAttribute('position').z);
        //最初に取得するオブジェクトの座標
        maeX = getObj.getAttribute('position').x;
        maeY = getObj.getAttribute('position').y;
        maeZ = getObj.getAttribute('position').z;

        if(hoiru === true)
          {
            document.body.addEventListener('wheel', zoom, {passive: false})
            console.log("よんだ？");
            getObj.setAttribute('position', getObj.getAttribute('position').x + ' ' + getObj.getAttribute('position').y + ' ' + zz);
          }
          hoiru = false;
      }
      else if (getObj != null && yubi == 2)   //　親オブジェクトの移動　　２指移動
      {
        oya = getObj.parentNode;
        console.log(oya);

        // 今と１フレーム前のマウスの位置の差　１０は定数
        let saX = (xx - mouseMaeX)/10 ;
        let saY = (yy - mouseMaeY)/10 ;

        // ｚ座標はよくわかりませんでした　　平面検知で別のコード？
        oya.setAttribute('position', (maeX + saX) + ' ' + (maeY - saY) + ' ' + zz);//oya.getAttribute('position').z);

        //最初に取得するオブジェクトの座標
        maeX = oya.getAttribute('position').x;
        maeY = oya.getAttribute('position').y;
        maeZ = oya.getAttribute('position').z;

        if(hoiru === true)
          {
            //document.body.addEventListener('wheel', zoom, {passive: false})
            handle_pinch_zoom();
            console.log("よんだ？");
            oya.setAttribute('position', oya.getAttribute('position').x + ' ' + oya.getAttribute('position').y + ' ' + zz);
          }
          hoiru = false;
      }
      body.ontouchcancel = end_handler;
      body.ontouchend = end_handler;
    }
    //　パソコン
    else if(!supportTouch)
    {
      pasokonnVer()
    }
    
  }
});
//document.addEventListener('touchstart', start_handler, false);
//document.addEventListener('touchend', end_handler, false);
//document.addEventListener('touchcancel', end_handler, false);

////////////////////////////

let yubi = 0;   // 指の数
let hoiru = false;   // マウスホイール判定
const tpCache = [];
/*
    function init() {
      const el = document.querySelector('body');
      el.ontouchstart = start_handler;
      el.ontouchmove = move_handler;
      // touchcancel と touchend に同じハンドラーを使用
      el.ontouchcancel = end_handler;
      el.ontouchend = end_handler;
      el.onclick = click_handler;
    }
*/

    function handle_pinch_zoom(ev) {
      if (ev.targetTouches.length == 2) {
        // 2 つのタッチが、 2 タッチを開始したのと同じタッチかどうかを確認
        const point1 = tpCache.findLastIndex(
          (tp) => tp.identifier === ev.targetTouches[0].identifier,
        );
        const point2 = tpCache.findLastIndex(
          (tp) => tp.identifier === ev.targetTouches[1].identifier,
        );

        if (point1 >= 0 && point2 >= 0) {
          // 開始座標と移動座標の差を計算
          const diff1 = Math.abs(
            tpCache[point1].clientX - tpCache[point2].clientX,
          );
          //  ↑　たぶん　前のふれむのやつ　　指と指の間を計算
          //  ↓　たぶん　今のふれむのやつ　　指と指の間を計算
          const diff2 = Math.abs(
            ev.targetTouches[0].clientX - ev.targetTouches[1].clientX,
          );
          zz += (diff1 - diff2) * -0.003;
          // Restrict scale
        zz = Math.min(Math.max(-7, zz), -2);

        // Apply scale transform
        if(pushQ === false)
        {
          getObj.setAttribute('position', getObj.getAttribute('position').x + ' ' + getObj.getAttribute('position').y + ' ' + zz);
        }
        else if(pushQ === true)
        {
          oya.setAttribute('position', oya.getAttribute('position').x + ' ' + oya.getAttribute('position').y + ' ' + zz);
        }
        //getObj.setAttribute('position', getObj.getAttribute('position').x + ' ' + getObj.getAttribute('position').y + ' ' + zz);

        } else {
          // empty tpCache
          tpCache = [];
        }
      }
    }

    function start_handler(ev) {
      ev.preventDefault();
      console.log('反応してるよ');
      if (ev.targetTouches.length == 1) {
        yubi = ev.targetTouches.length;
        for (let i = 0; i < ev.targetTouches.length; i++) {
          tpCache.push(ev.targetTouches[i]);  //  １本の指　を入れる　
        }
      } 
      // 2タッチピンチ/ズームを後で処理するためにタッチ点をキャッシュする
      else if (ev.targetTouches.length == 2) {
        yubi = ev.targetTouches.length;
        for (let i = 0; i < ev.targetTouches.length; i++) {
          tpCache.push(ev.targetTouches[i]);
        }
      } 
      else 
      {
        console.log(ev.targetTouch.length);
      }

      getObj.setAttribute('material', 'color', 'cyan');
    }

    function move_handler(ev) {
      ev.preventDefault();
      /*
      if (!(ev.touches.length === 2 && ev.targetTouches.length === 2)) {
        getObj.setAttribute('color', 'blue');
      }
      */
     //  今の座標
     let aveX = 0;
     let aveY = 0;
     const element = ev.currentTarget;
      for(let i = 0; i < ev.targetTouches.length; i++)
      {
        aveX += aveX + ev.targetTouches[i].clientX - element.offsetLeft;
        aveY += aveY + ev.targetTouches[i].clientY - element.offsetTop;
      }
      aveX = aveX / ev.targetTouches.length;
      aveY = aveY / ev.targetTouches.length;

      mouseMaeX = xx;
      mouseMaeY = yy;

      xx = aveX;
      yy = aveY;

      pushMouse = true;
      // オブジェクトの移動
      //objMove();
      
      // 2 タッチの移動/ピンチ/ズームジェスチャーでは、このイベントをチェックする
      if(ev.targetTouches.length === 2)
      {
        handle_pinch_zoom(ev);
      }
    }

    function end_handler(ev) {
      ev.preventDefault();

      if (ev.targetTouches.length === 0) {
        getObj.setAttribute('color', 'yellow');
      }
    }

    function click_handler(ev) {
      console.log("a");
    }


/////////   オブジェクトの複製　  //////////////////////////
function clicked(){
  
  let dodai = document.getElementById('taihouNoDodai');
  let dodaiX = dodai.getAttribute('position').x;
  let dodaiY = dodai.getAttribute('position').y;
  let dodaiZ = dodai.getAttribute('position').z;

  let tutu = document.getElementById('taihouNoTutu');
  let tutuX = tutu.getAttribute('position').x;
  let tutuY = tutu.getAttribute('position').y;
  let tutuZ = tutu.getAttribute('position').z;

  let copyEntity = document.createElement('a-entity');
  copyEntity.setAttribute('id', 'taihou');
  copyEntity.setAttribute('position', '0 0 -5');
  copyEntity.setAttribute('rotation', '0 0 90');

  let copyDodai = document.createElement('a-box');
  copyDodai.setAttribute('id', 'taihouNoDodai');
  copyDodai.setAttribute('position', dodaiX + ' ' + dodaiY + ' ' + dodaiZ);
  copyDodai.setAttribute('scale', '1 1 1');
  copyDodai.setAttribute('color', 'red');
  copyDodai.setAttribute('raycaster-listen', '');

  let copyTutu = document.createElement('a-cylinder');
  copyTutu.setAttribute('id', 'taihouNoTutu');
  copyTutu.setAttribute('position', tutuX + ' ' + tutuY + ' ' + tutuZ);
  copyTutu.setAttribute('scale', '1 1 1');
  copyTutu.setAttribute('color', 'red');
  copyTutu.setAttribute('raycaster-listen', '');
  
  console.log(copyEntity);
  copyEntity.appendChild(copyDodai);
  copyEntity.appendChild(copyTutu);
  scene.appendChild(copyEntity);
  //copyObj.setAttribute('position', 0 + ' ' + -1 + ' ' + -5);
}

function tenka()
{
  // アニメーションの再生
}
///////////////////////////////

function pasokonnVer()
{
    if (getObj != null && pushMouse === true && pushQ === true)   //　親オブジェクトの移動　　キーボードのＱとマウスのドラッグで移動
    {
        oya = getObj.parentNode;
        console.log(oya);

        // 今と１フレーム前のマウスの位置の差　１０は定数
        let saX = (xx - mouseMaeX)/10 ;
        let saY = (yy - mouseMaeY)/10 ;

        // ｚ座標はよくわかりませんでした　　平面検知で別のコード？
        oya.setAttribute('position', (maeX + saX) + ' ' + (maeY - saY) + ' ' + oya.getAttribute('position').z );//oya.getAttribute('position').z);

        //最初に取得するオブジェクトの座標
        maeX = oya.getAttribute('position').x;
        maeY = oya.getAttribute('position').y;
        maeZ = oya.getAttribute('position').z;
        console.log(maeX);
        console.log(maeY);
        console.log(maeZ);
    }
    else if (getObj != null && pushMouse === true)     //　子オブジェクトの移動　　マウスのドラッグで移動
    {
            
        // 今と１フレーム前のマウスの位置の差　１０は定数
        let saX = (xx - mouseMaeX)/100.0 ;
        let saY = (yy - mouseMaeY)/100.0 ;

        // ｚ座標はよくわかりませんでした　　平面検知で別のコード？
        getObj.setAttribute('position', (maeX + saX) + ' ' + (maeY - saY) + ' ' + zz);//getObj.getAttribute('position').z);
            
        //最初に取得するオブジェクトの座標
        maeX = getObj.getAttribute('position').x;
        maeY = getObj.getAttribute('position').y;
        maeZ = getObj.getAttribute('position').z;
        //console.log(maeX);
        //console.log(maeY);
        //console.log(maeZ);
    }

    if(hoiru === true)
    {
        document.addEventListener('wheel', zoomP, {passive: false})
        console.log("よんだ？");
        if(pushQ)
        {
          oya = getObj.parentNode;
          oya.setAttribute('position', oya.getAttribute('position').x + ' ' + oya.getAttribute('position').y + ' ' + zz);
        }
        else if(!pushQ)
        {
          getObj.setAttribute('position', getObj.getAttribute('position').x + ' ' + getObj.getAttribute('position').y + ' ' + zz);
        }
        
    }
    //console.log(intersection.point);
    oya = null;
    hoiru = false;
}


function zoomP(event) 
{
    event.preventDefault();
      
    zz += event.deltaY * -0.003;
      
    // Restrict scale
    zz = Math.min(Math.max(-7, zz), -2);
      
    // Apply scale transform
    // target.setAttribute('position', pos);
    //console.log(pos);
}
      
function preZoomP()
{
  if(!supportTouch)
  {
    //console.log("maik");
    hoiru = true;
  }
}
document.body.addEventListener('wheel', preZoomP, {passive: false});

//let hoiru = false;   // マウスホイール判定

document.addEventListener('keydown', evt =>{
  //console.log("aaa");
  if(!supportTouch)
  {
    if(evt.key === 'q')
    {
      pushQ = true;
      console.log("aaa");
    }
  }
});
document.addEventListener('keyup', evt =>{
  if(!supportTouch)
  {
    if(evt.key === 'q')
    {
      pushQ = false;
      console.log("iiiii");
    }
  }
});
//////  子オブジェクト　を動かすか　マウスのドラッグで移動   ////////////////////
document.addEventListener('pointerdown', function()
{
  if(!supportTouch)
  {
    objMoveP();
  }
});

function objMoveP()
{
  // 100　は　console.log()を呼び出す間隔　100 = 0.1秒
  interval = setInterval(function(event)
  {
      console.log('押してるよ');
      scene.addEventListener('mousemove', handleMouseMoveP);
      pushMouse = true;
  }, 100);
}

scene.addEventListener('mousemove', handleMouseMoveP);  //これいるらしい

function handleMouseMoveP(event)
{
  if(!supportTouch)
  {
    const element = event.currentTarget;

    const x = event.clientX - element.offsetLeft;
    const y = event.clientY - element.offsetTop;

    // 1フレーム前のマウス位置をいれる
    mouseMaeX = xx;
    mouseMaeY = yy;

    // 今のマウス位置
    xx = x;
    yy = y;
  }

}
// ↑↓は対になってる
document.addEventListener('pointerup', function()
{
  if(!supportTouch)
  {
    clearInterval(interval);
    console.log('はなした');

    pushMouse = false;
  }
})
