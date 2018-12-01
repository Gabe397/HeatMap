const width = 1500;
const height= 3000;


var name = "name";
var rating = "rating";

var cellSize = 40;
var cellLength = 1000;

//Import the CSV File
d3.csv("cereals.csv", function(cereals){

    //data is the array of objects that have name and the rating.
    let data = cereals.map((d)=>{
        return{
            y: d[name],
            x: parseFloat(d[rating])
        };
    });
    //Puts both attributes in separate arrays.
    let cerealName = cereals.map((d)=>{return d[name]});
    let cerealRating = cereals.map((d)=> {return parseFloat(d[rating])});

    //This removes the first object in the data array so that all we have is data.
    data.shift();
    cerealName.shift();
    cerealRating.shift();


    console.log(d3.mean(cerealRating));
    //Make the Axis for the Names
    let svg = d3.select("#axis").attr("height", 3050).attr("width",width);


    let yScale = d3.scaleBand().domain(cerealName).range([0,height]);
    let yAxis = d3.axisLeft().scale(yScale);
    svg.append("g")
        .call(yAxis)
        .attr("transform","translate(150,50)");

    //Make the quality Axis
    let xScale = d3.scaleBand().domain(["Quality (Red = Min, Blue = Max)"]).range([0,1000]);
    let xAxis = d3.axisTop().scale(xScale);
    svg.append("g").call(xAxis).attr("transform","translate(150,48)");



    //Make Color Scale
    let colorScale = d3.scaleLinear().domain([d3.min(cerealRating), d3.max(cerealRating)]).range(["rgb(255,0,0)","rgb(0,0,255)" ]);

    //Make the Cells
    let cell = svg.selectAll("rect").data(data);

    cell.enter().append("g")
                .append("rect")
                .attr("class", "cell")
                .attr("width",cellLength)
                .attr("height",cellSize)
                .attr("y",function(d){return yScale(d.y)})
                .attr("transform","translate(151.8,50)")
                .attr("fill", function(d){return colorScale(d.x)});




});