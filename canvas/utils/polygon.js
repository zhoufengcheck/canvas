
//多边形工具
PolygonIdObj = {}
class Polygon {
    constructor(size, centerX,centerY,radius,config={}) {
        let id = Math.random().toString(36).substring(2);
        if(!PolygonIdObj[id]){
            this.id = id
        } 
        this.size = size;
        this.centerX = centerX;
        this.centerY = centerY;
        this.r = radius;
        this.fillStyle = config.fillStyle||'red';
        this.fill = (config.fill!==false&&!config.fill)?true:config.fill;
        this.stroke = (config.stroke!==false&&!config.stroke)?true:config.stroke;
        this.strokeStyle = config.strokeStyle||"#000";
        this.startAngle = config.startAngle||0
        console.log(this)
    }
    drawPolygon(context,justDraw = false) {
        let unit_angle = 360/this.size;
        context.save()
        context.beginPath();
        for(let i = 0; i<=this.size; i++){
            const angle = unit_angle * i + this.startAngle;
            context[i==0?'moveTo':'lineTo'](this.centerX+this.r*Math.cos(angle/180*Math.PI),
                           this.centerY-this.r*Math.sin(angle/180*Math.PI))
        }
     
        if(!justDraw){
            if(this.fill){
                context.fillStyle = this.fillStyle
                context.fill()
            }
            if(this.stroke){
                context.strokeStyle = this.strokeStyle;
                context.stroke()
            }
        }
        context.closePath();
        context.restore();
    }

    getPoints(){
        let points = [];
        let unit_angle = 360/this.size;
        points.push({x:this.centerX+this.r,y:this.centerY})
        for(let i = 1; i<=this.size; i++){
            const angle = unit_angle * i + this.startAngle;
            points.push({x:this.centerX+this.r*Math.cos(angle/180*Math.PI),
                        y:this.centerY-this.r*Math.sin(angle/180*Math.PI)})
        }
        return points;
     }

}