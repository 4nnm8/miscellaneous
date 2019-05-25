// Envie d'imiter un courrier ?

// Retourne la date du jour et la
// la ville de l'utilsateur·ice.
// Si le navigateur ne fournit
// pas le lieu, seule la date
// est retournée.

var a = new Date, 
    b = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"], 
    c = a.getMonth(),
    d = "1" == a.getDate() ? a.getDate() + "<sup>er</sup>" : a.getDate();
	
function error() {
  definir("Le " + d + " " + b[c] + " " + a.getFullYear());
}

navigator.geolocation ? navigator.geolocation.getCurrentPosition(function(f) {
  request = new XMLHttpRequest();
  request.open("GET", "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + f.coords.latitude + "&lon=" + f.coords.longitude + "&zoom=18&addressdetails=1", !0);
  request.onerror = function(){error()};
  request.onload = function() {
    if (200 <= request.status && 400 > request.status) {
      var g = JSON.parse(request.responseText);
      definir("\u00c0 " + g.address.city + ", le " + d + " " + b[c] + " " + a.getFullYear());
    } else {
      error();
    }
  };
  request.send();
}, error(), {enableHighAccuracy:true, timeout:10000, maximumAge:0}) : error();

/************************** USAGE **************************/


function definir(val) { 
	
  // Ne pas appeller cette fonction, qui sera appellée dès que la ville sera identifiée.

  // Instructions à exécuter ici, "val" étant la date et le lieu
  
  document.getElementById("date_et_lieu").textContent = val;
  
}
