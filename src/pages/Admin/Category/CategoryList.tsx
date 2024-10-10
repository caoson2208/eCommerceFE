import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import Button from 'src/components/Button'
import { Link } from 'react-router-dom'

export interface Category {
  _id: string
  name: string
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(false)

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/categories')
        setCategories(response.data.data)
      } catch (error) {
        console.error('Error fetching categories', error)
      }
    }

    fetchCategories()
  }, [])

  // Handle editing category
  const handleEdit = (category: Category) => {
    setEditingCategory({ ...category })
  }

  // Handle saving updated category
  const handleSave = async () => {
    if (editingCategory) {
      try {
        setLoading(true)
        const response = await axios.put(`http://localhost:4000/api/categories/${editingCategory._id}`, editingCategory)
        const updatedCategories = categories.map((cat) => (cat._id === editingCategory._id ? response.data.data : cat))
        setCategories(updatedCategories)
        setEditingCategory(null)
        alert('Category updated successfully!')
      } catch (error) {
        console.error('Error updating category', error)
      } finally {
        setLoading(false)
      }
    }
  }

  // Handle deleting category
  const handleDelete = async (id: string) => {
    try {
      setLoading(true)
      await axios.delete(`http://localhost:4000/api/categories/${id}`)
      const updatedCategories = categories.filter((cat) => cat._id !== id)
      setCategories(updatedCategories)
      alert('Category deleted successfully!')
    } catch (error) {
      console.error('Error deleting category', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle adding a new category
  const handleAdd = async () => {
    const newCategory: Category = {
      _id: (categories.length + 1).toString(), // This should be managed by the server
      name: 'New Category'
    }

    try {
      setLoading(true)
      const response = await axios.post('http://localhost:4000/api/categories/', newCategory)
      setCategories([...categories, response.data.data])
      alert('Category added successfully!')
    } catch (error) {
      console.error('Error adding category', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, [name]: value })
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Quản lý danh mục</h1>
      <div className='mt-3'>
        <Link to='/admin/products/create'>
          <Button className='ml-auto mb-4 bg-[#1e6ddb] text-white px-2 py-2 rounded hover:bg-[#1e6ddb]/80 transition-colors flex items-center'>
            <div className='flex items-center'>
              <FaPlus className='mr-2' /> Thêm danh mục
            </div>
          </Button>
        </Link>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='py-3 px-4 text-left'>ID</th>
              <th className='py-3 text-left'>Tên danh mục</th>
              <th className='py-3 text-left col-span-2'></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className='border-b border-gray-200 hover:bg-gray-100'>
                <td className='py-3 px-4'>{category._id}</td>
                <td className='py-3 px-4'>
                  {editingCategory && editingCategory._id === category._id ? (
                    <input
                      type='text'
                      name='name'
                      value={editingCategory.name}
                      onChange={handleChange}
                      className='w-full p-1 border rounded'
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td className='py-3 px-4'>
                  {editingCategory && editingCategory._id === category._id ? (
                    <button
                      onClick={handleSave}
                      className='text-green-500 hover:text-green-700 mr-2'
                      disabled={loading}
                    >
                      Save
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(category)} className='text-blue-500 hover:text-blue-700 mr-2'>
                      <FaEdit />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(category._id)}
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
