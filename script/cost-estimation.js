
$(function(){
    var roboTypes = {
        "attended" : "Attended Robot",
        "unattended" : "UnAttended Robot",
        "robotmanager" : "Robot Manager"
    };
    
    var complexityWorkFlowMap = {
        "send_receive_mail" : "Receive/Send mail",
        "open_browser_login" : "Open Browser, Login",
        "extract_content_from_page" : "Extract content from one Page",
        "build_excel_CSV_file"	: "Build Excel of CSV File from Data",
        "advance_formating_excel" : "Advance Formating in Excel",
        "log_event" : "Log Event",
        "append_line" : "Append Line",
        "copy_file" : "Copy File",
        "upload_file" : "Upload file",
        "connect_DB_maintain" : "Connect to DB to maintain master data",
        "open_url_browser" : "Open an URL in Browser",
        "access_local_file" : "Access Local File",
        "post_data_SAP" : "Post Data to SAP (Upto 5 Fields in Single Page)",
        "download_file" : "Download file",
        "scrap_web_data": "Scrap web data"
    };

    $("#man-days-efforts").text(getLocalstorage('manDaysEfforts'));
    var minMaxData = getLocalstorage('minMaxAnnualCost');
    var typeAndNumberData = getLocalstorage('typeAndNumberRobots');
    var workflowData = getLocalstorage('selectedWorkflow');
    var selectedWorkFlowObj = getLocalstorage('selectedWorkFlowObj');
    var selectedYes = getLocalstorage('selectedYes');
    if(selectedYes) {
        $("#minCost").text(minMaxData.min);
        $("#maxCost").text(minMaxData.max);
        $("#roboType").text(roboTypes[typeAndNumberData.type]);
        $("#roboNumber").text(typeAndNumberData.number);
        
        $("#roboTypeNumberDiv").show();
        $("#costRangeDiv").show();
    } else {
        $("#roboTypeNumberDiv").hide();
        $("#costRangeDiv").hide();
    }


    var row = '<tr><th>Events</th><th>Frequency</th></tr>';
    for(let i = 0; i < workflowData.length; i++) {
        row += '<tr><td>' + complexityWorkFlowMap[workflowData[i]] + '</td><td>'+ selectedWorkFlowObj[workflowData[i]] +'</td></tr>';
    }
    $("#workFlowBody").html(row);
});

function getLocalstorage(name) {
    var retrieveObject = localStorage.getItem(name);
    return JSON.parse(retrieveObject);
}