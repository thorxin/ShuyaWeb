import * as endpoints from '../constant/api';
import httpService from '../constant/httpService'

export async function getNotification(pageNumber, data) {
    return await fetch(`${endpoints.GetNotification}?PageNumber=${pageNumber}&PageSize=10`, data)
 }

export async function seenNotification(id) {
    return await httpService.get(`${endpoints.SeenNotification}${id}`)
}