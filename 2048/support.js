//支持函数，工具函数

documentWidth = window.screen.availWidth; //屏幕宽度
gridWidth = documentWidth*0.92; //内容区宽度
cellSideLength = 0.18*documentWidth; //小格子宽度
cellSpace = 0.04*documentWidth; //格子间隔


//获取top值
function getPosTop(i,j){
    return i*(cellSideLength+cellSpace)+cellSpace;
}

//获取left值
function getPosLeft(i,j){
    return j*(cellSideLength+cellSpace)+cellSpace;
}

//获取每个数字的背景颜色
function getNumBackGroundColor(number){
    switch(number){
        case 2:return "#eee4da";break;
        case 4:return "rgb(236, 212, 168)";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;

    }
}

//获取数字的颜色
function getNumColor(number){
    if(number<=4){
        return "#776e65";
    }
    return "white"
}

//判断是否还存在没有数字的空格
function nospace(board){
    for(let i = 0; i<4; i++){
        for(let j = 0; j<4; j++){
            if( board[i][j] == 0){
                return true  //有
            }
        }  
    }

    return false;  //没有
}

//判断是否可以左移动
function canMoveLeft(board){
    for(let i = 0; i<4; i++){
        for(let j = 1; j<4; j++){  //最左边一列不用遍历
            if(board[i][j] !==0){ //对每一个有数字的格子进行判断

                //如果这个数字左边是0，或者他和左边的数字相等，就表示他可以移动，这里不做逻辑操作，只是判断
                if(board[i][j-1] == 0 || board[i][j] == board[i][j-1]){
                    return true;
                }
            }
        }  
    }

    return false;
}

//判断是否可以右边移动
function canMoveRight(board){
    for(let i = 0; i<4; i++){
        for(let j = 0; j<3; j++){//最右边一列不用遍历
            if(board[i][j] !==0){//对每一个有数字的格子进行判断

                //如果这个数字右边是0，或者他和右边的数字相等，就表示他可以移动，这里不做逻辑操作，只是判断
                if(board[i][j+1] == 0 || board[i][j] == board[i][j+1]){
                    return true;
                }
            }
        }  
    }

    return false;
}
//判断是否可以上移动
function canMoveTop(board){
    for(let j = 0; j<4; j++){
        for(let i = 1; i<4; i++){//最顶上一栏不做判断
            if(board[i][j] !==0){//对每一个有数字的格子进行判断

                 //如果这个数字上方是0，或者他和上方的数字相等，就表示他可以移动，这里不做逻辑操作，只是判断
                if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
                    return true;
                }
            }
        }  
    }

    return false;
}

//判断是否可以下移动
function canMoveDown(board){
    for(let j = 0; j<4; j++){
        for(let i = 0; i<3; i++){//最底部一栏不做判断
            if(board[i][j] !==0){//对每一个有数字的格子进行判断

                //如果这个数字下方是0，或者他和下方的数字相等，就表示他可以移动，这里不做逻辑操作，只是判断
                if(board[i+1][j] == 0 || board[i][j] == board[i+1][j]){
                    return true;
                }
            }
        }  
    }

    return false;
}


//判断数字与数字之间有没有阻碍物 （针对行）
function noBlockHorizontalRow(row, col1, col2, board){
    for(let i = col2+1; i<col1 ; i++){
        if(board[row][i] !=0){
            return false;
        }
    }
    return true;
}

//判断数字与数字之间有没有阻碍物 （针对列）
function noBlockHorizontalCol(col, row1, row2, board){
    for(let i = row2+1; i<row1; i++){
       
        if(board[i][col] !=0){
            return false;
        }
    }
    return true;
}

//判断是否还可以移动
function noMove(board){

    //利用上面写的几个函数我们可以轻松判断出
    if(canMoveDown(board) || canMoveTop(board) || canMoveLeft(board) || canMoveRight(board)){
        return false  //可以移动
    } 
    return true //不可以移动
}