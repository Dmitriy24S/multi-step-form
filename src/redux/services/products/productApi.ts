import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const productApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  endpoints: (builder) => ({
    // ? Mutation: Create a product
    createProduct: builder.mutation<IProduct, FormData>({
      invalidatesTags: [{ id: 'LIST', type: 'Products' }],
      query(data) {
        return {
          body: data,
          credentials: 'include',
          method: 'POST',
          url: 'products',
        }
      },
      transformResponse: (response: { data: { product: IProduct } }) =>
        response.data.product,
    }),

    // ? Mutation: Delete product
    deleteProduct: builder.mutation<null, string>({
      invalidatesTags: [{ id: 'LIST', type: 'Products' }],
      query(id) {
        return {
          credentials: 'include',
          method: 'DELETE',
          url: `products/${id}`,
        }
      },
    }),

    // ? Query: Get a single product
    getProduct: builder.query<IProduct, string>({
      providesTags: (_result, _error, id) => [{ id, type: 'Products' }],
      query(id) {
        return `products/${id}`
      },
      transformResponse: (
        response: { data: { product: IProduct } },
        _args,
        _meta,
      ) => response.data.product,
    }),

    // ? Query: Get All Products
    getProducts: builder.query<IProduct[], void>({
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                id,
                type: 'Products' as const,
              })),
              { id: 'LIST', type: 'Products' },
            ]
          : [{ id: 'LIST', type: 'Products' }],
      query() {
        return 'products'
      },
      // ? Transform the result to prevent nested data
      transformResponse: (response: { data: { products: IProduct[] } }) =>
        response.data.products,
    }),

    // ? Mutation: Update Product
    updateProduct: builder.mutation<
      IProduct,
      { id: string; formData: FormData }
    >({
      invalidatesTags: (result, _error, { id }) =>
        result
          ? [
              { id, type: 'Products' },
              { id: 'LIST', type: 'Products' },
            ]
          : [{ id: 'LIST', type: 'Products' }],
      query({ id, formData }) {
        return {
          body: formData,
          credentials: 'include',
          method: 'PATCH',
          url: `products/${id}`,
        }
      },
      transformResponse: (response: { data: { product: IProduct } }) =>
        response.data.product,
    }),
  }),
  reducerPath: 'productApi',
  tagTypes: ['Products'],
})

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  usePrefetch,
} = productApi

type IProduct = {
  _id: string
  name: string
  avgRating: number
  numRating: number
  price: number
  description: string
  countInStock: number
  quantity?: number
  imageCover: string
  images: string[]
  category: string
  createdAt: Date
  updatedAt: Date
  slug: string
  id: string
}
