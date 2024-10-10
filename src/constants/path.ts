const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart',
  policy: '/policy',
  contact: '/contact',
  loginAdmin: '/admin/login',
  admin: '/admin/',
  productList: '/admin/products',
  categoryList: '/admin/categories',
  orderList: '/admin/orders',
  create: '/create',
  payment: '/payment'
} as const

export default path
