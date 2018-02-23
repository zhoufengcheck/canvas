//动画

//显示一个数字
function showNumberWithAnimation(i, j, randomNum){

    let numberCeil = $('#number-cell-' + i + '-' + j);

    numberCeil.css('background-color',getNumBackGroundColor(randomNum));
    numberCeil.css('color',getNumColor(randomNum));
    numberCeil.text( randomNum );
    
    if(randomNum>=1024){
        numberCeil.css('font-size',cellSideLength*0.3); 
    }

    numberCeil.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(i,j),
        left:getPosLeft(i,j),
    },50)
}

//数字移动
function showMoveAnimation(fromx, fromy, tox, toy){
    let numberCell = $('#number-cell-'+ fromx + '-' + fromy)
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200)
}

