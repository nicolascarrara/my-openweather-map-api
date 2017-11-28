const { URL } = require('url');
require('isomorphic-fetch');
let HttpProxyAgent = require('http-proxy-agent');

const proxy = 'http://wwwcache.univ-orleans.fr:3128';
const APPID = '78b5165f196e833901599637f602acd6' ;
const units = 'metric';

class OpenWeatherMap{
  constructor(APPID,units,http_proxy = null){
    this._APPID = APPID ;
    this._units = units ;
    if (http_proxy == null ){
      this._proxy = null;
    }else {
      this._proxy = new HttpProxyAgent(http_proxy);
    }
  }
    getWeather(city){
      const urlow = new URL ("http://api.openweathermap.org/data/2.5/weather"), params = {q:city,APPID:this._APPID,units:this._units}
      Object.keys(params).forEach(key => urlow.searchParams.append(key,params[key]));
      let options = {};
      if(this._proxy != null) options = {agent : this._proxy};
      return fetch(urlow.toString(),options).then(response => response.json())

  }
};
module.exports.OpenWeatherMap = OpenWeatherMap;

let ow = new OpenWeatherMap(APPID,units,proxy);
ow.getWeather('montreal,ca').then(data=>{
    console.log('Météo :',data.main.temp , '°C');
  }) .catch(err => {
    console.log('Erreur lors de la recupération des infos avec API')
  });
