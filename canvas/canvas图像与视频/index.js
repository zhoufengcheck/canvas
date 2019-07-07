window.onload = function(){
   var v = document.getElementById("video");

   //   let btn = document.getElementById('btn')
   var c = document.getElementById("myCanvas");
   ctx = c.getContext('2d');
   //每20毫秒画一次图
   v.addEventListener('play', function() {
         var i = window.setInterval(function() {
            ctx.drawImage(v, 0, 0, 270, 202);
            //当视频结束的时候去掉循环
            if(v.ended){
               clearInterval(i)
            }
         }, 20);
   }, false);
   v.addEventListener('canplay',function(){
      v.play()
      console.log(111)  
   })
}
