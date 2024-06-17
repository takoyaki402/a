
//let near = head.src.near;
let new_box_List = [];

let scene = document.querySelector('a-scene');

// ray衝突用のa-plane
var target = document.getElementById('target');
// カーソルのポジション
var pos = target.getAttribute('position');

let now_box = 0;
function prefab()
{
  // 動かすオブジェクト
  var new_box = document.createElement('a-box');
  new_box.setAttribute('color', 'yellow');
  new_box_List.push(new_box);
  scene.appendChild(new_box_List[now_box]);
  now_box = now_box + 1;
  console.log(now_box);
}
// 最初のbox生成
prefab();

prefab();
new_box_List[1].setAttribute('position', '1 0 -2');

/*
let new_entity = document.createElement('a-entity');
new_entity.setAttribute('position', '0 0 0');
new_entity.setAttribute('color', 'red');
scene.appendChild(new_entity);
*/

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
  // 2タッチピンチ/ズームを後で処理するためにタッチ点をキャッシュする
  if (ev.targetTouches.length == 2) {
    for (let i = 0; i < ev.targetTouches.length; i++) {
      tpCache.push(ev.targetTouches[i]);
    }
  }   
  new_box_List[near[0]].setAttribute('color', 'cyan');
}

function move_handler(ev) {
  ev.preventDefault();
  if (!(ev.touches.length === 2 && ev.targetTouches.length === 2)) {
    new_box_List[near[0]].setAttribute('color', 'green');
  }

  // 2 タッチの移動/ピンチ/ズームジェスチャーでは、このイベントをチェックする
  handle_pinch_zoom(ev);
}

function end_handler(ev) {
  ev.preventDefault();

  if (ev.targetTouches.length === 0) {
    new_box_List[near[0]].setAttribute('color', 'yellow');
  }
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