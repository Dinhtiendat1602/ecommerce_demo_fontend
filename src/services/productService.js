import api from './api'

/**
 * [BÀI TẬP] Lấy danh sách sản phẩm (dùng chung cho cả trang user và admin)
 *
 * API: GET /products
 * params gồm:
 *  - keyword: từ khóa tìm kiếm theo tên
 *  - categoryId: id của category cần lọc (rỗng = tất cả)
 *  - sort: 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc'
 *  - page: trang hiện tại
 *  - limit: số sản phẩm mỗi trang
 *
 * Kết quả cần trả về dạng: { data: [...danh sách sản phẩm], total: tổng số sản phẩm }
 */
export const getProductList = async (params) => {
  const { keyword, sort, ...rest } = params || {}
  const [sortColumn, sortOrder] = sort ? sort.split('_') : ['id', 'asc']

  const response = await api.get('/products', {
    params: {
      ...rest,
      q: keyword || undefined,
      sort: sortColumn,
      order: sortOrder,
    },
  })
  const result = response.data

  if (Array.isArray(result)) {
    return { data: result, total: result.length }
  }

  return {
    data: result?.data || [],
    total: result?.meta?.total ?? result?.total ?? result?.data?.length ?? 0,
  }
}

/**
 * [BÀI TẬP] Lấy chi tiết 1 sản phẩm theo id
 *
 * API: GET /products/:id
 * Kết quả cần trả về: object sản phẩm { id, name, price, image, description, ... }
 */
export const getProductDetail = async (id) => {
  const response = await api.get(`/products/${id}`)
  return response.data?.data || response.data
}

/**
 * [BÀI TẬP] Lấy danh sách category (dùng để render radio filter)
 *
 * API: GET /categories
 * Kết quả cần trả về: mảng category [{ id, name }, ...]
 */
export const getCategoryList = async () => {
  const response = await api.get('/categories')
  const result = response.data
  return result?.data || result
}

/**
 * [BÀI TẬP] Tạo mới 1 sản phẩm
 *
 * API: POST /products
 * body: { name, price, categoryId }
 * Kết quả cần trả về: object sản phẩm vừa tạo
 */


/**
 * [BÀI TẬP] Cập nhật 1 sản phẩm theo id
 *
 * API: PATCH /products/:id
 * body: { name, price, categoryId }
 * Kết quả cần trả về: object sản phẩm sau khi cập nhật
 */


/**
 * [BÀI TẬP] Xóa 1 sản phẩm theo id
 *
 * API: DELETE /products/:id
 */
