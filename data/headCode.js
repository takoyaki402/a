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
        // いるかな？
        let saZ;
        //  0 = nearNum  100 = nearRange
        let range;
        near = [0, 100];

        // 最も近いオブジェクトはどれか
        for(let i = 0; i < now_box; i++)
        {
            if(changeMode == 0)
            {
                saX = intersection.x - new_box_List[i].getAttribute('position').x;
                saZ = intersection.z - new_box_List[i].getAttribute('position').z;
            }
            else if(changeMode == 1)
            {
                saX = intersection.x - new_box_List[i].firstElementChild.getAttribute('position').x;
                saZ = intersection.z - new_box_List[i].firstElementChild.getAttribute('position').z;
            }
            else
            {
                saX = intersection.x - new_box_List[i].lastElementChild.getAttribute('position').x;
                saZ = intersection.z - new_box_List[i].lastElementChild.getAttribute('position').z;
            }
            //console.log(saX);
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

        /*
        let z = ( window_size[1] - touch_pos[1] ) / window_size[1] * max_z;
        console.log(cam.getAttribute('roration'));
        */
        if(touchHajime)
        {  
            console.log("反応したよ");
            //console.log(z);
            if(changeMode == 0)
            {
                //new_box_List[near[0]].setAttribute('position', intersection.x + ' ' + (-5) + ' ' + ((-intersection.y - 10) * 2));
                // new_box_List[near[0]].setAttribute('position', intersection.x + ' ' + (-1.6) + ' ' + z);
                new_box_List[near[0]].setAttribute('position', intersection);
                new_box_List[near[0]].setAttribute('rotation', cam.getAttribute('rotation'));
            }
            else if(changeMode == 1)
            {
                //new_box_List[near[0]].firstElementChild.setAttribute('position', intersection.x + ' ' + (-5) + ' ' + ((-intersection.y - 10) * 2));
                // new_box_List[near[0]].firstElementChild.setAttribute('position', intersection.x + ' ' + (-1.6) + ' ' + z);
                new_box_List[near[0]].firstElementChild.setAttribute('position', intersection);
                new_box_List[near[0]].firstElementChild.setAttribute('rotation', cam.getAttribute('rotation'));
            }
            else
            {
                //new_box_List[near[0]].lastElementChild.setAttribute('position', intersection.x + ' ' + (-5) + ' ' + ((-intersection.y - 10) * 2));
                // new_box_List[near[0]].lastElementChild.setAttribute('position', intersection.x + ' ' + (-1.6) + ' ' + z);
                new_box_List[near[0]].lastElementChild.setAttribute('position', intersection);
                new_box_List[near[0]].lastElementChild.setAttribute('rotation', cam.getAttribute('rotation'));
            }
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
