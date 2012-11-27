/* Schema generator for fictitious insurance company */
var schemata = {
// Insurance Policy
Policy: {
  status: 'draft',
  version: 0,
  number: null,
  region : { zip : null, city : null },
  owner : ('a Member'),
  insureds : [{ relationship : 'self', member : ('the policy owner') }] },

// Member record
Member: {
  name : null,
  contact : {
    email : null,
    phone : null,
    address : null,
    postal : null
  },
  birthdate : null,
  smoker : false,
  gender : null,
  pregnant : ('show if gender is female'),
  disabled : false } };

// convert schema objects to constructors
for (var name in schemata)
  (function load_schema(name, scheme){
    // each schema becomes a global object in this system
    var scope = window;
    scope[name] = function(){
      for (var property in scheme)
        // not a deep copy
        this[property] = scheme[property];
    };
  })();