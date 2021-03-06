const express = require('express');
const serie_model = require('../models/series_tv.model');
const serie_route = express.Router();
const SerieService = require('../services/series.service');
const _service_serie = new SerieService();
const Boom = require('@hapi/boom');

/*Ruta para CREAR nuevas series
Endpoint: http://localhost:5000/api/v2/series/serie*/

serie_route.post('/serie',async (req,res) => {
  try {
    const new_serie = serie_model(req.body);
    const data_service = await _service_serie.createSerie(new_serie);
    res.status(201).json(data_service);
  }catch (error){
   res.status(500).json({message: error});
  }
});

/*Ruta para LISTAR las series existentes
Endpoint: http://localhost:5000/api/v2/series*/
  serie_route.get('/',async (req,res) => {
  try {
      const new_serie = serie_model(req.body);
      const data_service = await _service_serie.listSerie();
      res.status(200).json(data_service);

  }catch (error){
    res.status(404).json({message: error});
  }
});
/*Ruta para LISTAR las series existentes con una espera de 3 segundos
Endpoint: http://localhost:5000/api/v2/series*/
serie_route.get('/3seconds',async (req,res) => {
  try {
      const new_serie = serie_model(req.body);
      const data_service = await _service_serie.listSeries3Seconds();
      res.status(200).json(data_service);

  }catch (error){
    res.status(404).json({message: error});
  }
});
/*Ruta para SHOW las series existentes
Endpoint: http://localhost:5000/api/v2/series*/
serie_route.get('/:serieId',async (req,res,next) => {
  try {
    const {serieId} = req.params;
 const data_service =await _service_serie.showSerie(serieId);
  res.status(200).json(data_service);

  }catch (error){
    next (error);
  }
});
/*Ruta para PUT las series existentes
Endpoint: http://localhost:5000/api/v2/series*/
serie_route.put('/:serieId',async (req,res,next) => {
  try {
      const {serieId} =req.params;
      const {serie,number_seasons,original_lenguaje,features_seasons}=req.body;
      const data_service = await _service_serie.updateSerie(
        serieId,
        serie,
        number_seasons,
        original_lenguaje,
        features_seasons
      );
      res.status(200).json(data_service);
  }catch (error){
    next (error);
  }
});


serie_route.delete('/serieId',async (req,res,next) => {
  try {
    const {serieId} =req.params;
    const data_service = await _service_serie.removeSerie(serieId);
    res.status(200).json(data_service);
  }catch (error){
    next (error);
  }
});

module.exports = serie_route;