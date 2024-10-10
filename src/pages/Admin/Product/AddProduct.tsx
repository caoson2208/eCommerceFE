import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaPlus } from 'react-icons/fa'
import { Product } from 'src/types/product.type'
import config from 'src/constants/config'
import Input from 'src/components/Input'
import Button from 'src/components/Button'

export default function AddProduct() {
  const [product, setProduct] = useState<Product>({
    _id: '',
    images: [],
    price: 0,
    rating: 0,
    price_before_discount: 0,
    quantity: 0,
    sold: 0,
    view: 0,
    name: '',
    description: '',
    category: { _id: '', name: '' },
    image: '',
    createdAt: '',
    updatedAt: ''
  })
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/categories`)
        setCategories(response.data.data)
      } catch (error) {
        console.error('Error fetching categories', error)
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProduct({
      ...product,
      [name]: name === 'price' || name === 'price_before_discount' || name === 'quantity' ? Number(value) : value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${config.baseUrl}/products`, product)
      alert('Sản phẩm đã được thêm thành công!')
      navigate('/admin/products') // Chuyển hướng về danh sách sản phẩm
    } catch (error) {
      console.error('Error adding product', error)
      alert('Đã xảy ra lỗi khi thêm sản phẩm.')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='max-w-3xl mx-auto mt-8 border rounded-lg shadow-lg'>
        <div className='text-blue font-bold p-5'> + Thêm sản phẩm</div>
        <div className='border-b'></div>
        <div className='p-5'>
          <div className='mb-0'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
              Tên sản phẩm
            </label>
            <Input
              name='name'
              type='text'
              placeholder='Tên sản phẩm'
              value={product.name}
              rules={{ required: 'Tên sản phẩm là bắt buộc' }}
              classNameInput='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>

          <div className='mb-0'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
              Giá giảm
            </label>
            <Input
              name='price'
              type='number'
              placeholder='Giá giảm'
              value={product.price}
              rules={{ required: 'Giá là bắt buộc' }}
              onChange={handleChange}
              classNameInput='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>

          <div className='mb-0'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price_before_discount'>
              Giá
            </label>
            <Input
              name='price_before_discount'
              type='number'
              placeholder='Giá'
              value={product.price_before_discount}
              onChange={handleChange}
              classNameInput='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>

          <div className='mb-0'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='quantity'>
              Số lượng
            </label>
            <Input
              name='quantity'
              type='number'
              placeholder='Số lượng'
              value={product.quantity}
              onChange={handleChange}
              classNameInput='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>

          <div className='mb-0'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
              Mô tả
            </label>
            <Input
              name='description'
              as='textarea'
              rows={4}
              placeholder='Mô tả sản phẩm'
              value={product.description}
              onChange={handleChange}
              classNameInput='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>

          <div className='mb-4'>
            <label className='block mb-1 font-bold'>Danh mục</label>
            <select
              name='category'
              value={product.category._id}
              onChange={handleChange}
              className='w-full p-2 border rounded'
              required
            >
              <option value=''>Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='p-5 flex'>
          <Link to='/admin/products'>
            <Button
              type='submit'
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition-colors flex items-center'
            >
              Huỷ
            </Button>
          </Link>
          <Button
            type='submit'
            className='bg-[#1e6ddb] ml-3 text-white px-4 py-2 rounded hover:bg-[#1e6ddb]/80 transition-colors flex items-center'
          >
            Lưu
          </Button>
        </div>
      </form>
    </div>
  )
}
