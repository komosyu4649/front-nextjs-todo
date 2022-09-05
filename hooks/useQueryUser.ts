import { User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'

export const useQueryUser = () => {
  const router = useRouter()
  const getUser = async () => {
    const { data } = await axios.get<Omit<User, 'hashedPassword'>>(
      `${process.env.NEXT_PUBLIC_API_URL}/user`
    )
    return data
  }
  return useQuery<Omit<User, 'hashedPassword'>>({
    queryKey: ['user'],
    queryFn: getUser,
    onError: (error: any) => {
      if (error.response.status === 401 || error.response.status === 403) {
        router.push('/')
      }
    },
  })
}
