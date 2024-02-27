import type { User,CodeType } from "@/type/user"
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
export {passwordLogin,getPhoneCode,codeLogin}