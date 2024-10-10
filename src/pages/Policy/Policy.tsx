export default function Policy() {
  return (
    <div className='container mx-auto py-44'>
      <h1 className='text-4xl font-bold mb-8 text-center'>Chính sách của chúng tôi</h1>

      <section className='flex flex-col lg:flex-row mb-8'>
        <div className='lg:w-1/2 mb-6 lg:mb-0 lg:pr-4'>
          <h2 className='text-2xl font-semibold mb-2'>Chính sách bảo mật</h2>
          <p className='text-gray-700 mb-4'>
            Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn một cách tối ưu. Tất cả dữ liệu thu thập từ khách hàng sẽ
            được mã hóa và bảo mật cẩn thận, đồng thời không được chia sẻ cho bất kỳ bên thứ ba nào trừ khi được sự đồng
            ý của bạn.
          </p>
          <p className='text-gray-700 mb-4'>
            Thông tin như địa chỉ email, số điện thoại sẽ chỉ được sử dụng trong quá trình giao dịch và hỗ trợ khách
            hàng. Bạn có thể yên tâm rằng dữ liệu của mình sẽ không bị sử dụng sai mục đích.
          </p>
        </div>
        <div className='lg:w-1/2'>
          <img src='https://via.placeholder.com/600x300' alt='Privacy Policy' className='rounded-md shadow-md' />
        </div>
      </section>

      <section className='flex flex-col lg:flex-row-reverse mb-8'>
        <div className='lg:w-1/2 mb-6 lg:mb-0 lg:pl-4'>
          <h2 className='text-2xl font-semibold mb-2'>Chính sách hoàn trả</h2>
          <p className='text-gray-700 mb-4'>
            Nếu sản phẩm bạn nhận được không đáp ứng mong đợi hoặc bị lỗi, chúng tôi sẵn sàng hỗ trợ đổi hoặc hoàn trả
            sản phẩm trong vòng 30 ngày kể từ ngày nhận hàng. Quy trình hoàn trả đơn giản và nhanh chóng giúp bạn không
            phải lo lắng.
          </p>
          <p className='text-gray-700 mb-4'>
            Để yêu cầu hoàn trả, bạn chỉ cần cung cấp mã đơn hàng và hình ảnh sản phẩm bị lỗi (nếu có). Chúng tôi sẽ
            kiểm tra và phản hồi trong vòng 24 giờ.
          </p>
        </div>
        <div className='lg:w-1/2'>
          <img src='https://via.placeholder.com/600x300' alt='Return Policy' className='rounded-md shadow-md' />
        </div>
      </section>

      <section className='flex flex-col lg:flex-row mb-8'>
        <div className='lg:w-1/2 mb-6 lg:mb-0 lg:pr-4'>
          <h2 className='text-2xl font-semibold mb-2'>Chính sách vận chuyển</h2>
          <p className='text-gray-700 mb-4'>
            Chúng tôi cung cấp dịch vụ vận chuyển toàn quốc và quốc tế. Thời gian giao hàng dao động từ 3 đến 7 ngày làm
            việc, tùy thuộc vào vị trí của bạn. Đối với đơn hàng quốc tế, thời gian có thể kéo dài từ 10 đến 15 ngày.
          </p>
          <p className='text-gray-700 mb-4'>
            Chi phí vận chuyển sẽ được tính dựa trên địa chỉ của khách hàng và hiển thị rõ ràng trong quá trình thanh
            toán. Đơn hàng trên 1 triệu đồng sẽ được miễn phí vận chuyển trong nước.
          </p>
        </div>
        <div className='lg:w-1/2'>
          <img src='https://via.placeholder.com/600x300' alt='Shipping Policy' className='rounded-md shadow-md' />
        </div>
      </section>

      <section className='flex flex-col lg:flex-row-reverse'>
        <div className='lg:w-1/2 mb-6 lg:mb-0 lg:pl-4'>
          <h2 className='text-2xl font-semibold mb-2'>Liên hệ với chúng tôi</h2>
          <p className='text-gray-700 mb-4'>
            Nếu bạn có bất kỳ câu hỏi nào về chính sách của chúng tôi, vui lòng liên hệ với đội ngũ hỗ trợ khách hàng
            qua email:{' '}
            <a href='mailto:support@example.com' className='text-blue-500'>
              support@example.com
            </a>
            .
          </p>
        </div>
        <div className='lg:w-1/2'>
          <img src='https://via.placeholder.com/600x300' alt='Contact Us' className='rounded-md shadow-md' />
        </div>
      </section>
    </div>
  )
}
