/*
 * programa que mostra com es pot treballar amb l'API geolocalitzacio
 * i openStreetMaps
 * @author sergi.grau@fje.edu
 * @version 1.0
 * date 03.11.2020
 * format del document UTF-8
 *
 * CHANGELOG
 * 03.11.2020
 * - programa que mostra com es pot treballar amb l'API geolocalitzacio
 * https://geoadmin.github.io/ol3/apidoc/ol.style.Style.html
 *
 * NOTES
 * ORIGEN
 * Desenvolupament en entorn client. Escola del clot
 */



function iniciar() {
  var view = new ol.View({
    center: [0, 0],
    zoom: 2
  });
  
  var map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: 'map',
    controls: ol.control.defaults({
      attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
        collapsible: false
      })
    }),
    view: view
  });
  
  var geolocation = new ol.Geolocation({
    trackingOptions: {
      enableHighAccuracy: true,
    },
    projection: view.getProjection(),
  });
    
  var accuracyFeature = new ol.Feature();
  
  var positionFeature = new ol.Feature();
  positionFeature.bindTo('geometry', geolocation, 'position')
      .transform(function() {}, function(coordinates) {
        return coordinates ? new ol.geom.Point(coordinates) : null;
      });
  
  var featuresOverlay = new ol.FeatureOverlay({
    map: map,
    features: [accuracyFeature, positionFeature]
  });
  

}



window.addEventListener("load", iniciar, true);
