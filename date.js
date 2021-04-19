// module.exports = Day;

module.exports.Day = function Day(){
var today = new Date();
var CurrentDay = today.getDay();
var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
}
return today.toLocaleDateString("en-US", options);
}


module.exports.getDate = function getDate(){
    var today = new Date();
    var CurrentDay = today.getDay();
    var options = {
        weekday: "long",
    }
    return today.toLocaleDateString("en-US", options);
    }