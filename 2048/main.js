let board = new Array();
let hasConflicted = new Array();
let score = 0;

let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;


window.onload = function(){
    initSize()
}
window.onresize = function(){
    initSize()
}

function newGame(){

    //初始化棋盘格
    initGrid()

    // //生成随机数字
    generateOneNumber();
    //生成随机数字
    generateOneNumber();

    score = 0;
}


function initGrid(){
    for(let i = 0; i<4; i++){
        for(let j = 0; j<4; j++){
            let grid_cell = $('#grid-cell-'+i+'-'+j);
            grid_cell.css('top',getPosTop(i,j));
            grid_cell.css('left',getPosLeft(i,j));

        }  
    }

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

function updateBoardView(){
    $('.number-cell').remove();
    for(let i = 0; i<4; i++){
        for(let j = 0; j<4; j++){
            $('#grid-container').append('<div class = "number-cell" id ="number-cell-'+i+'-'+j+'"></div>')
            let theNumberCeil = $('#number-cell-'+i+'-'+j);
            
            if(board[i][j] ==0){
                theNumberCeil.css('width','0px');
                theNumberCeil.css('height','0px');
                theNumberCeil.css('top',getPosTop(i,j) + cellSideLength/2);
                theNumberCeil.css('left',getPosLeft(i,j) + cellSideLength/2);
            }
            else{
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

    if(!nospace(board)) return false;

    //随机一个位置
    let randomX = parseInt(Math.random() *4)  //[0,1)
    let randomY = parseInt(Math.random() *4)  //[0,1)

    let times = 0
    while(times<50){
        if(board[randomX][randomY] == 0){
            break;
        }
        randomX = parseInt(Math.random() *4)  //[0,1)
        randomY = parseInt(Math.random() *4)  //[0,1)
        times++
    }

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

$(document).keydown( function(event){
    switch(event.keyCode){
        case 37: //left
            event.preventDefault();
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
document.addEventListener('touchstart',function(event){
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
})
document.addEventListener('touchmove',function(event){
    event.preventDefault();
})

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

function isGameOver(){
    if(!nospace(board) && noMove(board)){
        gameOver();
    }
}
function gameOver(){
    alert('gameOver');
}

function moveLeft(){
    if( !canMoveLeft(board) ){
        return false
    }
    //moveLeft
    for(let i = 0; i<4; i++){
        for(let j = 1; j<4; j++){

            if( board[i][j] != 0 ){
                for(let k = 0; k<j; k++){
                    if( board[i][k] == 0 && noBlockHorizontalRow(i, j, k, board)){
        
                         //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

            
                        continue;
                    }
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

    setTimeout(()=>{
      updateBoardView()  
    },200)
    

    return true;
}


function moveRight(){
    if(!canMoveRight(board)){
        return false
    }

    for(let i = 0; i<4; i++){
        for(let j = 2; j>=0; j--){

            if(board[i][j] !==0){
                for(let k = 3; k>j; k--){
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

function moveTop(){
    if(!canMoveTop(board)){
        return false
    }

    for(let j = 0; j<4; j++){
        for(let i = 1; i<4; i++){

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

function moveDown(){
    if(!canMoveDown(board)){
        return false
    }

    for(let j = 0; j<4; j++){
        for(let i = 2; i>=0; i--){
            if(board[i][j] != 0){
                for(let k = 3; k>i; k--){

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