import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { Category } from 'src/types/category.type'
import { Product } from 'src/types/product.type'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from 'src/constants/config'
import Button from 'src/components/Button'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/products`)
        setProducts(response.data.data.products)
      } catch (error) {
        console.error('Error fetching products', error)
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/categories`)
        setCategories(response.data.data)
      } catch (error) {
        console.error('Error fetching categories', error)
      }
    }

    fetchProducts()
    fetchCategories()
  }, [])

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product })
  }

  const handleSave = async () => {
    if (editingProduct) {
      try {
        setLoading(true)
        const response = await axios.put(`${config.baseUrl}/products/${editingProduct._id}`, editingProduct)

        if (response.status === 200) {
          setProducts(products.map((product) => (product._id === editingProduct._id ? response.data.data : product)))
          setEditingProduct(null)
          alert('Sản phẩm đã được cập nhật thành công!')
        } else {
          console.error('Unexpected API response status:', response.status)
        }
      } catch (error) {
        console.error('Error updating product', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setLoading(true)
      await axios.delete(`${config.baseUrl}/products/${id}`)
      setProducts(products.filter((product) => product._id !== id))
      alert('Sản phẩm đã được xóa thành công!')
    } catch (error) {
      console.error('Error deleting product', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async () => {
    const newProduct: Product = {
      _id: '', // ID should be managed by the server
      name: 'Sản phẩm mới',
      price: 0,
      price_before_discount: 0,
      quantity: 0,
      sold: 0,
      category: { _id: categories[0]?._id || '', name: categories[0]?.name || 'Danh mục' },
      image: '',
      images: [],
      rating: 0,
      view: 0,
      description: '',
      createdAt: '',
      updatedAt: ''
    }

    try {
      setLoading(true)
      const response = await axios.post(`${config.baseUrl}/products`, newProduct)
      setProducts([...products, response.data.data])
      alert('Sản phẩm đã được thêm thành công!')
    } catch (error) {
      console.error('Error adding product', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [name]: name === 'price' || name === 'price_before_discount' || name === 'quantity' ? Number(value) : value
      })
    }
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        category: categories.find((category) => category._id === e.target.value) || editingProduct.category
      })
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Quản lý sản phẩm</h1>
      <div className='mt-3'>
        <Link to='/admin/products/create'>
          <Button className='ml-auto mb-4 bg-[#1e6ddb] text-white px-2 py-2 rounded hover:bg-[#1e6ddb]/80 transition-colors flex items-center'>
            <div className='flex items-center'>
              <FaPlus className='mr-2' /> Thêm sản phẩm
            </div>
          </Button>
        </Link>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='py-3 text-center'>ID</th>
              <th className='py-3 text-center'>Ảnh</th>
              <th className='py-3 text-center'>Tên sản phẩm</th>
              <th className='py-3 text-center'>Giá giảm</th>
              <th className='py-3 text-center'>Giá</th>
              <th className='py-3 text-center'>Số lượng</th>
              <th className='py-3 text-center'>Danh mục</th>
              <th className='py-3 text-center col-span-2'></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className='border-b border-gray-200 hover:bg-gray-100'>
                <td className='py-3 px-4'>{product._id}</td>
                <td className='py-3 px-4'>
                  <img src={product.image} alt={product.name} className='w-16 h-16 object-cover rounded' />
                </td>
                <td className='py-3 px-4 w-80'>
                  {editingProduct && editingProduct._id === product._id ? (
                    <input
                      type='text'
                      name='name'
                      value={editingProduct.name}
                      onChange={handleChange}
                      className='w-full p-1 border rounded'
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td className='py-3 px-4'>
                  {editingProduct && editingProduct._id === product._id ? (
                    <input
                      type='number'
                      name='price_before_discount'
                      value={editingProduct.price_before_discount}
                      onChange={handleChange}
                      className='w-full p-1 border rounded'
                    />
                  ) : (
                    `₫${product.price_before_discount.toLocaleString()}`
                  )}
                </td>
                <td className='py-3 px-4'>
                  {editingProduct && editingProduct._id === product._id ? (
                    <input
                      type='number'
                      name='price'
                      value={editingProduct.price}
                      onChange={handleChange}
                      className='w-full p-1 border rounded'
                    />
                  ) : (
                    `₫${product.price.toLocaleString()}`
                  )}
                </td>
                <td className='py-3 px-4'>
                  {editingProduct && editingProduct._id === product._id ? (
                    <input
                      type='number'
                      name='quantity'
                      value={editingProduct.quantity}
                      onChange={handleChange}
                      className='w-full p-1 border rounded'
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td className='py-3 px-4'>
                  {editingProduct && editingProduct._id === product._id ? (
                    <select
                      name='category'
                      value={editingProduct.category._id}
                      onChange={handleCategoryChange}
                      className='w-full p-1 border rounded'
                    >
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    product.category.name
                  )}
                </td>
                <td className='py-3 px-4'>
                  {editingProduct && editingProduct._id === product._id ? (
                    <button
                      onClick={handleSave}
                      className='text-green-500 hover:text-green-700 mr-2'
                      disabled={loading}
                    >
                      Lưu
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(product)} className='text-blue-500 hover:text-blue-700 mr-2'>
                      <FaEdit />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(product._id)}
                    className='text-red-500 hover:text-red-700'
                    disabled={loading}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
