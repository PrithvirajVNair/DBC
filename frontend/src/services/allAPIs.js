import { commonAPI } from "./commonAPI"
import { serverURL } from "./serverURL"


export const getBreachAPI = async(email) => {
    return await commonAPI("GET",`${serverURL}/get-details?email=${email}`)
}