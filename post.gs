/*
Author : Imam Syuhada
*/
var versionString = 'v2.10-add get'

var idSpeadSheet = SpreadsheetApp.openById('1llkTzB7K1VeA9eRoYUtM_HwqFHocEhiiVGF808zbGgw');
//var idDrive = Drive.openById('1llkTzB7K1VeA9eRoYUtM_HwqFHocEhiiVGF808zbGgw');

var jsonObjResponse = { 
  status: 'gagal',
  version : versionString
}

                       
function appendData(array){
  
  idSpeadSheet.appendRow([array[0],
                          array[1],
                          array[2],
                          array[3],
                          array[4],
                          array[5],
                          array[6],
                          array[7]
                         ]);
}

function validateDatasForm(array){
  for(i = 0; i < array.length; i++){
    if(array[i].length < 4){
      return false;
    }
  }
  return true;
}

function jsonResult(jsonObjResponse){
  var JSONString = JSON.stringify(jsonObjResponse);
  var JSONOutput = ContentService.createTextOutput(JSONString);
  
  return JSONOutput.setMimeType(ContentService.MimeType.JSON);
}

function doPost(req){
  
  const { 
    parameter, 
    postData: { 
      contents, 
        type 
    } = {} 
  } = req;
  
  const { source } = parameter;
  
  var jsonBody = JSON.parse(contents);
 
  var datas = [
    Utilities.formatDate(new Date(), "GMT+7", "MM/dd/yyyy HH:mm:ss"),
    jsonBody.id,
    jsonBody.nip,
    jsonBody.name,
    jsonBody.satuankerja,
    jsonBody.subbagian,
    jsonBody.longitude,
    jsonBody.latitude
  ];

  if(validateDatasForm(datas) == false){
    jsonObjResponse.message = "validateDatasForm"
  }
  else{
    appendData(datas)
    jsonObjResponse.status = "sukses"
  }
  
  //  jsonObjResponse.req = req
  
  return jsonResult(jsonObjResponse);
}

function doGet(req) {
  jsonObjResponse.status = "warning";
  jsonObjResponse.message = "under construction";
  
  return jsonResult(jsonObjResponse);
}
