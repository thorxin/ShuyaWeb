/**
 * 
 * @param {*} url 
 * @param {*} callback 
 * @param {*} outputFormat 
 */
 export default function convertImgToBase64URL(url, callback, outputFormat) {
    let img = new Image();
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL(outputFormat);
        callback.call(this, dataURL);
        canvas = null;
    }
    img.src = url;
}