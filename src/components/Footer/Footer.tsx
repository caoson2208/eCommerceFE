import { useEffect } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'df-messenger': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        intent: string
        'chat-title': string
        'agent-id': string
        'language-code': string
      }
    }
  }
}

export default function Footer() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <footer className='bg-white py-8 border-t'>
      <div className='container m-auto text-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='border-r border-gray-300'>CHÍNH SÁCH BẢO MẬT</div>
          <div className='border-r border-gray-300'>QUY CHẾ HOẠT ĐỘNG</div>
          <div className='border-r border-gray-300'>CHÍNH SÁCH VẬN CHUYỂN</div>
          <div>CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</div>
        </div>
        <div className='mt-10'>
          <div>Công ty TNHH CNS</div>
          <div className='mt-2'>
            Địa chỉ: 41 Yên Thế, Phường 2, Quận Tân Bình. Tổng đài hỗ trợ: 079939900 - Email:{' '}
            <a href='mailto:2151050377Son@ou.edu.vn'>2151050377Son@ou.edu.vn</a>
          </div>
          <div className='mt-2'>Chịu Trách Nhiệm Quản Lý Nội Dung: Cao Ngọc Sơn</div>
          <div className='mt-2'>© 2024 - Bản quyền thuộc về Công ty TNHH CNS</div>
        </div>
      </div>
      <df-messenger
        intent='WELCOME'
        chat-title='Hỗ trợ trực tuyến'
        agent-id='46eae289-ca67-4480-a52c-8169d1a0d2b6'
        language-code='vi'
        aria-label='Chat with our support team'
      ></df-messenger>
    </footer>
  )
}
