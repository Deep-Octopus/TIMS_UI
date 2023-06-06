import request from "@/utils/request";
export function getUserInfoApi(){
    return request.get('/api/auth/getUserInfo')
}
export function getUser(){
    return request.get('/api/auth/getUser')
}
export function userLogin(user){
    return request.post('/login', user)
}
export function userLogOut(){
    return request.get('/logout')
}
export function addEntity(entity,auth) {
    return request.post(`/api/${auth}/add`,entity)
}

export function deleteEntity(id,auth) {
    return request.get(`/api/${auth}/delete?id=${id}`)
}

export function multipleDeleteEntity(idList,auth) {
    return request.post(`/api/${auth}/multipleDelete`, {idList:idList})
}
export function updateEntity(entity,auth) {
    return request.post(`/api/${auth}/update`,entity)
}
export function initEntity(auth){
    return request.get(`/api/${auth}/init`)
}
export function checkClazz(student,auth){
    return request.post(`/api/${auth}/checkClazz`,student)
}

export function getStudents(clazzId,auth){
    return request.get(`/api/${auth}/getStudents/${clazzId}` )
}
export function initClazz(teacherId,auth){
    return request.get(`/api/${auth}/getClazzs/${teacherId}` )
}
export function changeUserPwd(form){
    return request.post(`/changePwd`,form)
}