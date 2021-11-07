const ques_pool = {
    1:{question:"The tree which sends down roots from its branches to soil is known as:",options:["Oak","Pine","Banyan","Palm"],answer:"Banyan"},
    2:{question:"Electric bulb filament is made of",options:["Copper","Aluminium","Lead","Tungsten"],answer:"Tungsten"},
    3:{question:"Brass gets discoloured in air because of the presence of which of the following gases in air?",options:["Oxygen","Hydrogen Sulphide","Carbon Dioxide","Palm"],answer:"Hydrogen Sulphide"},
    4:{question:"Which of the following is a non metal that remains liquid at room temperature?",options:["Phosphorous","Bromine","Chlorine","Helium"],answer:"Bromine"},
    5:{question:"Chlorophyll is a naturally occurring chelate compound in which central metal is",options:["Copper","Magnesium","Iron","Calcium"],answer:"Magnesium"},
    6:{question:"Which of the following is used in pencil?",options:["Graphite","Silicon","Charcoal","Phosphorous"],answer:"Graphite"},
    7:{question:"Which of the following metals forms an amalgam with other metals?",options:["Tin","Mercury","Lead","Zinc"],answer:"Mercury"},
    8:{question:"The gas usually filled in the electric bulb is",options:["Nitrogen","Hydrogen","Carbon dioxide","Oxygen"],answer:"Nitrogen"},
    9:{question:"Washing soda is the common name for",options:["Sodium Carbonate","Calcium Bicarbonate","Sodium Bicarbonate","Calcium Carbonate"],answer:"Sodium Carbonate"},
    10:{question:"Quartz crystals normally used in quartz clocks etc. is chemically",options:["Silicon Dioxide","Germanium Oxide","A mixture of Germanium Oxide and Silicon dioxide","Sodium Silicate"],answer:"Silicon Dioxide"},
    11:{question:"Which of the gas is not known as green house gas?",options:["Methane","Nitrous oxide","Carbon dioxide","Hydrogen"],answer:"Hydrogen"},
    12:{question:"Bromine is a",options:["Black Solid","Red Liquid","Colourless Gas","Highly Inflammable Gas"],answer:"Red Liquid"},
    13:{question:"The hardest substance available on earth is",options:["Goal","Iron","Diamond","Platinum"],answer:"Diamond"},
    14:{question:"The variety of coal in which the deposit contains recognizable traces of the original plant material is",options:["Bitumen","Anthracite","Lignite","Peat"],answer:"Peat"},
    15:{question:"Tetraethyl lead is used as",options:["Pain Killer","Fire Extinguisher","Mosquito Repellent","Petrol Additive"],answer:"Petrol Additive"},
    16:{question:"Which of the following is used as lubricant?",options:["Graphite","Silica","Iron oxide","Diamond"],answer:"Graphite"},
    17:{question:"The inert gas which is substituted for nitrogen in the air used by deep sea divers for breathing, is",options:["Argon","Xenon","Helium","Krypton"],answer:"Helium"},
    18:{question:"The gases used in different types of welding would include",options:["Oxygen and Hydrogen","Oxygen, Hydrogen, Acetylene and Nitrogen","Oxygen, Acetylene and Argon","Oxygen and Acetylene"],answer:"Oxygen and Acetylene"},
    19:{question:"The property of a substance to absorb moisture from the air on exposure is called",options:["Osmosis","Deliquescence","Efflorescence","Desiccation"],answer:"Deliquescence"},
    20:{question:"In which of the following activities silicon carbide is used?",options:["Making cement and glass","Disinfecting water of ponds","Cutting very hard substances","Making casts for statues"],answer:"Cutting very hard substances"},
};
var score = 0;
var curr_que_set = [0,0,0,0,0,0,0,0,0,0,];

function makeQueSet(){
    var i = 0 ;
    while( i < 10 ){
        while(true){
            var que = Math.floor((Math.random() * 20) + 1);
            if(!curr_que_set.includes(que)){
                curr_que_set[i]=que;
                i++;
                break;
            }
        }
    }
    addQuestions();
}

var cname = null;
var cemail = null;
const myDivs = ["candidate-credentials","question","instruction","final-result"];

window.addEventListener("load",function(){

    document.getElementById("date").textContent = new Date().toLocaleDateString();
    var settime = setInterval(() => {document.getElementById("time").textContent = new Date().toLocaleTimeString();},1000);

    makeQueSet();

    function validateCredentials(){
        let cname = document.getElementById("name").value;
        let cemail = document.getElementById("email").value;
        if(cname.length>4 && cemail.length>9 && (cemail.includes("@gmail.com") || cemail.includes("@yahoo.com") || cemail.includes("@outlook.com")))
        {
            document.getElementById("submit-cred").disabled=false;
            document.getElementById("submit-cred").style.cursor="pointer";
        }
        else
        {
            document.getElementById("submit-cred").disabled=true;
            document.getElementById("submit-cred").style.cursor="no-drop";
        }
    }

    document.getElementById("name").addEventListener("input",validateCredentials);
    document.getElementById("email").addEventListener("input",validateCredentials);


});

function submitCredentials(){
    cname = document.getElementById("name").value;
    cemail = document.getElementById("email").value;
    for(var div in myDivs){
        if(myDivs[div]=="instruction"){
            document.getElementById(myDivs[div]).style.display="block";
            document.getElementById(myDivs[div]).style.display="flex";
        }
        else
            document.getElementById(myDivs[div]).style.display="none";
    }
}


function addQuestions(){
    var put_question = "";
    for(var i=0; i<10 ;i++){
        put_question+= "<div class='question-grid'>";
        put_question+= "<div class='question-grid-1'>"+(i+1)+"</div>";
        put_question+= "<div class='question-grid-2'>"+ques_pool[curr_que_set[i]].question+"<br>";
        for(var j=0; j<4 ;j++)
            put_question+="<br><input type='radio' value='"+ques_pool[curr_que_set[i]].options[j]+"' name='question"+(i+1)+"'>&emsp;"+ques_pool[curr_que_set[i]].options[j];
        put_question+= "</div></div>";
    }
    put_question+= "<input type='button' value='Final Submit' onclick='finalSubmit()' style='margin:20px; padding:5px; font-size:larger; border: 2px solid green; background-color: yellowgreen; border-radius: 5px'>";
    document.getElementById("question-set").innerHTML = put_question;
}


var timer;
function acceptInstruction(){
    makeQueSet();
    for(var div in myDivs){
        if(myDivs[div]=="question"){
            document.getElementById(myDivs[div]).style.display="block";
            document.getElementById(myDivs[div]).style.display="flex";
        }
        else
            document.getElementById(myDivs[div]).style.display="none";
    }
    initialiseTime();
    timer = setInterval(countdown,1000);
}


function check_answers(){
    for(var i=0 ; i<10 ;i++){
        var ele = document.getElementsByName("question"+(i+1));
        for(j = 0; j < ele.length; j++) {
            if(ele[j].checked && ele[j].value==ques_pool[curr_que_set[i]].answer)
                score++;
        }
    }
}

function finalSubmit(){
    clearInterval(timer);
    document.getElementById("timer").innerHTML = "00:00:00";

    check_answers();

    for(var div in myDivs){
        if(myDivs[div]=="final-result"){
            document.getElementById(myDivs[div]).style.display="flex";
        }
        else
            document.getElementById(myDivs[div]).style.display="none";
    }

    let final_message = "Your Assessment is Successfully Submitted.";
    final_message+="<br><br>";
    final_message+="Dear, "+cname+" your final score is "+score+" out of 10.";
    final_message+="<br><br>";
    final_message+="You can safely close this page."
    document.getElementById("final-result").innerHTML = final_message
}

var start, end;
function initialiseTime(){
    start = new Date();
    end = new Date(start.getTime() + 10*60*1000);
    countdown();
}
function countdown(){
    const curr = new Date();
    var diff = end.getTime() - curr.getTime();
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = hours+":"+minutes+":"+seconds;
    if(diff <= 0){
        finalSubmit();
        document.getElementById("timer").innerHTML = "00:00:00";
    }
}




