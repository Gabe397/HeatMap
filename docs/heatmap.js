const width = 800;
const height= 500;


var name = "name";
var rating = "rating";

//Import the CSV File
d3.csv("cereals.csv", function(cereals){

    //data is the array of objects that have name and the rating.
    let data = cereals.map((d)=>{
        return{
            x: d[name],
            y: parseInt(d[rating])
        };
    })

    //This removes the first object in the data array so that all we have is data.
    data.shift();

    
    console.log(data[0]);
});