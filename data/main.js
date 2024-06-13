let scene = document.querySelector('a-scene');

let getObj;
let maeX; // 1フレーム前のｘ座標  オブジェクトの
let maeY; // 1フレーム前のｙ座標　オブジェクトの
let maeZ; // 1フレーム前のｚ座標　オブジェクトの
let xx;  // xのいま
let yy;  // yのいま
let zz;  // zのいま
let mouseMaeX;   // 1フレーム前のｘ座標  マウスの
let mouseMaeY;   // 1フレーム前のｙ座標  マウスの
let pushMouse = false;  // レイに当たった　子オブジェクト　を移動するか

let pushQ = false; // レイに当たった子オブジェクトの　親オブジェクト　を移動するか　　　指だと２本にしたらいい？

AFRAME.registerComponent('raycaster-listen', {
	init: function () {
    this.el.addEventListener('raycaster-intersected', evt => {
      this.raycaster = evt.detail.el;
      // レイに当たったオブジェクト取得
      getObj = evt.target;
      console.log(getObj);

      //最初に取得するオブジェクトの座標
      maeX = getObj.getAttribute('position').x;
      maeY = getObj.getAttribute('position').y;
      maeZ = getObj.getAttribute('position').z;


      zz = maeZ;

      // 今このオブジェクト移動してるよって
      getObj.setAttribute('material', 'color', 'green');

       console.log(maeX);
       console.log(maeY);
       console.log(maeZ);
    });
    this.el.addEventListener('raycaster-intersected-cleared', evt => {
      evt.target.setAttribute('material', 'color', 'red');
      this.raycaster = null;
      getObj =null;
      //console.log(getObj);
    });
  },

  tick: function () {
    if (!this.raycaster) { return; }  // Not intersecting.

    let intersection = this.raycaster.components.raycaster.getIntersection(this.el);
    if (!intersection) { return; }
    
    if (getObj != null && pushMouse === true && pushQ === true)   //　親オブジェクトの移動　　キーボードのＱとマウスのドラッグで移動
    {
      let oya = getObj.parentNode;
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
      document.body.addEventListener('wheel', zoom, {passive: false})
      console.log("よんだ？");
      getObj.setAttribute('position', getObj.getAttribute('position').x + ' ' + getObj.getAttribute('position').y + ' ' + zz);
    }
    //console.log(intersection.point);
    hoiru = false;
  }
});

/////// 親オブジェクト　を動かすか　キーボードのＱとマウスのクリックで移動   //////////
document.addEventListener('keydown', evt =>{
  //console.log("aaa");
  if(evt.key === 'q')
  {
    pushQ = true;
    console.log("aaa");
  }
});
document.addEventListener('keyup', evt =>{
  if(evt.key === 'q')
  {
    pushQ = false;
    console.log("iiiii");
  }
})
////////////////////////////

//////  子オブジェクト　を動かすか　マウスのドラッグで移動   ////////////////////
document.addEventListener('pointerdown', function()
{
    objMove();
});

function objMove(){
  // 100　は　console.log()を呼び出す間隔　100 = 0.1秒
  interval = setInterval(function(event)
  {
      console.log('押してるよ');
      scene.addEventListener('mousemove', handleMouseMove);
      pushMouse = true;
  }, 100);
}

scene.addEventListener('mousemove', handleMouseMove);

function handleMouseMove(event)
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
// ↑↓は対になってる
document.addEventListener('pointerup', function()
{
    clearInterval(interval);
    console.log('はなした');

    pushMouse = false;
})
///////////////////////////////////


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

function zoom(event) {
  event.preventDefault();

  zz += event.deltaY * -0.003;

  // Restrict scale
  zz = Math.min(Math.max(-7, zz), -2);

  // Apply scale transform
  // target.setAttribute('position', pos);
  //console.log(pos);
}

function preZoom(){
  hoiru = true;
}

document.body.addEventListener('wheel', preZoom, {passive: false});

let yubi = 0;   // 指の数
let hoiru = false;   // マウスホイール判定
const tpCache = [];

    function init() {
      const el = document.querySelector('body');
      el.ontouchstart = start_handler;
      el.ontouchmove = move_handler;
      // touchcancel と touchend に同じハンドラーを使用
      el.ontouchcancel = end_handler;
      el.ontouchend = end_handler;
      el.onclick = click_handler;
    }

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
          const diff2 = Math.abs(
            ev.targetTouches[0].clientX - ev.targetTouches[1].clientX,
          );
          zz += (diff1 - diff2) * -0.003;
          // Restrict scale
        zz = Math.min(Math.max(-7, zz), -2);

        // Apply scale transform
        //target.setAttribute('position', zz);

        } else {
          // empty tpCache
          tpCache = [];
        }
      }
    }

    function start_handler(ev) {
      ev.preventDefault();
      // 2タッチピンチ/ズームを後で処理するためにタッチ点をキャッシュする
      if (ev.targetTouches.length == 2) {
        yubi = ev.targetTouches.length;
        for (let i = 0; i < ev.targetTouches.length; i++) {
          tpCache.push(ev.targetTouches[i]);
        }
      } 
      else if(ev.targetTouches.length != 2)
      {
        if(ev.targetTouches.length == 1)
        {

        }
        yubi = ev.targetTouches.length;
      }  
      getObj.setAttribute('material', 'color', 'cyan');
    }

    function move_handler(ev) {
      ev.preventDefault();
      if (!(ev.touches.length === 2 && ev.targetTouches.length === 2)) {
        getObj.setAttribute('color', 'blue');
      }

      // 2 タッチの移動/ピンチ/ズームジェスチャーでは、このイベントをチェックする
      handle_pinch_zoom(ev);
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