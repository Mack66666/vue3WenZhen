// 用户信息
export type User = {
  /** token令牌 */
  token: string
  /** 用户ID */
  id: string
  /** 用户名称 */
  account: string
  /** 手机号 */
  mobile: string
  /** 头像 */
  avatar: string
}
// 短信验证码类型，登录|注册|修改手机号|忘记密码|绑定手机号
export type CodeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'

// Omit 剔除类型中的值多个用联合类型|
// pick 提取类型的值
type Omituser = Omit<User, 'token'>
type userInfo = Omituser & {
  /** 关注 */
  likeNumber: number
  /** 收藏 */
  collectionNumber: number
  /** 积分 */
  score: number
  /** 优惠券 */
  couponNumber: number
  orderInfo: {
    /** 待付款 */
    paidNumber: number
    /** 待发货 */
    receivedNumber: number
    /** 待收货 */
    shippedNumber: number
    /** 已完成 */
    finishedNumber: number
  }
}
type patient ={
  name:string,
  idCard:string,
  defaultFlag:number,
  gender:number,
  genderValue:string,
  age:number,
  id?:string
}
export type patientList = patient[]
export type addPatient = Omit<patient, 'genderValue'|'age'>