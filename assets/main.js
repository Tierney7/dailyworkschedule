var jumboDate = moment().format("dddd, MMMM D YYYY");
var currentHour = (moment().format("HH"));
$("#currentDay").text(jumboDate);
console.log(moment().format("MM ddd, YYYY hh:mm:ss a"));
console.log(moment().format("dddd, MMMM D YYYY"));

var newTable = $("<table>");
newTable.addClass("plannerTB");

var scheduleHr = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
var compareHr = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
var localHr = ["0900", "1000", "1100", "1200", "100", "200", "300", "400", "500"];


for (i = 0; i< scheduleHr.length; i++) {
    var newRow = $("<tr>");
    newRow.addClass("row");

    var newHour = $("<td>");
    newHour.addClass("hour");
    newHour.html(scheduleHr[i]);
    
    var newMeetingTD = $("<td>");
    newMeetingTD.addClass("column");
    newMeetingTD.addClass(compareHr[i]);
    newMeetingTD.attr("data-name", compareHr[i]);
    newMeetingTD.html("");
    var newMeetingArea = $("<textarea>");
    newMeetingArea.addClass("textarea " + localHr[i]);
    
    var buttonTd = $("<td>");
    buttonTd.addClass("buttonBox")
    var newBtn = $("<button>");
    newBtn.addClass("saveBtn");
    newBtn.attr("data-name", localHr[i]);
    newBtn.addClass("saveBtn");
    newBtn.html('<i class="fas fa-lock"></i>');

    $(".container").append(newTable);
    newTable.append(newRow);
    newRow.append(newHour, newMeetingTD, buttonTd);
    newMeetingTD.append(newMeetingArea); 
    buttonTd.append(newBtn); 
}

$('.saveBtn').on("click", function(){
    event.preventDefault();
    console.log(this);
    var getId = $(this).data("name"); 
    console.log(getId);
    var meeting = $("." + getId).val();
    console.log("meeting", meeting);
    localStorage.setItem(getId, meeting);
    renderMeetings();
})

function renderMeetings() {
    $("textarea").empty();
    console.log("Render Meetings");
    for (i=0; i < scheduleHr.length; i++){
        var returnMeeting = localStorage.getItem(localHr[i]);
        console.log(returnMeeting);
        $("." + localHr[i] + "").html(returnMeeting);
    }

}
renderMeetings();

$(".column").each(function(){
    var dataName = $(this).attr("data-name");
    var currentTD = "." + dataName;
    if (dataName == currentHour){
        console.log(dataName, currentHour, "red", "future");
        $(currentTD).addClass("present");
    } else if(dataName < currentHour){
        console.log(dataName, currentHour, "grey", "past");
        $(currentTD).addClass("past");
    } else if (dataName > currentHour){
        console.log(dataName, currentHour, "green", "future");
        $(currentTD).addClass("future");
    }
});
