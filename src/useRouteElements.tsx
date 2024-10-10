import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './contexts/app.context'
import path from 'src/constants/path'
import RegisterLayout from './layouts/RegisterLayout'
import ClientLayout from './layouts/ClientLayout'
import AdminLayout from './layouts/AdminLayout'
import ProductList from './pages/ProductList'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Cart = lazy(() => import('./pages/Cart'))
const Payment = lazy(() => import('./pages/Payment'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'))
const Profile = lazy(() => import('./pages/User/pages/Profile'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Policy = lazy(() => import('./pages/Policy'))
const Contact = lazy(() => import('./pages/Contact'))
const LoginAdmin = lazy(() => import('./pages/Admin/Login'))
const ProductListAdmin = lazy(() => import('./pages/Admin/Product/ProductList'))
const AddProductAdmin = lazy(() => import('./pages/Admin/Product/AddProduct'))
const CategoryListAdmin = lazy(() => import('./pages/Admin/Category/CategoryList'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function ProtectedRouteAdmin() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.loginAdmin} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.loginAdmin,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <LoginAdmin />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <ClientLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Cart />
              </Suspense>
            </ClientLayout>
          )
        },
        {
          path: path.payment,
          element: (
            <ClientLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Payment />
              </Suspense>
            </ClientLayout>
          )
        },
        {
          path: path.historyPurchase,
          element: (
            <ClientLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <HistoryPurchase />
              </Suspense>
            </ClientLayout>
          )
        },
        {
          path: path.profile,
          element: (
            <ClientLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Profile />
              </Suspense>
            </ClientLayout>
          )
        },
        {
          path: path.changePassword,
          element: (
            <ClientLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <ChangePassword />
              </Suspense>
            </ClientLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRouteAdmin />,
      children: [
        {
          path: path.admin,
          element: (
            <AdminLayout>
              <Suspense fallback={<div>Loading...</div>}></Suspense>
            </AdminLayout>
          )
        },
        {
          path: path.productList,
          element: (
            <AdminLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <ProductListAdmin />
              </Suspense>
            </AdminLayout>
          )
        },
        {
          path: path.productList + path.create,
          element: (
            <AdminLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <AddProductAdmin />
              </Suspense>
            </AdminLayout>
          )
        },
        {
          path: path.categoryList,
          element: (
            <AdminLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <CategoryListAdmin />
              </Suspense>
            </AdminLayout>
          )
        }
      ]
    },
    {
      path: '',
      children: [
        {
          path: path.home,
          index: true,
          element: (
            <ClientLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <ProductList />
              </Suspense>
            </ClientLayout>
          )
        },
        {
          path: path.productDetail,
          element: (
            <ClientLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <ProductDetail />
              </Suspense>
            </ClientLayout>
          )
        },
        {
          path: path.policy,
          element: (
            <ClientLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Policy />
              </Suspense>
            </ClientLayout>
          )
        },
        {
          path: path.contact,
          element: (
            <ClientLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Contact />
              </Suspense>
            </ClientLayout>
          )
        },
        {
          path: '*',
          element: (
            <ClientLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <NotFound />
              </Suspense>
            </ClientLayout>
          )
        }
      ]
    }
  ])

  return routeElements
}
