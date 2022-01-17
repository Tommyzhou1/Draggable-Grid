# Draggable and Sortable Grid View Documentation
### - A fast-deployed and minimal JS library for creating draggable and sortable grid views


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

## API

### makeGrids
create and initialize the grid view with customizable style at the given position

* Parameters
  *  `grid_size_x` (horizontal dimension of grid view) ``[Numerical Value]``
  *  `grid_size_y` (vertical dimension of grid view) ``[Numerical Value]``
  *  `grid_size` (size of each grid) ``[Pixel Value]``
  *  `grid_margin` (margin of each grid) ``[Pixel Value]``
  *  `grid_background_color` (background color of each grid) ``[CSS Color Code]``
  *  `target_div_id` (the div you want to place the grid view) ``[div id]``
  *  `grid_name` (the name you want to call the grid view) ``[String]``
* Return value
  *  NULL
* The function will generate a draggable and sortable grid view based on user's preference and can be located based on user's input.

   
### setGridBackground
set the background to a user-specified grid in the grid view

* Parameters
  *  `grid_id` (the id of grid div in the dom) ``[grid div id]``
  *  `img_src` (the path of given source image) ``[url('the path of the source image')]``
* Return value
  *  NULL
* The function will set the background of user-specified grid based on user's input image

### setSwappingForSeparateGrids
enable/disable swapping and reordering between two different grid views

* Parameters
  *  `if_set` (the flag) ``[boolean value]``
* Return value
  *  NULL
* The function will set the ``setSwappingForSepGrids`` flag to apply restrictions for two different grid views to conduct swapping/reordering actions.

### getSwappingForSeparateGrids
get the status of swapping and reordering functionality (if enabled)between two different grid views

* Parameters
  * NULL
* Return value
  *  `setSwappingForSepGrids` (the flag) ``[boolean value]``
  
* The function will get the ``setSwappingForSepGrids`` flag status for applying restrictions for two different grid views to conduct swapping/reordering actions.

### setResizeBoundForGrid
set the lowest and highest resizing ratio for the entire grid view

* Parameters
  *  `min_rat` (the minimal resizing ratio) ``[decimal value]``
  *  `max_rat` (the maximal resizing ratio) ``[decimal value]``
* Return value
  *  NULL
* The function will set the resizing range of each grid in the entire grid view when performing resizing actions.

### getResizeBoundForGrid
get the lowest and highest resizing ratio for the entire grid view

* Parameters
  *  NULL
* Return value
  *  `[min_ratio,max_ratio]` (the minimal and maximal resizing ratio) ``[two-element list]``
* The function will get the current resizing ratio for the grid, it will be supplied in a two-element list format with minimal ratio in the first position and maximal ratio in the second position respectively.

### setDropCloneZone
enable/disable the drop and clone zone for the grid to delete and duplicate respectively

* Parameters
  *  `if_set` (the flag) ``[boolean value]``
* Return value
  *  NULL
* The function will set the ``setDropCLoneZoneForGrids`` flag to apply functionality with deleting and cloning grid element in a dynamic way.


### getDropCloneZone
get the status of the drop and clone zone functionality (if enabled).

* Parameters
  *  NULL
* Return value
  *  `setDropCLoneZoneForGrids` (the flag) ``[boolean value]``
* The function will get the ``setSwappingForSepGrids`` flag to apply restrictions for two different grid views to conduct swapping/reordering actions.
* Sample Usage Diagram of Drop/Clone Zone
  
### getCurrentGridOrder
get the internal order of user-specified grid view 

* Parameters
  *  `grid_name` (the name user called the grid view in `makeGrid`) ``[String]``
* Return value
  *  The grid order (the internal grid order of selected grid view based on grid_id) ``[in a 2D nested list]``
* The function will get the grid order of user-specified grid view in a 2D nested list.


