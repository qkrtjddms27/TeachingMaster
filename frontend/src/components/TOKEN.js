export const setToken = ()=>{
  const token = localStorage.getItem('jwt')
  const config = {
    Authorization:`Bearer ${token}`
  }
  return config
}