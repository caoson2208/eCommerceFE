import { useForm, SubmitHandler } from 'react-hook-form'
import Button from 'src/components/Button'
import Input from 'src/components/Input'

interface FormValues {
  name: string
  email: string
  subject: string
  message: string
  phone: string
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
  }

  return (
    <div className='container mx-auto py-44'>
      <h1 className='text-4xl font-bold mb-8 text-center'>Liên hệ với chúng tôi</h1>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:w-1/2 mb-6 lg:mb-0 lg:pr-8'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.272926657385!2d106.69798717596939!3d10.79039628935923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175298fbe8d0ad9%3A0x752364c60b6da2c3!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBN4bufIFRQLiBI4buTIENow60gTWluaCAtIEPGoSBz4bufIDQ!5e0!3m2!1svi!2s!4v1726586149927!5m2!1svi!2s'
            className='w-full h-96 rounded-md shadow-md'
            allowFullScreen={true}
            loading='lazy'
          ></iframe>
        </div>

        <div className='lg:w-1/2'>
          <form className='bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                Họ và Tên
              </label>
              <Input
                name='name'
                placeholder='Nhập họ và tên'
                register={register}
                rules={{ required: 'Họ và tên là bắt buộc' }}
                classNameInput='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                errorMessage={errors.name?.message}
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>
              <Input
                name='email'
                type='email'
                placeholder='Nhập email'
                register={register}
                rules={{
                  required: 'Email là bắt buộc',
                  pattern: { value: /^\S+@\S+$/i, message: 'Email không hợp lệ' }
                }}
                classNameInput='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                errorMessage={errors.email?.message}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>
                Số điện thoại
              </label>
              <Input
                name='phone'
                type='tel'
                placeholder='Nhập số điện thoại'
                register={register}
                rules={{
                  required: 'Số điện thoại là bắt buộc',
                  pattern: { value: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }
                }}
                classNameInput='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                errorMessage={errors.phone?.message}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='subject'>
                Chủ đề
              </label>
              <Input
                name='subject'
                placeholder='Nhập chủ đề'
                register={register}
                rules={{ required: 'Chủ đề là bắt buộc' }}
                classNameInput='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                errorMessage={errors.subject?.message}
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='message'>
                Tin nhắn
              </label>
              <Input
                name='message'
                as='textarea'
                placeholder='Nhập tin nhắn'
                rows={4}
                register={register}
                rules={{ required: 'Tin nhắn là bắt buộc' }}
                classNameInput='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                errorMessage={errors.message?.message}
              />
            </div>

            <div className='flex justify-center'>
              <Button
                type='submit'
                className='rounded-lg bg-[#1e6ddb] py-2 px-8 text-lg text-white hover:bg-[#1e6ddb]/80'
              >
                Gửi
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
