//全局数据 
let board = new Array(); //方格数字存储
let hasConflicted = new Array(); //4x4方格，判断在每次移动后，每一个数字是否有合并过，合并了就不在合并了
let score = 0;

//手机滑动
let startX = 0; //开始点x
let startY = 0; //开始点y
let endX = 0;//结束点x
let endY = 0;//结束点y

//页面初始化
window.onload = function(){
    initSize()
}

//页面尺寸发生变化 重新初始化
window.onresize = function(){
    initSize()
}

function newGame(){

    //初始化棋盘格
    initGrid()

    // board[0][1]=1024
    // showNumberWithAnimation(0,1,1024)


    //生成随机数字
    generateOneNumber();
    //生成随机数字
    generateOneNumber();

    //初始化分数为0
    score = 0;
}

//初始化16个格子的位置，16个格子，绝对定位
function initGrid(){

    //初始化格子位置
    for(let i = 0; i<4; i++){
        for(let j = 0; j<4; j++){
            let grid_cell = $('#grid-cell-'+i+'-'+j);
            grid_cell.css('top',getPosTop(i,j));
            grid_cell.css('left',getPosLeft(i,j));

        }  
    }

    //初始化board和hasConflicted的数据
    for(let i = 0; i<4; i++){

        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(let j = 0; j<4; j++){
            board[i][j] = 0
            hasConflicted[i][j] = false;
        }  
    }

    updateBoardView();
}

function initSize(){

    documentWidth = window.screen.availWidth;
    if(documentWidth>580){
        gridWidth = 500;
        cellSideLength = 100;
        cellSpace = 20; 
    }
    else{
        gridWidth = documentWidth*0.92;
        cellSideLength = 0.18*documentWidth;
        cellSpace = 0.04*documentWidth; 
    }
    

    $('#grid-container').css('width',gridWidth);
    $('#grid-container').css('height',gridWidth);
    $('#grid-container').css('border-radius',gridWidth*0.02);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',10);

    newGame();

}

//对board里面的数据在棋盘格子里面进行渲染

function updateBoardView(){

    //把所有现有的.number-cell去掉，开始新的渲染
    $('.number-cell').remove();

    //渲染
    for(let i = 0; i<4; i++){
        for(let j = 0; j<4; j++){
            $('#grid-container').append('<div class = "number-cell" id ="number-cell-'+i+'-'+j+'"></div>')
            let theNumberCeil = $('#number-cell-'+i+'-'+j);
            
            //该数字为0， 
            if(board[i][j] ==0){  
                theNumberCeil.css('width','0px');
                theNumberCeil.css('height','0px');
                theNumberCeil.css('top',getPosTop(i,j) + cellSideLength/2);
                theNumberCeil.css('left',getPosLeft(i,j) + cellSideLength/2);
            }
            //不为0
            else{
                if(board[i][j]>=1024){ //大于1024，改变字体大小，太大会溢出
                    theNumberCeil.css('font-size',cellSideLength*0.3); 
                }
                theNumberCeil.css('width',cellSideLength);
                theNumberCeil.css('height',cellSideLength);
                theNumberCeil.css('top',getPosTop(i,j));
                theNumberCeil.css('left',getPosLeft(i,j));
                theNumberCeil.css('background-color',getNumBackGroundColor(board[i][j]));
                theNumberCeil.css('color',getNumColor(board[i][j]));
                theNumberCeil.text( board[i][j] )
                
            }
            hasConflicted[i][j] = false;

        }  
        $('.number-cell').css('font-size',cellSideLength*0.6);
        $('.number-cell').css('line-height',cellSideLength+'px');
    }
}

function updateScore(score){
    $('#score').text(score)
}


//生成一个随机数（2,4）
function generateOneNumber() {

    //没有位置了
    if(!nospace(board)) return false;

    //随机一个位置
    let randomX = parseInt(Math.random() *4)  //[0,1)
    let randomY = parseInt(Math.random() *4)  //[0,1)

    //解决多次随机都找不到空格的问题
    let times = 0
    while(times<50){
        if(board[randomX][randomY] == 0){
            break;
        }
        randomX = parseInt(Math.random() *4)  //[0,1)
        randomY = parseInt(Math.random() *4)  //[0,1)
        times++
    }

    //50次都没有找到，我们就自己手动找
    if(times == 50){
        for(let i = 0; i<4; i++){
            for(let j = 0; j<4; j++){
                if(board[i][j]==0){
                    randomX = i;
                    randomY = j;
                }
            }
        }
    }
    //随机一个数字
    let randomNum = Math.random()<0.5?2:4;


    //在随机位置显示随机数字
    board[randomX][randomY] = randomNum
    showNumberWithAnimation(randomX,randomY,randomNum)


    return true;

}

//电脑键盘按键
$(document).keydown( function(event){
    switch(event.keyCode){
        case 37: //left
            event.preventDefault();   //为了解决在电脑按上下左右键是带来的屏幕滚动

            if( moveLeft() ) { //判断是否可以移动
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 38: //top
            event.preventDefault();

            if( moveTop() ) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39: //right
            event.preventDefault();

            if( moveRight() ) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40: //down
            event.preventDefault();

            if( moveDown() ) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        default:
            break; //else
    }
})

//手机滑动开始
document.addEventListener('touchstart',function(event){
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
})

//禁用掉手机touchmove，说是会阻碍touchstart和touchend
document.addEventListener('touchmove',function(event){
    event.preventDefault();
})

//手机滑动结束
document.addEventListener('touchend',function(event){
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    let distanceX = endX-startX;
    let distanceY = endY-startY;

    if( Math.abs(distanceX) < 0.2*documentWidth && Math.abs(distanceY) < 0.2*documentWidth){
        return
    }

    //x
    if( Math.abs( distanceX ) >= Math.abs( distanceY ) ){
        if( distanceX > 0 ){
            //right
            if( moveRight() ) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }
        else{
            //left
            if( moveLeft() ) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }
    }
    //y
    else{
        if( distanceY > 0 ){
            //dowm
            if( moveDown() ) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }
        else{
            //top
            if( moveTop() ) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }
    }
})


//游戏是否结束
function isGameOver(){
    //没有空位且不可移动
    if(!nospace(board) && noMove(board)){
        gameOver();
    }
}

//游戏结束
function gameOver(){
    //现在是简单些，可以写更多好看的效果
    alert('gameOver');
}

//向左边移动
function moveLeft(){
    
    //如果不能向左边移动，我们直接返回
    if( !canMoveLeft(board) ){ 
        return false
    }
    //moveLeft 对每一个数字都要试一遍，但是最左边一列就不用了，最左边也不能移动了
    for(let i = 0; i<4; i++){
        for(let j = 1; j<4; j++){  //第一列，最左边一列不遍历

            if( board[i][j] != 0 ){ //前提是该数不为0，我们采取判断是都移动他

                //开始检查i行的数字，从左边0到j，
                for(let k = 0; k<j; k++){

                    //如果左边的数字为0，且没有障碍物 ，移动，变化数值
                    if( board[i][k] == 0 && noBlockHorizontalRow(i, j, k, board)){
        
                         //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

            
                        continue;
                    }
                    //如果左边的数字与该数相同，且没有障碍物 ，移动，变化数值，加分，且碰撞叠加后就不再次叠加了
                    else if(board[i][k] == board[i][j] && noBlockHorizontalRow(i, j, k, board) && !hasConflicted[i][k]){

                        //move
                        showMoveAnimation(i, j, i, k);

                        //add
                        board[i][k] += board[i][j]; 
                        board[i][j] = 0;
                        hasConflicted[i][k] = true;

                        //addScore
                        score += board[i][k];
                        updateScore(score);
                        
                        continue;
                    }
                }
            }
        }  
    }

    //更新棋盘格
    setTimeout(()=>{
      updateBoardView()  
    },200)
    

    return true;
}

//向右移动
function moveRight(){
    //判断是否可以向右移动
    if(!canMoveRight(board)){
        return false
    }

    //向右边移动
    for(let i = 0; i<4; i++){
        
        //最右边一列不遍历，已经最右边了，不能移动了。注意：关键点是需要从最右边往最左边开始遍历，一一向右移动
        for(let j = 2; j>=0; j--){  

            //其他逻辑和左移动差不多
            if(board[i][j] !==0){
                for(let k = 3; k>j; k--){ //这里也是从最右边开始，想一下就名mignbai
                    if(board[i][k] == 0 && noBlockHorizontalRow(i, k, j, board)){

                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

            
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontalRow(i, k, j, board) && !hasConflicted[i][k]){

                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[i][k] = true

                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    
    setTimeout(()=>{
        updateBoardView()  
    },200)
    return true
}

//向上移动
function moveTop(){

    //判断是否可以向上移动
    if(!canMoveTop(board)){
        return false
    }

    //移动
    for(let j = 0; j<4; j++){
        for(let i = 1; i<4; i++){ //最上面一栏不需要遍历，本来就是在最顶上，没有可移动的位置了
            //和上面逻辑差不多
            if(board[i][j] != 0){
                for(let k = 0; k<i; k++){

                    if(board[k][j] == 0 && noBlockHorizontalCol(j, i, k,board)){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
        
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockHorizontalCol(j, i, k,board)&& !hasConflicted[k][j]){
                        
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[k][j] = true;

                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    
    setTimeout(()=>{
        updateBoardView()  
    },200)
    return true
}

//向下移动
function moveDown(){
    //判断是否可以移动
    if(!canMoveDown(board)){
        return false
    }
    //移动
    for(let j = 0; j<4; j++){
        //最底部一栏不需要判断，但是注意，这里从底部向上开始遍历，才能一一往下移动
        for(let i = 2; i>=0; i--){ 
            if(board[i][j] != 0){
                for(let k = 3; k>i; k--){ //同理从下往上遍历
                    //其他就是和上面逻辑差不多
                    if(board[k][j] == 0 && noBlockHorizontalCol(j, k, i, board)){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
        
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockHorizontalCol(j, k, i, board)&&!hasConflicted[k][j]){
                        
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[k][j] = true;

                        score += board[k][j];
                        updateScore(score)
                        continue;
                    }
                }
            }
        }
    }
    
    setTimeout(()=>{
        updateBoardView()  
    },200)
    return true
}