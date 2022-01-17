sg = new SortableGridGenerator();
sg.makeGrids(1,4,"80px","10px", "white","showcase","grid1");
sg.setGridBackground("grid_1","url('../img/2k.png')");
sg.setGridBackground("grid_2","url('../img/apex.png')");
sg.setGridBackground("grid_3","url('../img/gar.png')");
sg.setGridBackground("grid_4","url('../img/pubg.png')");
sg.setResizeBoundForGrid(0.5,2.0);
sg.setDropCloneZone(false);