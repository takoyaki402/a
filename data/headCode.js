let near = [];

//  これないと　モードチェンジで　オブジェクトが　テレポートする
let touchHajime = false;

//コンポーネントの追加
AFRAME.registerComponent('cursor-listener', {
    init: function () {
        this.el.addEventListener('raycaster-intersected', evt => {
	   		this.raycaster = evt.detail.el;

	   	});
	   	this.el.addEventListener('raycaster-intersected-cleared', evt => {
	   		this.raycaster = null;

	   	});
	},

	// 毎フレームの処理
	tick: function () {
		if (!this.raycaster) { return; }  // Not intersecting.
					
		let intersection = this.raycaster.components.raycaster.getIntersection(this.el).point;
		if (!intersection) { return; } // Not intersecting

        

	  	// 箱の座標を衝突点にセット
        let saX;
        let saY;
        // いるかな？ 必要になった
        let saZ;
        //  0 = nearNum  100 = nearRange
        let range;
        near = [0, 100];

        // 最も近いオブジェクトはどれか
        for(let i = 0; i < now_box; i++)
        {

            saX = intersection.x - new_box_List[i].getAttribute('position').x;
            saZ = intersection.z - new_box_List[i].getAttribute('position').z;

            saX = saX * saX;
            saZ = saZ * saZ;
            range = Math.sqrt(saX + saZ);
            if(range < near[1])
            {
                near[0] = i;
                near[1] = range;
                //console.log(near);	
            }
                                
        }		

        if(touchHajime)
        {  
            console.log("反応したよ");

            new_box_List[near[0]].setAttribute('position', intersection);
            new_box_List[near[0]].setAttribute('rotation', cam.getAttribute('rotation'));

        }
        

		//new_box_List[near[0]].setAttribute('position', intersection);
		//new_box_List[near[0]].setAttribute('rotation', cam.getAttribute('rotation'));
        
        
		//console.log(document.getElementById('target').getAttribute('position'));
		//console.log(new_box);
		// new_box.setAttribute('position', intersection);
		// new_box.setAttribute('rotation', cam.getAttribute('rotation'));

		// オブジェクトの座標
		//console.log(new_box_List[near[0]].getAttribute('position'));
	}
});
