// Sortable Grid Generator
sg = new SortableGridGenerator();
sg.setSwappingForSeparateGrids(false);
sg.setDropCloneZone(false);
sg.setResizeBoundForGrid(0.5,2.0);
//demo1
sg.makeGrids(3,4,"70px","10px", "white","pos1","grid1");
sg.setGridBackground("grid_1","url('img/kiwi.png')");
sg.setGridBackground("grid_12","url('img/apex.png')");

sg.makeGrids(3,3,"70px","10px", "white","pos2","grid2");
sg.setGridBackground("grid_13","url('img/kiwi.png')");
sg.setGridBackground("grid_21","url('img/apex.png')");

sg.makeGrids(2,2,"70px","10px", "white","pos3","grid3");
sg.setGridBackground("grid_22","url('img/kiwi.png')");
sg.setGridBackground("grid_25","url('img/apex.png')");


//demo2
sg.makeGrids(1,1,"70px","10px", "white","pos4","grid4");
sg.setGridBackground("grid_26","url('img/kiwi.png')");

//demo3
sg.makeGrids(3,3,"70px","10px", "white","pos5","grid5");
sg.setGridBackground("grid_27","url('img/2k.png')");
sg.setGridBackground("grid_28","url('img/apex.png')");
sg.setGridBackground("grid_29","url('img/mario.png')");
sg.setGridBackground("grid_30","url('img/pubg.png')");
sg.setGridBackground("grid_31","url('img/rs.png')");
sg.setGridBackground("grid_32","url('img/sims.png')");
sg.setGridBackground("grid_33","url('img/sonic.png')");
sg.setGridBackground("grid_34","url('img/tri.png')");
sg.setGridBackground("grid_35","url('img/gar.png')");

//demo4
sg.makeGrids(2,3,"120px","10px", "white","pos6","grid6");
sg.setGridBackground("grid_36","url('img/math.png')");
sg.setGridBackground("grid_37","url('img/psy.png')");
sg.setGridBackground("grid_38","url('img/physics.png')");
sg.setGridBackground("grid_39","url('img/history.png')");
sg.setGridBackground("grid_40","url('img/comp.png')");
sg.setGridBackground("grid_41","url('img/chem.png')");

//demo5
sg.makeGrids(2,2,"100px","10px", "white","pos7","grid7");
sg.setGridBackground("grid_42","url('img/comp.png')");
sg.setGridBackground("grid_45","url('img/chem.png')");
sg.makeGrids(2,2,"100px","10px", "white","pos8","grid8");
sg.setGridBackground("grid_47","url('img/physics.png')");
sg.setGridBackground("grid_48","url('img/history.png')");


// sg.getCurrentGridOrder("grid2");
function sumbitResizingRange(){
    min_ratio = document.getElementById("min").value;
    max_ratio = document.getElementById("max").value;
    if(min_ratio == 1.0 || max_ratio == 1.0){
        alert("resize ratio of 1.0 is invalid");
        return;
    }
    alert("resize has been set");
    sg.setResizeBoundForGrid(min_ratio,max_ratio);
}

function enableDD(){
    if(sg.getDropCloneZone()){
        sg.setDropCloneZone(false);
        alert("drop/clone is disabled");
    }
    else{
        sg.setDropCloneZone(true);
        alert("drop/clone is enabled");
    }  
}

function enableSwap(){
    if(sg.getSwappingForSeparateGrids()){
        sg.setSwappingForSeparateGrids(false);
        alert("Cross-Grid Swapping is disabled");
    }
    else{
        sg.setSwappingForSeparateGrids(true);
        alert("Cross-Grid Swapping is enabled");
    }  
}

function code1() {
    var x = document.getElementById("code1");
    if (x.innerHTML === "") {
      x.innerHTML = "<img src = '../img/code1_html.png' style = 'width:300px; height:200px;'></img> <img src = '../img/code1_js.png' style = 'width:300px; height:300px;'></img> <img src = '../img/code1_css.png' style = 'width:280px; height:250px;'></img>";
    } else {
      x.innerHTML = "";
    }
  }

function code2() {
    var x = document.getElementById("code2");
    if (x.innerHTML === "") {
        x.innerHTML = "<img src = '../img/code2_html.png' style = 'width:350px; height:250px;'></img> <img src = '../img/code2_js.png' style = 'width:320px; height:100px;'></img> <img src = '../img/code2_css.png' style = 'width:250px; height:250px;'></img>";
    } else {
        x.innerHTML = "";
    }
}

function code3() {
    var x = document.getElementById("code3");
    if (x.innerHTML === "") {
        x.innerHTML = "<img src = '../img/code3_html.png' style = 'width:300px; height:200px;'></img> <img src = '../img/code3_js.png' style = 'width:350px; height:200px;'></img>";
    } else {
        x.innerHTML = "";
    }
}

function code4() {
    var x = document.getElementById("code4");
    if (x.innerHTML === "") {
        x.innerHTML = "<img src = '../img/code4_html.png' style = 'width:300px; height:200px;'></img> <img src = '../img/code4_js.png' style = 'width:350px; height:200px;'></img>";
    } else {
        x.innerHTML = "";
    }
}

function code5() {
    var x = document.getElementById("code5");
    if (x.innerHTML === "") {
        x.innerHTML = "<img src = '../img/code5_html.png' style = 'width:300px; height:200px;'></img> <img src = '../img/code5_js.png' style = 'width:350px; height:200px;'></img> <img src = '../img/code5_css.png' style = 'width:300px; height:200px;'></img>";
    } else {
        x.innerHTML = "";
    }
}


