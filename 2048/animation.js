function showNumberWithAnimation(i, j, randomNum){

    let numberCeil = $('#number-cell-' + i + '-' + j);

    numberCeil.css('background-color',getNumBackGroundColor(randomNum));
    numberCeil.css('color',getNumColor(randomNum));
    numberCeil.text(randomNum )

    numberCeil.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(i,j),
        left:getPosLeft(i,j),
    },50)
}

function showMoveAnimation(fromx, fromy, tox, toy){
    let numberCell = $('#number-cell-'+ fromx + '-' + fromy)
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200)
}

