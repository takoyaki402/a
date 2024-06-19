

//let near = head.src.near;
let new_box_List = [];

let scene = document.querySelector('a-scene');

// ray衝突用のa-plane
var target = document.getElementById('target');
// カーソルのポジション
var pos = target.getAttribute('position');


/*
<a-assets>
  <a-assets-item id = "model" src="./data/花火.glb">
</a-assets>
<a-gltf-model id = "hanabi"
              dynamic-body = "shape: cube; mass: 1"
              position = "0 0 0"
              raycaster-listens
              src = "#model">
</a-gltf-model>


<a-entity gltf-model="#monster" animation-mixer></a-entity>

*/

function objPrefab()
{
  let new_assets;
  let new_assets_item;
  let new_gltf_model;
  let new_cylinder;
    
  // 動かすオブジェクト

  new_assets = document.createElement('a-assets');

  new_assets_item = document.createElement('a-assets-item');
  new_assets_item.setAttribute('id', 'model');
  new_assets_item.setAttribute('src', './data/花火.glb');

  new_assets.appendChild(new_assets_item);
  scene.appendChild(new_assets);

  new_gltf_model = document.createElement('a-gltf-model');
  new_gltf_model.setAttribute('id', 'hanabi');
  new_gltf_model.setAttribute('dynamic-body', 'shape: cube; mass: 1');
  new_gltf_model.setAttribute('position', '0 -5 -5');
  new_gltf_model.setAttribute('src', '#model');

  scene.appendChild(new_gltf_model);

  let new_don_assets_item = document.createElement('a-assets-item');
  new_don_assets_item.setAttribute('id', 'don');
  new_don_assets_item.setAttribute('src', './data/花火本体.glb');

  new_assets.appendChild(new_don_assets_item);

  let new_don_gltf_model = document.createElement('a-entity');
  new_don_gltf_model.setAttribute('id', 'dokan');
  new_don_gltf_model.setAttribute('dynamic-body', 'shape: cube; mass: 1');
  new_don_gltf_model.setAttribute('animation-mixer', 'loop');
  new_don_gltf_model.setAttribute('position', '0 0 -5');
  new_don_gltf_model.setAttribute('gltf-model', '#dokan');

  scene.appendChild(new_don_gltf_model);


  /*
  new_box = document.createElement('a-box');
  new_box.setAttribute('color', 'yellow');
  new_box.setAttribute('position', '0 0 0');
  new_box.setAttribute('rotation', '0 0 0');

  new_cylinder = document.createElement('a-cylinder');
  new_cylinder.setAttribute('color', 'yellow');
  new_cylinder.setAttribute('position', '0 0 0');
  new_cylinder.setAttribute('rotation', '0 0 0');
  */
}

//objPrefab();



let now_box = 0;
function prefab()
{
  let new_entity;
  let new_box;
  let new_cylinder;
  if(now_box == 0)
  {
    // 動かすオブジェクト
    new_entity = document.createElement('a-entity');
    new_entity.setAttribute('id', 'original');
    new_entity.setAttribute('position', '0 0 -2');
    new_entity.setAttribute('roration', '0 0 0');

    new_box = document.createElement('a-box');
    new_box.setAttribute('color', 'yellow');
    new_box.setAttribute('position', '0 0 0');
    new_box.setAttribute('rotation', '0 0 0');

    new_cylinder = document.createElement('a-cylinder');
    new_cylinder.setAttribute('color', 'yellow');
    new_cylinder.setAttribute('position', '0 0 0');
    new_cylinder.setAttribute('rotation', '0 0 0');
  }
  else 
  {
    let entity_Pos = document.getElementById('original');
    let box_Pos = entity_Pos.firstElementChild.getAttribute('position');
    let cylinder_Pos = entity_Pos.lastElementChild.getAttribute('position');
    // 動かすオブジェクト
    new_entity = document.createElement('a-entity');
    new_entity.setAttribute('position', '0 0 -2');
    new_entity.setAttribute('roration', '0 0 0');

    new_box = document.createElement('a-box');
    new_box.setAttribute('color', 'yellow');
    new_box.setAttribute('position', box_Pos);
    new_box.setAttribute('rotation', '0 0 0');
    

    new_cylinder = document.createElement('a-cylinder');
    new_cylinder.setAttribute('color', 'yellow');
    new_cylinder.setAttribute('position', cylinder_Pos);
    new_cylinder.setAttribute('roration', '0 0 0');
  }
  
  new_entity.appendChild(new_box);
  new_entity.appendChild(new_cylinder);
  //scene.appendChild(new_entity);
  new_box_List.push(new_entity);
  scene.appendChild(new_box_List[now_box]);
  now_box = now_box + 1;
  console.log(now_box);
  /*
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
  */
}


// 最初のbox生成
prefab();


var cam = document.getElementById('camera');

function zoom(event) {
  event.preventDefault();

  pos.z += event.deltaY * -0.003;

  // Restrict scale
  pos.z = Math.min(Math.max(-7, pos.z), -2);

  // Apply scale transform
  target.setAttribute('position', pos)
  console.log(pos);
}

// パソコン用。ホイールで箱の大きさを変える
document.body.addEventListener('wheel', zoom, {passive: false});

//iOS用。一番最初の画面のみ機能する
document.addEventListener('click', () => {
  //permission_uiクラスを持っている要素を消す。
  //何故かiOSだとdisplay: none;が子オブジェクトに適用されないためforEachを使う羽目に
  document.querySelectorAll('.permission_ui').forEach((del) => {
    del.setAttribute('class', 'deleted_ui');
  });

  //a-sceneのdisplay: none;を削除して表示
  document.getElementById('main').removeAttribute('style');

  /*
  DeviceMotionの許可をリクエストする
  requestPermission()で動作の許可を求めるモーダルが表示され、grantedが許可を意味している
  色を変えているのは何となく
  */
  if (window.DeviceMotionEvent && window.DeviceMotionEvent.requestPermission) {
    DeviceMotionEvent.requestPermission()
                     .then((state) => {
                       if (state === 'granted') {
                         new_box_List[0].setAttribute('color', 'gray');
                       } else {
                         alert('動作と方向へのアクセスを許可してください');
                       }
                     })
                     .catch((err) => console.error(err));
                     new_box_List[0].setAttribute('color', 'white');
  } else {
    //これなしでいいかも
    new_box_List[0].setAttribute('color', 'black');
  }

  //ここでinit();を呼び出さないと上手くいかない
  init();
});


const tpCache = [];

function init() {
  const el = document.querySelector('body');
  el.ontouchstart = start_handler;
  el.ontouchmove = move_handler;
  // touchcancel と touchend に同じハンドラーを使用
  el.ontouchcancel = end_handler;
  el.ontouchend = end_handler;
}


//  これ動かしてるの　衝突用のa-plane
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
      pos.z += (diff1 - diff2) * -0.003;
      // Restrict scale
    pos.z = Math.min(Math.max(-7, pos.z), -2);

    // Apply scale transform
    target.setAttribute('position', pos);

    } else {
      // empty tpCache
      tpCache = [];
    }
  }
}

function start_handler(ev) {
  ev.preventDefault();
  if(ev.targetTouches.length != 0)
  {
    // 2タッチピンチ/ズームを後で処理するためにタッチ点をキャッシュする
    if (ev.targetTouches.length == 2) {
      for (let i = 0; i < ev.targetTouches.length; i++) {
        tpCache.push(ev.targetTouches[i]);
      }
    }  

    touchHajime = true;
    
    console.log(ev.targetTouches.length);
  } 
  //  これなくていいかも
  else if(ev.targetTouches.length == 0)
  {
    touchHajime = false;
  }
  // これなしでいいかも
  new_box_List[near[0]].setAttribute('color', 'cyan');
}

function move_handler(ev) {
  ev.preventDefault();
  if (!(ev.touches.length === 2 && ev.targetTouches.length === 2)) {
    new_box_List[near[0]].setAttribute('color', 'green');
  }

  // 2 タッチの移動/ピンチ/ズームジェスチャーでは、このイベントをチェックする
  //handle_pinch_zoom(ev);
}

function end_handler(ev) {
  ev.preventDefault();

  if (ev.targetTouches.length === 0) {
    for(let i = 0; i < now_box; i++)
    {
      new_box_List[i].setAttribute('color', 'yellow');
    }
    touchHajime = false;
    
  }
}


////////////////////////////

function clicked()
{
  prefab();
}

//  親オブジェクト動かすか　子オブジェクト動かすか＊２
let changeMode = 0;
function moveObj()
{
  changeMode++;
  if(changeMode >= 3)
  {
    changeMode = 0;
  }

  let changeValue = document.getElementById('b2');
  if(changeMode == 0)
  {
    changeValue.value = "親オブジェクトを移動中";
  }
  else if (changeMode == 1)
  {
    changeValue.value = "土台オブジェクトを移動中";
  }
  else
  {
    changeValue.value = "筒オブジェクトを移動中";
  }
  
  console.log(changeMode);
  
}

function tenka()
{
  console.log("なにもないお");
}

//////////////////////////////////////////////

//target_areaにはなにも意味がない
var target_area = document.createElement('a-plane');
target_area.setAttribute('color', 'red');
target_area.setAttribute('opacity', '0.5');
target_area.setAttribute('position', '0 0 2');
target_area.setAttribute('scale', '0.6 0.6 0.6');
target_area.setAttribute('rotation', '0 180 0');

document.querySelector('a-scene').appendChild(target_area);