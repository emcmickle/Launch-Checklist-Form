// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then( function(json) {
         let randomNumber = Math.floor(Math.random() * json.length);
         let planet = json[randomNumber];
         document.getElementById("missionTarget").innerHTML = 
         `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${planet.name}</li>
            <li>Diameter: ${planet.diameter}</li>
            <li>Star: ${planet.star}</li>
            <li>Distance from Earth: ${planet.distance}</li>
            <li>Number of Moons: ${planet.moons}</li>
         </ol>
         <img src="${planet.image}">`
      });
   });
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      event.preventDefault();  
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      let pilotHasNumber = pilotNameInput.value.match(/\d+/g);
      let copilotNameHasNumber = copilotNameInput.value.match(/\d+/g);
      
      if (pilotNameInput.value === "" || 
         copilotNameInput.value === "" || 
         fuelLevelInput.value === "" || 
         cargoMassInput.value === "") {

         alert("All fields are required!");
         
      } else if(pilotHasNumber || copilotNameHasNumber || 
               isNaN(cargoMassInput.value) ||  isNaN(fuelLevelInput.value)) {
         alert("Make sure to enter valid information for each field");
         
      } else {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} Ready`;
         document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotNameInput.value} Ready`;
         
         if (fuelLevelInput.value < 10000 || cargoMassInput.value > 10000) {
            if(fuelLevelInput.value < 10000) {
               document.getElementById("fuelStatus").innerHTML = "There is not enough fuel for the journey.";
            } 
            if(cargoMassInput.value > 10000) {
               document.getElementById("cargoStatus").innerHTML = "There is too much mass for the shuttle to take off.";
            }
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch.";
            document.getElementById("launchStatus").style.color = "red";
         } else {
            document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch.";
            document.getElementById("launchStatus").style.color = "green";
           
         }
      }
   });

});