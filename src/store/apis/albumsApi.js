import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// DEVELOPMENT ONLY!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
//

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    fetchFn: async(...args) => {
      // REMOVE FOR PRODUCTION
      await pause(1000);
      return fetch(...args);
    }
  }),
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: 'Album', id: album.id }]
        },
        query: (album) => {
          return {
            method: 'DELETE',
            url: `/albums/${album.id}`
          }
        }
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'UsersAlbums', id: user.id }]
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
          const tags = result.map(album => {
            return { type: 'Album', id: album.id }
          });
          tags.push({ type: 'UsersAlbums', id: user.id});
          return tags;
        }, // 'Albums' is up to you
          // when you define providesTags as a function, that function
          // will automatically be called with arguements(result, error, arg)
          // arg === { id:1, name: 'Myra' } (whatever we passed to useFetchAlbumsQuery)
          // result is the data fetched from the backend server (list of albums)
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

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };
