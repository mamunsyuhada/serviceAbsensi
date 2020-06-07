/*
  Author : Imam Syuhada
*/

var versionString = 'v2.9-handling revision add log'

var idSpeadSheet = SpreadsheetApp.openById('1llkTzB7K1VeA9eRoYUtM_HwqFHocEhiiVGF808zbGgw');

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

function doPost(req){
  var datas = [
    Utilities.formatDate(new Date(), "GMT+7", "MM/dd/yyyy HH:mm:ss"),
    req.parameter.id,
    req.parameter.nip,
    req.parameter.name,
    req.parameter.satuankerja,
    req.parameter.subbagian,
    req.parameter.longitude,
    req.parameter.latitude
  ];

  if(validateDatasForm(datas) == false){
    jsonObjResponse.message = "validateDatasForm"
  }
  else{
    appendData(datas)
    jsonObjResponse.status = "sukses"
  }
  
  var JSONString = JSON.stringify(jsonObjResponse);
  var JSONOutput = ContentService.createTextOutput(JSONString);
  
  JSONOutput.setMimeType(ContentService.MimeType.JSON);
  return JSONOutput;
}
