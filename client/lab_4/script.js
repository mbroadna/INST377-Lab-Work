var current_slide = 0;

function update_slides(){
    var children = document.querySelectorAll(".carousel-item");
    console.log(children);
    for(var i = 0; i < children.length; i++){
        children[i].classList.add("invisible");
        children[i].classList.remove("visible");
    }
    children[current_slide].classList.remove("invisible");
    children[current_slide].classList.add("visible");
}

function previous_slide(){
    current_slide--;
    if (current_slide < 0){
        current_slide = 4;
    }
    update_slides();
}

function next_slide(){
    current_slide++;
    if (current_slide > 4){
        current_slide = 0;
    }
    update_slides();
}


window.onload = function(){
    document.querySelector("#slidePrev").addEventListener("click", previous_slide);
    document.querySelector("#slideNext").addEventListener("click", next_slide);
}



