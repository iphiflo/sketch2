colour="black";
width=10;

function setup()
{
  canvas= createCanvas(400, 300);
  canvas.center();
  background("white");
  canvas.mouseReleased(classifyCanvas);
  synth=window.speechSynthesis;
}

function clearCanvas()
{
    background("white")
}

function preload()
{
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw()
{
    colour = document.getElementById("color").value;
    width = document.getElementById("width_of_line").value;
    strokeWeight(width);
    stroke(colour);
    if(mouseIsPressed)
    {
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
    
}

function classifyCanvas()
{
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    document.getElementById("label").innerHTML = "label: "+results[0].label;

    document.getElementById("confidence").innerHTML = "Confidence: "+Math.round(results[0].confidence*100)+"%";
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}