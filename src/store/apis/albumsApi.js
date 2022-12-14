import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005'
  }),
  endpoints(builder) {
    return {
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'Album', id: user.id }]
        },
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName()
            }
          };
        }
      }),

      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          return [{ type: 'Album', id: user.id }];
        }, // 'Albums' is up to you
          // when you define providesTags as a function, that function
          // will automatically be called with arguements(result, error, arg)
          // arg === { id:1, name: 'Myra' } (whatever we passed to useFetchAlbumsQuery)
        query: (user) => {
          return {
            url: '/albums', // baseUrrl + url => http:localhost:3005/albums
            params: {
              userId: user.id,
            },
            method: 'GET',
          };
        }
      })
    };
  }
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
