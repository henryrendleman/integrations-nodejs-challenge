function isValidYear(year){
  let valid = false;
  if(String(year).length === 4){
    const updatedYear = parseInt(year);
    valid = updatedYear >= 1900 && updatedYear <= new Date().getFullYear() + 2;
  }
  return valid;
}

function updateStringsToValues(value, allUpperCase){
  if(String(value).toLowerCase() === 'blank'){
    value = null;
  }
  return value;
}

function convertToCased(value, allUpperCase){
  if(allUpperCase){
    value = value.toUpperCase();
  } else {
    value = value.toLowerCase();
    value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
  return value;
}

function createMake(make){
  const originalMake = updateStringsToValues(make);
  let foundInAllowed = false;
  const allowedMakes = ['Ford', 'Chevrolet'];
  make = convertToCased(make,false);
  if(make && allowedMakes.includes(make)){
    return make;
  }
  else {
    allowedMakes.forEach((allowedMake)=>{
      console.log(allowedMake);
      if(allowedMake.includes(make)){
        foundInAllowed = true;
        make = allowedMake;
      }
    });
    if(foundInAllowed){
      return make;
    }
  }
  return originalMake;
}

function createModel(model){
  const originalModel = updateStringsToValues(model);
  model = convertToCased(model.split(' ').shift(),false);
  let foundInAllowed = false;
  const allowedModels = ['Focus', 'Impala'];
  if(model && allowedModels.includes(model)){
    return model;
  } else {
    allowedModels.forEach((allowedModel)=>{
      if(allowedModel.includes(model)){
        foundInAllowed = true;
        model = allowedModel;
      }
    });
    if(foundInAllowed){
      return make;
    }
  }
  return originalModel;
}

function createTrim(trim, model){
  const originalTrim = updateStringsToValues(trim);
  trim = convertToCased(trim,true);
  const allowedTrims = ['ST', 'SE'];
  if(trim && allowedTrims.includes(trim)){
    return trim;
  } else {
    trim = model.split(' ').length > 1 ? model.split(' ').pop().toUpperCase() : originalTrim;
    if(trim && allowedTrims.includes(trim)){
      return trim;
    }
  }
  return trim;
}



export default function normalizeData(data) {
  const output = {...data} ;
  if(isValidYear(data.year)){
    output.year = parseInt(data.year);
  }
  output.make = createMake(data.make);
  output.model = createModel(data.model);
  output.trim = createTrim(data.trim,data.model);
  return output;
}
