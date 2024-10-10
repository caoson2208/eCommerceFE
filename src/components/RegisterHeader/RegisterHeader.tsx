import { Link, useMatch } from 'react-router-dom'
import logo from 'src/assets/images/logo.png'

export default function RegisterHeader() {
  const registerMatch = useMatch('/register')
  const isRegister = Boolean(registerMatch)
  return (
    <header className='shadow-xl z-[9999]'>
      <div className='container m-auto'>
        <nav className='flex items-center'>
          <Link to='/'>
            <img src={logo} alt='Logo' className='w-[80px] h-[80px]' />
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</div>
        </nav>
      </div>
    </header>
  )
}
