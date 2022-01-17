"use strict";

(function(global, document, $) { 
	let log = console.log;
	function SortableGridGenerator() {
		this.grids = [];
		this.grids_id = [];
		this.total_girds_id = {};
		this.grid_dim = []; 
		this.total_girds_dim = {};
		this.grid_size = null;
		this.grid_name = "";
		
	}

	//private properties and functions
	let current_and_prev_grids = [-1,-1]; //check the inital and end grid
	let last_grid = null; //keep track of last grid
	let global_grid_size = 0; //the original grid size in "px"
	let enter_drop_zone = false; 
	let enter_clone_zone = false;
	let setSwappingForSepGrids = true;
	let setDropCLoneZoneForGrids = true;
	let min_ratio = 0;
	let max_ratio = 0;

	function dragListener(grid, grid_obj) {
		grid.addEventListener("dragstart", function( event ) {
			//set the first position
			current_and_prev_grids[0] = event.target.id.split("_").at(-1);
		}, false);

		grid.addEventListener("dragend", function( event ) {
			//handling case with delete zone
			if(enter_drop_zone){
				let this_grids = $(grid_obj)[0];
				const remove_index = this_grids.grids.indexOf(event.target);
				if(remove_index > -1){
					//update the private properties
					this_grids.grids.splice(remove_index,1);
					this_grids.grids_id.splice(remove_index,1);
				}
				event.target.remove();
				enter_drop_zone = false;//reset the flag
				return;
			}
			//handling case with clone zone
			if(enter_clone_zone){
				let this_grids = $(grid_obj)[0];
				let grid_length = this_grids.grids.length;
				$("#resizable_tag").remove(); //force delete the resizable tag
				let clone_grid = event.target.cloneNode(true);
				clone_grid.id = "grid_" + String(grid_length+ 1);
				
				//update the private properties
				this_grids.grids.push(clone_grid);
				this_grids.grids_id.push(clone_grid.id);

				event.target.parentNode.appendChild(clone_grid);

				//adds listeners to the newly-created grid
				mouseListener(clone_grid,clone_grid.id);
				dragListener(clone_grid, grid_obj);
				enter_clone_zone = false;//reset the flag
				return;
			}
			current_and_prev_grids[1] = last_grid;
			if(!current_and_prev_grids.includes(-1) & !current_and_prev_grids.includes(null)){
				gridSwapper(current_and_prev_grids[0],current_and_prev_grids[1]);
			}
			//reset the helper values
			last_grid = null;
			for(let i = 0; i < current_and_prev_grids.length;i++){
				current_and_prev_grids[i] = -1;
			}
			event.preventDefault();
		}, false);

		grid.addEventListener("dragenter", function( event ) {
			if(current_and_prev_grids[0] != event.target.id.split("_").at(-1) & current_and_prev_grids[0] != event.target.parentNode.id.split("_").at(-1)){
				if(event.target.id == "resizable_tag"){
					last_grid = event.target.parentNode.id.split("_").at(-1);//find the parent grid of tag
					gridSwapper(String(current_and_prev_grids[0]),event.target.parentNode.id.split("_").at(-1));
				}
				else{
					last_grid = event.target.id.split("_").at(-1);//record the last traversed grid
					gridSwapper(String(current_and_prev_grids[0]),event.target.id.split("_").at(-1));
				}
			}
			event.target.style.opacity = 0.5;
			event.preventDefault();
		}, false);

		grid.addEventListener("dragleave", function( event ) {
			if(last_grid!=null & event.target.id.split("_").at(-1)==current_and_prev_grids[0]){
				gridSwapper(last_grid,String(current_and_prev_grids[0]));
			}
			event.target.style.opacity = 1;
			event.preventDefault();
		}, false);
	}

	//mouse listener for dynamic resizable tags
	function mouseListener(grid,grid_id){
		grid.addEventListener('mouseenter', e => {
			addResizableTag(grid_id);
		});
		
		grid.addEventListener('mouseleave', e => {
			removeResizableTag(grid_id);
		});
	}
	
	//mouse listener for resizing the grid
	function resizeMouseListener(){
		let tag = document.getElementById("resizable_tag");
		let parent_grid = tag.parentNode;
		tag.addEventListener("mousedown", function(event){
			document.addEventListener("mousemove",resize_handler);
			document.parentGrid = parent_grid;
			event.preventDefault();
		});
		document.addEventListener("mouseup", function(event_2){
			document.removeEventListener("mousemove",resize_handler);
		});
	}
	//resizing handler for resizing the grid
	function resize_handler(event){
		let parent_grid = event.currentTarget.parentGrid;
		if(event.movementX != null & event.movementY != null){
			let global_size = parseInt(global_grid_size.substring(0,global_grid_size.length - 2));
			let changedWidth =  parent_grid.clientWidth + event.movementX;
			let changedHeight = parent_grid.clientHeight + event.movementY;
			if(changedWidth >= global_size*min_ratio & changedHeight >= global_size*min_ratio & changedWidth <= global_size*max_ratio & changedHeight <= global_size*max_ratio){
				parent_grid.style.width = String(changedWidth) + "px";
				parent_grid.style.height = String(changedHeight) + "px";
			}
		}
	}

	//add and delete resizable tag to create dynamic motion
	function addResizableTag(grid_id){
		let grid = $('#'+grid_id);
		grid.append('<img id = "resizable_tag" draggable="false" src = "img/maximize.png" height="15px" width="15px" style="position:absolute;bottom:0px;right:0px;"></img>');
		resizeMouseListener(); //add listener to the grid-belonged tag, 
	}

	function removeResizableTag(grid_id){
		let tag = $("#resizable_tag");
		if(tag.parent().attr("id") == grid_id){
			tag.remove();
		}
	}

	//drag listener for entering the delete zone
	function deleteZoneListener(delete_zone){
		delete_zone.addEventListener("dragenter", function( event ) {
			event.target.style.opacity = 0.7;
			enter_drop_zone = true;
			enter_clone_zone = false;
			event.preventDefault();
		}, false);
		delete_zone.addEventListener("dragleave", function( event ) {
			event.target.style.opacity = 1;
			setTimeout(function() {
				enter_drop_zone = false;
			}, 800);
			event.preventDefault();
		}, false);
	}

	//drag listener for entering the clone zone
	function cloneZoneListener(clone_zone){
		clone_zone.addEventListener("dragenter", function( event ) {
			event.target.style.opacity = 0.7;
			enter_clone_zone = true;
			enter_drop_zone = false;
			event.preventDefault();
		}, false);
		clone_zone.addEventListener("dragleave", function( event ) {
			event.target.style.opacity = 1;
			setTimeout(function() {
				enter_clone_zone = false;
			}, 800);
			event.preventDefault();
		}, false);
	}

	//swap the grid order in the grid view
	function gridSwapper(grid_id_1, grid_id_2){
		if(grid_id_1 == "tag" || grid_id_2 == "tag"){
			return;
		}
		let grid_1 = $('#grid_'+ grid_id_1);//get the swapping grid elements
		let grid_2 =  $('#grid_'+ grid_id_2);
		if(!setSwappingForSepGrids){ //see if two grid can be swapped
			if(grid_1.parents()[2] != grid_2.parents()[2]){
				return;
			}
		}

		let temp_grid_1 = $("<div/>");//two temp div to hold the position
		let temp_grid_2 = $("<div/>");

		temp_grid_1.insertBefore(grid_1);//insert the temp divs before the original positions
		temp_grid_2.insertBefore(grid_2);
		grid_1.insertAfter(temp_grid_2);//switch the grid postions by insert the grids interchangeably
		grid_2.insertAfter(temp_grid_1);
		

		temp_grid_1.remove();//remove the temp grids to finalize the swap
		temp_grid_2.remove();
	}

	SortableGridGenerator.prototype = {
		
		makeGrids: function(grid_size_x, grid_size_y, grid_size, grid_margin, grid_background_color, target_div_id, grid_name) {
			const body = $("#"+target_div_id);
			global_grid_size = grid_size;//assign the global grid size value
			//default style block
			const grid_style = 'position:relative; margin:'+grid_margin+'; background-color:'+grid_background_color+';text-align: center; vertical-align: middle; line-height:80px; font-size: 30px;';
			const delete_zone_style = "height:100px; background-color:rgb(237,115,103); line-height:100px; text-align:center;"
			const clone_zone_style = "height:100px; background-color:rgb(134,190,116); line-height:100px; text-align:center;"
			const row_container_style = 'display: flex; flex-direction: row;';
			const grid_container_style = 'width:`auto`';

			//declare the delete zone
			const delete_zone = document.createElement('div');
			delete_zone.id = "drop";
			delete_zone.className = "drop_zone";
			delete_zone.style = delete_zone_style;
			delete_zone.innerText = "Drop Here To Delete";

			deleteZoneListener(delete_zone); //add delete zone listener

			//declare the clone zone
			const clone_zone = document.createElement('div');
			clone_zone.id = "clone";
			clone_zone.className = "clone_zone";
			clone_zone.style = clone_zone_style;
			clone_zone.innerText = "Drop Here To Clone";

			cloneZoneListener(clone_zone); //add clone zone listener

			//delcare the grid container
			const grid_container = document.createElement('div');
			grid_container.addEventListener("dragleave", function( event ) {
				if(body.find('.drop_zone').length==0 & setDropCLoneZoneForGrids){
					body.append(delete_zone);
					body.append(clone_zone);
				}
				event.preventDefault();
			}, false);
			grid_container.addEventListener("dragend", function( event ) {
				$('.drop_zone').remove();
				$('.clone_zone').remove();
				event.preventDefault();
			}, false);
			grid_container.style = grid_container_style;

			//main block for creating grids
			this.grid_dim = [grid_size_y, grid_size_x];

			let temp_grids_id = [];
			let temp_grids_dim = [grid_size_y, grid_size_x];
			for (let i = 0; i < grid_size_x; i++) {
				const row_container = document.createElement('div');
				row_container.style = row_container_style;
				for(let j = 0; j < grid_size_y; j++) {
					//declare each grid
					const grid = document.createElement('div');
					grid.style = grid_style;
					grid.style.height = grid_size;
					grid.style.width = grid_size;
					
					grid.setAttribute('draggable','true');
					grid.id = "grid_" + String(this.grids.length + 1);
					// grid.innerHTML += String(this.grids.length + 1);

					//setting up the private properties
					this.grid_size = grid_size;
					this.grids.push(grid);
					this.grids_id.push(grid.id);

					//add listeners to each grid
					dragListener(grid,this);
					mouseListener(grid,grid.id);
					row_container.appendChild(grid);

					//update the grids id info
					temp_grids_id.push(grid.id);
					
				}
				grid_container.append(row_container);
			}
			body.append(grid_container);
			this.grid_name = grid_name;
			this.total_girds_id[grid_name] = temp_grids_id;
			this.total_girds_dim[grid_name] = temp_grids_dim;
		},

		setGridBackground: function(grid_id, image_src){
			const target = $("#"+grid_id);
			target.html("");
			target.css("resize","both");
			target.css("background-repeat","no-repeat");
			target.css("background-image",image_src);
			target.css("background-size", "100% auto");
		},

		setSwappingForSeparateGrids: function(if_set){
			setSwappingForSepGrids = if_set;
		},

		getSwappingForSeparateGrids: function(){
			return setSwappingForSepGrids;
		},

		setResizeBoundForGrid: function(min_rat,max_rat){
			min_ratio = min_rat;
			max_ratio = max_rat
		},

		getResizeBoundForGrid: function(){
			return [min_ratio,max_ratio];
		},

		setDropCloneZone: function(if_set){
			setDropCLoneZoneForGrids = if_set;
		},

		getDropCloneZone: function(){
			return setDropCLoneZoneForGrids;
		},

		getCurrentGridOrder: function(grid_name){
			let totalGridOrder = []; //Set the container of grid order list
			let x_start = 0;
			let dim_x = this.total_girds_dim[grid_name][0]; //get the grid dimension
			let dim_y = this.total_girds_dim[grid_name][1];
			for(let i = 0; i < dim_y; i++){
				let rowGridOrder = [];
				for(let j = x_start; j < x_start+dim_x; j++){
					rowGridOrder.push(this.grids_id[j]);//push the grid id into container row
				}
				x_start+=dim_x;
				totalGridOrder.push(rowGridOrder); //push the grid id into container column
			}
			return totalGridOrder;
		}
	}
	// Add the sortable grid generator to the window object if it doesn't already exist.
	global.SortableGridGenerator = global.SortableGridGenerator || SortableGridGenerator
})(window, window.document, $); 

