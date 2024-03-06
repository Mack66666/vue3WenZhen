const mobileRules = [{ required: true, message: '请填写手机号'},{ pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }]
const passwordRules = [{ required: true, message: '请填写密码'},{ pattern: /^\w{8,24}$/, message: '密码格式不正确' }]
const codeRules = [{ required: true, message: '请填写验证码'},{ pattern: /^\d{6}$/, message: '验证码格式不正确' }]
const nameRules = [{ required: true, message: '请填写姓名'},{ pattern: /^[\u4e00-\u9fa5]{2,4}$/, message: '姓名格式不正确' }]
const idCardRules = [{ required: true, message: '请填写身份证号'},{ pattern: /(^\d{15}$\d{1}([0-9]|X)$)|(^\d{17}(\d|X)$)/, message: '身份证号格式不正确' }]
export {mobileRules,passwordRules,codeRules,nameRules,idCardRules}