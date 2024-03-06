import type { User,CodeType,userInfo,patientList,addPatient } from "@/type/user"
import { request } from "@/utils/requets"
const passwordLogin = (mobile:string,password:string)=>{
  return  request<User>('/login/password','POST',{mobile,password})
}
const getPhoneCode = (mobile:string,type:CodeType)=>{
    return  request<string>('/code','GET',{mobile,type})
}
const codeLogin = (mobile:string,code:string)=>{
    return  request<User>('/login','POST',{mobile,code})
}
const getUserInfo =()=>{
  return  request<userInfo>('/patient/myUser','GET')
}
// 获取患者列表
const getPatientList = () => {
  return request<patientList>('/patient/mylist', 'GET')
}
const postPatient = (data:addPatient)=>{
  return request('/patient/add','POST',data)
} 
const updataPatient = (data:addPatient)=>{
  const {id,name,idCard,gender,defaultFlag}=data
  return request('/patient/update','PUT',{id,name,idCard,gender,defaultFlag})
}
const delPatient = (id:number)=>{
  return request('/patient/del/'+id,'DELETE',)
}
export {passwordLogin,getPhoneCode,codeLogin,getUserInfo,getPatientList,postPatient,updataPatient,delPatient}