//图片
var ImagePainter = function (imageUrl) {
    this.image = new Image;
    this.image.src = imageUrl;
 };
 
 ImagePainter.prototype = {
    image: undefined,
 
    paint: function (sprite, context) {
       if (this.image !== undefined) {
          if ( ! this.image.complete) {
             this.image.onload = function (e) {
                sprite.width = this.width;
                sprite.height = this.height;
                
                context.drawImage(this,  // this is image
                   sprite.left, sprite.top,
                   sprite.width, sprite.height);
             };
          }
          else {
            context.drawImage(this.image, sprite.left, sprite.top,
                              sprite.width, sprite.height); 
          }
       }
    }
};

//精灵列表
let SpriteSheetPainter = function(cells,image){
    this.cells = cells||[];
    this.cellIndex = 0;
    this.image = image
}
SpriteSheetPainter.prototype = {
    paint:function(sprite,context){
        let cell = this.cells[this.cellIndex];
        context.drawImage(this.image, cell.left, cell.top,
            cell.width, cell.height,
            sprite.left, sprite.top,
            cell.width, cell.height);
    },
    advance: function () {
        if (this.cellIndex == this.cells.length-1) {
           this.cellIndex = 0;
        }
        else {
           this.cellIndex++;
        }
    },
}


//精灵
let Sprite = function(name, painter,behaviors){
    if(name){this.name = name;}
    if(painter){this.painter = painter;}
    this.left = 0;
    this.top = 0;
    this.width = 0;
    this.height = 0;
    this.velocityX= 0;
    this.velocityY = 0;
    this.visible = true;
    this.animation = false;
    this.behaviors = behaviors || [];

    return this;
}
Sprite.prototype = {
    paint:function(context){
        if(this.painter && this.visible){
            this.painter.paint(this,context)
        }
    },
    update:function(context,time){
        this.behaviors.forEach(item => {
            item.execute(this,context,time)
        });
    }
}