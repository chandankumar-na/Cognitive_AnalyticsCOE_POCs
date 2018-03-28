var express = require('express');
var request = require("request");
var appRouter = express.Router();
var xlsx = require('excel');
var input_details = require("./input_object.js");
var excel_details;
var data_response = []
var mlist = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var month_name = function (dt) {
    return mlist[dt.getMonth()];
};

//dsm_api
appRouter.route('/dsm_api')
    .post(function (req, res) {
        console.log("/dsm_api")
        source_intent = req.body.result.action;
        console.log("=========================== " + source_intent + " ===========================");

        switch (source_intent) {

            case 'home_intent':
                console.log("case:home_intent");
                //reading the excel file and storing into a json object;
                // readExcelFile();
                break;

            case '01_quarter_skill_bucket_intent':
                console.log("case:01_quarter_skill_bucket_intent");
                sendDataResponse(req, res);
                break;

            case '02_skill_bucket_intent':
                console.log("case:02_skill_bucket_intent");
                sendDataResponse(req, res);
                break;

            case '03_demand_intent':
                console.log("case:03_demand_intent");
                data_response = [];
                // if (excel_details == undefined) {
                xlsx('./excel_file1.xlsx', function (err, data) {
                    if (err) throw err;
                    excel_details = JSON.parse(JSON.stringify(convertToJSON(data)));
                    // console.log(excel_details);

                    input_details.setSkill(req.body.result.parameters['skill_details'])
                    input_details.setTimePeriod(req.body.result.parameters['year_details'])

                    let _skill_details = req.body.result.parameters['skill_details'];
                    let _time_period = req.body.result.parameters['year_details'];
                    console.log("Skill:", _skill_details)
                    console.log("Year:", _time_period)

                    new Promise(
                        function (resolve, reject) { // (A)
                            // console.log(excel_details);
                            var total_demand = 0;
                            for (var i = 0; i < excel_details.length; i++) {
                                const correctDate = new Date(1899, 12, excel_details[i].ApprovalDate - 1);
                                if (excel_details[i].SkillBucket == _skill_details && correctDate.getFullYear() == _time_period) {
                                    excel_details[i].ApprovalDate = month_name(correctDate);
                                    total_demand = total_demand + parseInt(excel_details[i].InitialDemand);
                                    data_response.push(excel_details[i]);
                                }
                            }
                            if (resolve) {
                                //resolve(value); // success
                                // sendDataResponse(req, res);

                                var msg = ""
                                if (data_response.length > 0) {

                                    data_response.push({ months: mlist });
                                    msg = "The total demand for " + input_details.getInput().skill + " skill set is " + total_demand + " in " + input_details.getInput().time_period

                                } else {
                                    msg = "There is no demand for the skill set " + input_details.getInput().skill + " in  " + input_details.getInput().time_period
                                }
                                console.log("sending Data response:", data_response)
                                res.json({
                                    speech: msg,
                                    displayText: msg,
                                    data: [{ data_response }]
                                })

                            } else {
                                reject(reason); // failure
                            }
                        });
                });//read excel;
                // }

                break;





        }//switch
    })










function sendDataResponse(req, res) {

    console.log("sendDataResponse()")



    data_response = []
    // if (excel_details == undefined) {
    xlsx('./excel_file1.xlsx', function (err, data) {
        if (err) throw err;
        excel_details = JSON.parse(JSON.stringify(convertToJSON(data)));
        // console.log(excel_details);

        input_details.setSkill(req.body.result.parameters['Skills_Entity'])
        input_details.setTimePeriod(req.body.result.parameters['year_details'])
        input_details.setQuarter(req.body.result.parameters['Quarters_Entity'])


        let _skill_details = req.body.result.parameters['Skills_Entity'];
        let _time_period = req.body.result.parameters['year_details'];
        if (_time_period == '' || _time_period == null || _time_period == undefined) {
            _time_period = 2018;
        }
        let _quarter_details = req.body.result.parameters['Quarters_Entity'];
        let _moth_list = [];
        console.log("Skill set:", _skill_details);
        console.log("Year:", _time_period);
        console.log("Quarter:", _quarter_details);
        let total_demand = 0;
        new Promise(
            function (resolve, reject) {
                // console.log(excel_details);
                switch (_quarter_details) {
                    case 'Fourth Quarter':
                        console.log("case:Fourth Quarter")
                        for (var i = 0; i < excel_details.length; i++) {
                            const correctDate = new Date(1899, 12, excel_details[i].ApprovalDate - 1);
                            // console.log("first 3 months "+correctDate.getMonth())
                            if (correctDate.getMonth() <= 2 && excel_details[i].SkillBucket == _skill_details && correctDate.getFullYear() == _time_period) {
                                excel_details[i].ApprovalDate = month_name(correctDate);
                                data_response.push(excel_details[i]);
                                _moth_list = ['Jan', 'Feb', 'Mar']
                                total_demand = total_demand + parseInt(excel_details[i].InitialDemand);
                            }
                        }
                        break;
                    case 'First Quarter':
                        console.log("case:First Quarter")
                        for (var i = 0; i < excel_details.length; i++) {
                            const correctDate = new Date(1899, 12, excel_details[i].ApprovalDate - 1);
                            if (correctDate.getMonth() > 2 && correctDate.getMonth() <= 5 && excel_details[i].SkillBucket == _skill_details && correctDate.getFullYear() == _time_period) {
                                excel_details[i].ApprovalDate = month_name(correctDate);
                                total_demand = total_demand + parseInt(excel_details[i].InitialDemand);
                                data_response.push(excel_details[i]);
                                _moth_list = ['Apr', 'May', 'Jun']
                            }
                        }
                        break;
                    case 'Second Quarter':
                        console.log("case:Second Quarter")
                        for (var i = 0; i < excel_details.length; i++) {
                            const correctDate = new Date(1899, 12, excel_details[i].ApprovalDate - 1);
                            if (correctDate.getMonth() > 5 && correctDate.getMonth() <= 8 && excel_details[i].SkillBucket == _skill_details && correctDate.getFullYear() == _time_period) {
                                excel_details[i].ApprovalDate = month_name(correctDate);
                                total_demand = total_demand + parseInt(excel_details[i].InitialDemand);
                                data_response.push(excel_details[i]);
                                _moth_list = ['Jul', 'Aug', 'Sep']
                            }
                        }
                        break;
                    case 'Third Quarter':
                        console.log("case:Third Quarter")
                        for (var i = 0; i < excel_details.length; i++) {
                            const correctDate = new Date(1899, 12, excel_details[i].ApprovalDate - 1);
                            if (correctDate.getMonth() > 8 && excel_details[i].SkillBucket == _skill_details && correctDate.getFullYear() == _time_period) {
                                excel_details[i].ApprovalDate = month_name(correctDate);
                                data_response.push(excel_details[i]);
                                total_demand = total_demand + parseInt(excel_details[i].InitialDemand);
                                _moth_list = ['Oct', 'Nov', 'Dec']
                            }
                        }
                        break;
                }//switch2

                if (resolve) {
                    //resolve(value); // success
                    // sendDataResponse(req, res);

                    var msg = ""
                    if (data_response.length > 0) {
                        data_response.push({ months: _moth_list });
                        console.log(data_response);

                        msg = "The total demand for " + _skill_details + " skill set is " + total_demand + " in " + _quarter_details + " of " + _time_period;

                    } else {
                        msg = "There is no demand for the skill set " + _skill_details + " in " + _quarter_details + " of " + _time_period;
                    }
                    console.log("sending Data response:", data_response)
                    res.json({
                        speech: msg,
                        displayText: msg,
                        data: [{ data_response }]
                    })

                } else {
                    reject(reason); // failure
                }
            }



        );//promise()
    });
    // }

}



function readExcelFile() {
    xlsx('./excel_file1.xlsx', function (err, data) {
        if (err) throw err;
        excel_details = JSON.stringify(convertToJSON(data));
        console.log(excel_details);
    });
}
function convertToJSON(array) {
    var first = array[0]
    console.log(first)
    var jsonData = [];
    for (var i = 1, length = array.length; i < length; i++) {
        var myRow = array[i]
        var data = {};
        for (var x = 0; x < myRow.length; x++) {
            data[first[x]] = myRow[x];
        }
        jsonData.push(data);
    }
    return jsonData;
};





module.exports = appRouter;