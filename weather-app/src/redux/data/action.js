
const getDataAction={
    GET_DATA_REQUEST:"GET_DATA_REQUEST",
    GET_DATA_SUCCESS:"GET_DATA_SUCCESS",
    GET_DATA_FAILURE:"GET_DATA_FAILURE",

}


const getDataRequest=()=>({
    type:getDataAction.GET_DATA_REQUEST
})



const getDataSuccess=()=>({
    type:getDataAction.GET_DATA_SUCCESS
})


const getDataFailure=()=>({
    type:getDataAction.GET_DATA_FAILURE
})


