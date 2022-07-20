const db = require('../../data/db-config');
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
async function checkSchemeId(req, res, next) {
  const scheme = await db('schemes').where('id', req.params.id).first();
  if(!scheme){
    next({message: `scheme with scheme_id ${req.params.id} not found`, status: 404})
  } else {
    next()
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  if(!req.body.scheme_name.trim()){
    next({message: "invalid scheme_name", status: 400})
  } else { 
    next();
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  if(!req.body.instructions.trim() || !req.body.step_number.trim() || req.body.step_number > 0){
    next({message: "invalid step", status: 400})
  } else {
    next();
  }
} 

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
