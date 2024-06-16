let kazu = 0;
if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
    window.addEventListener("load", ()=>{
        const main = document.querySelector("main");
     
        main.addEventListener("touchmove", function(e){
            // 端末のデフォルト動作をキャンセル
            e.preventDefault();
        });



    });
    kazu = 1;
}
