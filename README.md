# Draggable and Sortable Grid View
### - A fast-deployed and minimal JS library for creating draggable and sortable grid views


## Main Deployed Site
Checkout a bunch of real-life examples here!

**https://draggable-sortable-grid-view.herokuapp.com/**


## Getting Started

This is an example of how you set up the project in your local machine.

### Prerequisites

* Chrome/Firefox Browser 
  *  HTML5 Draggable Events not natively supported in Safari
* JQuery
  
  Put compressed JQuery JS in html `<script defer>` tag
  ```sh
  <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  ```

### Installation

Below is an instruction of how to set up and use the project to construct your own draggable and sortable grid view.

1. Clone the repo
2. Put grid.js file into the root menu of your project.
3. No extra CSS needed (It is a light weighted JS library)
   
   
<!-- 2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
1. Install NPM packages
   ```sh
   npm install
   ```
2. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ``` -->

<!-- USAGE EXAMPLES -->
## Usage

Some Code Examples and Snippets of The Project
### Initalize the SortableGridGenerator object And Call makeGrid API

 ``` js
  sg = new SortableGridGenerator();
  sg.makeGrids(3,4,"70px","10px", "white","pos1","grid1"); //sameple grid view
 ``` 

### Sample API Calls (setGridBackground etc.)

   ``` js
    sg.setSwappingForSeparateGrids(false); //disable the swapping between grid views
    sg.setDropCloneZone(false); //disable the drop/clone functionality
    sg.setResizeBoundForGrid(0.5,2.0); //set the resize bound for grid
    sg.setGridBackground("grid_1","url('img/kiwi.png')"); //set the background for grid
   ``` 

### Basic Swapping Helper Function
   ``` js
    let temp_grid_1 = $("<div/>");//two temp div to hold the position
    let temp_grid_2 = $("<div/>");

    temp_grid_1.insertBefore(grid_1);//insert the temp divs before the original positions
    temp_grid_2.insertBefore(grid_2);
    grid_1.insertAfter(temp_grid_2);//switch the grid postions by insert the grids interchangeably
    grid_2.insertAfter(temp_grid_1);

    temp_grid_1.remove();//remove the temp grids to finalize the swap
    temp_grid_2.remove();
   ``` 

### Get the Order of Selected Grid View
   ``` js
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
   ```

_please refer to the [Documentation](https://draggable-sortable-grid-view.herokuapp.com/documentation.html) for a complete guide of API usage examples_


<!-- ROADMAP -->
## Roadmap

- [x] Basic swapping for grids
- [x] Reordering when traversing the grids during dragging
- [x] Multi-dimension grids
- [x] Dynamic resizability of grid
- [x] Deletion/Duplication of grid
- [x] Restriction Control across grid views 
- [x] Grid order  

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [JQuery Javascript](https://github.com/jquery/jquery)

