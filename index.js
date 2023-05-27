//selecting dom 
const randomColorBtn = document.querySelector('.random-color-create');
const diaplay_color = document.querySelector('.diaplay-color');
const hex_output = document.querySelector('.hex-output');
const rgb_output = document.querySelector('.rgb-output');
const red_slide = document.querySelector('#red-slide');
const green_slide = document.querySelector('#green-slide');
const blue_slide = document.querySelector('#blue-slide');
const red_slide_label = document.querySelector('#label-red');
const green_slide_label = document.querySelector('#label-green');
const blue_slide_label = document.querySelector('#label-blue');
const color_mode_hex = document.querySelector('#color-mode-hex');
const color_mode_rgb = document.querySelector('#color-mode-rgb');
const save_random_color_btn = document.querySelector('#save-random-color-btn');
const copy_clip_btn = document.querySelector('#copy-clip-btn');
const preset_color_boxes = document.querySelector('.preset-color-boxes');
const random_color_boxes = document.querySelector('.random-color-boxes');
const random_color_box = document.querySelector('.random-color-box');
const color_boxes = document.querySelector('.color-boxes');
//background preview section
const bgImagePreview = document.querySelector('.bg-preview');
const bgImageInput = document.querySelector('#bg-image');
const bgImageUploadBtn = document.querySelector('#file-upload-btn');
const bg_file_delete_btn = document.querySelector('#bg-file-delete-btn');

//create random color
function generateRandomColor(){
    const red = Math.floor(Math.random()*256);
    const green = Math.floor(Math.random()*256);
    const blue = Math.floor(Math.random()*256);

    updateColor(red,green,blue);
}

//pass default value
updateColor(195,154,248);
//uodating color
function updateColor(red,green,blue){
    red_slide.value = red;
    green_slide.value = green;
    blue_slide.value = blue;
    red_slide_label.innerHTML = red;
    green_slide_label.innerHTML = green;
    blue_slide_label.innerHTML = blue;
    
    var hex = rgbToHex(red,green,blue);
    var hexCode = `${hex}`;
    var rgbCode = `rgb(${red},${green},${blue})`;
    //update color area background
    diaplay_color.style.backgroundColor = `#${hexCode}`;
    hex_output.value = hexCode.toLocaleUpperCase();
    rgb_output.value = rgbCode; 
}


//rgb to hex color
function rgbToHex(red,green,blue){
    var hex = ((red << 16) | (green << 8) | blue).toString(16).padStart(6, '0')
    return hex;
}

//user hex input on the input box
document.querySelector('.hex-output').addEventListener('keyup',function(e){
    var userHexCode = e.target.value;
    if(userHexCode.length == 6){
        var red = parseInt(userHexCode.slice(0,2),16);
        var green = parseInt(userHexCode.slice(2,4),16);
        var blue = parseInt(userHexCode.slice(4),16);
        updateColor(red,green,blue);
    }

});



// preset color
const preSetColor = [
    'FF7477',
    '9CF6F6',
    '95190C',
    '610345',
    '107E7D',
    '0F0F0F',
    '716969',
    'FBFF12',
    'F6AF65',
    'FB5607',
    '8338EC',
    '6EEB83'
];


//copy code sound
const copy_sound = new Audio('./click sound.mp3');

// user random color
var save_random_color = [];

//user color save on local storage
if(localStorage.getItem('color-data')){
    save_random_color = JSON.parse(localStorage.getItem('color-data'));
}

//call save user color box
createColorBox(save_random_color,random_color_boxes);

//call to create preset color box
createColorBox(preSetColor,preset_color_boxes);

//create a dynamic color element
function createColorBox(colors,parent){
    colors.forEach((color) => {
        var colors = color;
        const color_box = document.createElement('div');
        color_box.classList.add('color-box');
        color_box.setAttribute('data-color',colors);
        color_box.style.backgroundColor = `#${colors}`;
        parent.appendChild(color_box);
    });
}


//remove color box dom element 
function randomColorChildRemove(random_color_boxes){
    let child = random_color_boxes.lastElementChild;
    while(child){
        random_color_boxes.removeChild(child);
        child = random_color_boxes.lastElementChild;
    }
  }

//   show cop message
function copy_toast_message(val){
    var color_code = val;
        copy_sound.play();   
        
        var copy_msg = false;
        if(copy_msg==false){
            var toast_msg = document.createElement('div');
            toast_msg.classList.add('toast-msg');

            toast_msg.innerHTML = `<h3 class='copy-msg'>${color_code}  is copied.</h3>`;
            diaplay_color.appendChild(toast_msg);
            setInterval(()=>{
                toast_msg.remove();
                copy_msg = true;
            },1000)
        }
}



//background imge controller
function bgImageController(){
    var bgSize = document.querySelector('#bg-size').value;
    var bgRepeat = document.querySelector('#bg-repeat').value;
    var bgPosition = document.querySelector('#bg-position').value;
    var bgAttachment = document.querySelector('#bg-attachment').value;

    //preview on the body
    document.querySelector('body').style.backgroundSize = bgSize;
    document.querySelector('body').style.backgroundPosition = bgPosition;
    document.querySelector('body').style.backgroundRepeat = bgRepeat;
    document.querySelector('body').style.backgroundAttachment = bgAttachment;

    //preview on the background image
    bgImagePreview.style.backgroundSize = bgSize;
    bgImagePreview.style.backgroundPosition = bgPosition;
    bgImagePreview.style.backgroundRepeat = bgRepeat;
    bgImagePreview.style.backgroundAttachment = bgAttachment;
}






// =============event handeler ===================

//copy color mode  
copy_clip_btn.addEventListener('click',function(e){
    if(color_mode_hex.checked){
        var hexCode = document.querySelector('.hex-output');
        navigator.clipboard.writeText(hexCode.value)
        //show copy message
        copy_toast_message(hexCode.value);
    }
});


//copy color mode  
copy_clip_btn.addEventListener('click',function(e){
    if(color_mode_rgb.checked){
        var rgbCode = document.querySelector('.rgb-output');
        navigator.clipboard.writeText(rgbCode.value)
        //show copy message
        copy_toast_message(rgbCode.value);
    }
});



//users save color copy button
random_color_boxes.addEventListener('click',function(e){
    var targetedElement = e.target;
    var colors = targetedElement.getAttribute('data-color');
        navigator.clipboard.writeText(colors);
        //show copy message
            if(targetedElement.className == 'color-box'){
                copy_toast_message(colors);
            }
});

//preset color
preset_color_boxes.addEventListener('click',function(e){
    var targetedElement = e.target;
    var colors = targetedElement.getAttribute('data-color');
    navigator.clipboard.writeText(colors);
        if(targetedElement.className == 'color-box'){
            copy_toast_message(colors);
        }
});

//save random color
save_random_color_btn.addEventListener('click',function(){
    var cuurent_hex = document.querySelector('.hex-output').value;

    if(save_random_color.includes(document.querySelector('.hex-output').value)){
        alert('This color already added.')
    }else{
        if(save_random_color.length > 11){
            save_random_color = save_random_color.slice(0,11);
        }
        save_random_color.unshift(cuurent_hex);
        randomColorChildRemove(random_color_boxes);
        //save on local storage
        localStorage.setItem('color-data',JSON.stringify(save_random_color));
        createColorBox(save_random_color,random_color_boxes);
    }
})


//grap range value
red_slide.addEventListener('change',function(){
    var red = red_slide.value;
    var green = green_slide.value;
    var blue = blue_slide.value;
    red_slide_label.innerHTML = red;
    updateColor(parseInt(red),parseInt(green),parseInt(blue));
});
green_slide.addEventListener('change',function(){
    var red = red_slide.value;
    var green = green_slide.value;
    var blue = blue_slide.value;
    green_slide_label.innerHTML = green;
    updateColor(parseInt(red),parseInt(green),parseInt(blue));

});
blue_slide.addEventListener('change',function(){
    var red = red_slide.value;
    var green = green_slide.value;
    var blue = blue_slide.value;
    blue_slide_label.innerHTML = blue;
    updateColor(parseInt(red),parseInt(green),parseInt(blue));
});


//bg image preview section
bgImageUploadBtn.addEventListener('click',function(){
    bgImageInput.click();
});

//change preview backgournd
bgImageInput.addEventListener('change',function(e){
    const bg_image = e.target.files[0];
    const bg_imge_url = URL.createObjectURL(bg_image);
    bgImagePreview.style.background = `url(${bg_imge_url})`;
    document.querySelector('body').style.background = `url(${bg_imge_url})`;
    bg_file_delete_btn.style.display = 'inline';
    document.querySelector('.image-controller').style.display = 'block';
});
bg_file_delete_btn.addEventListener('click',function(){
    bgImagePreview.style.background = '#dad4d4';
    document.querySelector('body').style.background = '#FFFFFF';
    bg_file_delete_btn.style.display = 'none';
    bgImageInput.value = null;
    document.querySelector('.image-controller').style.display = 'none';
});


//background image handeler
document.querySelector('#bg-size').addEventListener('change',bgImageController);
document.querySelector('#bg-repeat').addEventListener('change',bgImageController);
document.querySelector('#bg-position').addEventListener('change',bgImageController);
document.querySelector('#bg-attachment').addEventListener('change',bgImageController);





//generate btn
randomColorBtn.addEventListener('click',generateRandomColor);