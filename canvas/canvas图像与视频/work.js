onmessage = function(event){
    console.log(1111)
    let imageData = event.data
    let data = imageData.data
    let width = imageData.width;
    let length = data.length;
    for (i=0; i < length; ++i) {
        if ((i+1) % 4 != 0) {   
           if ((i+4) % (width*4) == 0) { // last pixel in a row
              data[i] = data[i-4];
              data[i+1] = data[i-3];
              data[i+2] = data[i-2];
              data[i+3] = data[i-1];
              i+=4;
           }
            else {
                data[i] = 2*data[i] - data[i+4] - 0.5*data[i+4];
            }
        }
     }
  
     postMessage(imageData);
}