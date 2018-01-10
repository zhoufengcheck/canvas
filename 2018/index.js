let WINDOW_WIDTH = 1000;//屏幕宽度
let WINDOW_HEIGHT = 600; //屏幕高度
let ML = 20; //距离左边的距离
let MT = 50; //距离顶部的位置
let RADIUS = 8; //半径
let cxt = null; //context对象
let balls = []; //跳动的小球
let curTime = null; //现在的时间

//小球color集合
const colors = ["#33B5E5","0099CC","#AA66CC","#9933CC","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function(){ 
    //初始化 一些全局变量
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
    ML = parseInt(WINDOW_WIDTH/10);
    MT = parseInt(WINDOW_HEIGHT/5);
    RADIUS = (WINDOW_WIDTH*4/5/108).toFixed(1)-1;
    initCanvas()
}

//canvas初始化化
function initCanvas(){ 
    let canvas = document.getElementById('canvas');
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    let context = canvas.getContext('2d');

    cxt = context; 
    curTime = new Date(); //存储当前时间
    setInterval(()=>{
        clock.drawDigit();
        bombBall.init()
    },50)
   
}

//整个canvas的绘制
var clock = {

    //准备一些数据去绘制canvas  
    drawDigit(){

        let nowHours = curTime.getHours();
        let nowMinutes = curTime.getMinutes();
        let nowSeconds = curTime.getSeconds();

 
        cxt.clearRect(0,0,canvas.width,canvas.height)

        clock.render(ML, MT, parseInt(nowHours/10))
        clock.render(ML+15*(RADIUS+1), MT, parseInt(nowHours%10))

        clock.render(ML+30*(RADIUS+1), MT, 10)
        clock.render(ML+39*(RADIUS+1), MT, parseInt(nowMinutes/10))
        clock.render(ML+54*(RADIUS+1), MT, parseInt(nowMinutes%10))

        clock.render(ML+69*(RADIUS+1), MT, 10)
        clock.render(ML+78*(RADIUS+1), MT, parseInt(nowSeconds/10))
        clock.render(ML+93*(RADIUS+1), MT, parseInt(nowSeconds%10))     
    },

    //绘制canvas包含小球和时钟
    render (x, y, num) {
        cxt.fillStyle = 'rgb(0,102,153)';
        for(let i = 0; i<digit[num].length; i++){
            for(let j = 0; j<digit[num][i].length; j++){
                if(digit[num][i][j] == 1 ){
                    cxt.beginPath();
                    cxt.arc(
                        x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1),
                        RADIUS, 0, 2*Math.PI
                    )
                    cxt.closePath();
                    cxt.fill()
                }
            }
        }

        for(let i = 0; i<balls.length; i++){
            cxt.fillStyle = balls[i].color;
            cxt.beginPath()
            cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI);
            cxt.closePath();
            cxt.fill();
        }
    },

}

//爆炸小球
var bombBall = {
    //初始化，准备数据，准备生成小球，做时间判断，如果没有超过一秒就不生成小球
    //但是没50毫秒都要更新小球的位置数据，就是updateBalls函数
    init() {
        let nextTime = new Date();
        let nextHours = nextTime.getHours();
        let nextMinutes = nextTime.getMinutes();
        let nextSeconds = nextTime.getSeconds();
        if( nextSeconds != curTime.getSeconds()){
            if(parseInt(nextHours/10) != parseInt(curTime.getHours()/10)){
                bombBall.getBalls(ML, MT, parseInt(curTime.getHours()/10))
                bombBall.getBalls(ML+15*(RADIUS+1), MT, parseInt(curTime.getHours()%10))
            }
            if(parseInt(nextHours%10) != parseInt(curTime.getHours()%10)){
                bombBall.getBalls(ML+15*(RADIUS+1), MT, parseInt(curTime.getHours()%10))
            }
            
            if(parseInt(nextMinutes/10) != parseInt(curTime.getMinutes()/10)){
                bombBall.getBalls(ML+39*(RADIUS+1), MT, parseInt(curTime.getMinutes()/10))
            }
            if(parseInt(nextMinutes%10) != parseInt(curTime.getMinutes()%10)){
                bombBall.getBalls(ML+54*(RADIUS+1), MT, parseInt(curTime.getMinutes()%10))
            }

            if(parseInt(nextSeconds/10) != parseInt(curTime.getSeconds()/10)){
                bombBall.getBalls(ML+78*(RADIUS+1), MT, parseInt(curTime.getSeconds()/10))
               
            }
            if(parseInt(nextSeconds%10) != parseInt(curTime.getSeconds()%10)){
                bombBall.getBalls(ML+93*(RADIUS+1), MT, parseInt(curTime.getSeconds()%10))
               
            }
            curTime = nextTime;
        }
        bombBall.updateBalls()
        
    },
    //生成爆炸小球
    getBalls(x, y, num){
        for(let i = 0; i<digit[num].length; i++){
            for(let j = 0; j<digit[num][i].length; j++){
                if(digit[num][i][j] == 1 ){
                    let ball = {
                        x: x+j*2*(RADIUS+1)+(RADIUS+1), 
                        y: y+i*2*(RADIUS+1)+(RADIUS+1),
                        g: 2,
                        vx: Math.pow( -1, Math.ceil(Math.random()*1000) )*4,
                        vy: -5,
                        color: colors[ Math.floor( Math.random()*colors.length ) ]
                    }
                    balls.push(ball)
                }
            }
        }
    },

    //更新小球数据，并且把已经跳出屏幕的小球去除掉
    updateBalls(){
        for(var i = 0; i < balls.length; i ++){
            balls[i].x += balls[i].vx;
            balls[i].y += balls[i].vy;
            balls[i].vy += balls[i].g;
            if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
                balls[i].y = WINDOW_HEIGHT-RADIUS;
                balls[i].vy = -balls[i].vy*0.5
            }
        }
        let count = 0
        for(var i = 0; i < balls.length; i ++){
           if( balls[i].x< WINDOW_WIDTH-RADIUS && balls[i].x+RADIUS>0){
                balls [count++] = balls[i];
           }
        }
        while(balls.length>Math.min(300,count)){
            balls.pop()
        }
    }
}
