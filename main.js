objects ="";
video = "";
status = "";
function preload()
{
    video = createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();

}

function draw()
{
    image(video , 0 , 0 , 480 , 380);
if( status != "")
{
    objectDetector.detect(video,gotResults);
    for(i = 0; i <objects.length; i++){
        document.getElementById("status").innerHTML = "status object detected";
        document.getElementById("number_of_objects").innerHTML = "number of object detected: "+objects.length; 
      Fill("#fc0808");
      percent = floor(objects[i].confidence*100);
      text(objects[i].label+""+percent+"%", objects[i].x+ 15,objects[i].y + 15);
      noFill();
      stroke("#fc0808");
      rect(objects[i].x , objects[i].y, objects[i].width ,objects[i].height);
    }
}
}

function gotResults(error,results)

{
    if(error){
        console.log(error);

    }
    console.log(results);
    objects = results;
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
}

function modelLoaded(){
    console.log("model Loaded !");
    video.loop();
    video.speed(1);
    video.volume(1);
}

function stop(){
    video.stop();
    document.getElementById("status").innerHTML = "status : stoped  detecting objects";
}

function pause()
{
    document.getElementById("status").innerHTML = "status : paused detecting objects";
    video.pause();
}