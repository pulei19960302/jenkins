import $api from '../services'

declare interface Window {
    $api:typeof $api
}