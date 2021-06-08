import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 15000
})
export const weatherApi = Axios.create({
  baseURL: 'http://api.airvisual.com/v2/city?city=Meridian&state=Idaho&country=USA&key=040cdc41-fc2a-44dd-a696-5d6245acce0e',
  timeout: 15000
})
export const newsApi = Axios.create({
  baseURL: 'https://custom-search.p.rapidapi.com/api/search/CustomNewsSearchAPIV2?q=Carbon Emissions&searchEngineId=687417457347224395&pageNumber=1',
  timeout: 15000,
  headers: {
    'x-rapidapi-key': '8bcd6e56a5mshdbc3fe3aad9cc9dp15aa46jsn21976a70e5e7',
    'x-rapidapi-host': 'custom-search.p.rapidapi.com',
    useQueryString: true
  }
})
export const setBearer = function(bearer) {
  api.defaults.headers.authorization = bearer
}
export const resetBearer = function() {
  api.defaults.headers.authorization = ''
}
