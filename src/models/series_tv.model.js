const mongoose = require ('mongose')
const serieSchema = mongoose.Schema({
  serie:{
    type: String,
    require: true,
    unique:true
  },
  number_seasons:{
    type:Number,
    require: true
  },
  original_lenguaje:{
    type: String,
    require:true
  },
  features_seasons:{
    type:Object,
    season_number:{type:Number, require:true},
    season_name:{type:String, require:true},
    premier_date:{type:String, require:true},
    cast:{type: Array,require:true },
  }
});
const serie_model = mongoose.model('SerieTV_Collection',serieSchema);
module.exports = serie_model;