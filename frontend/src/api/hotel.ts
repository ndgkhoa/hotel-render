import { BookingFormData, HotelSearchResponse, HotelType, PaymentIntentResponse, SearchParams } from '../shared/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
        method: 'POST',
        credentials: 'include',
        body: hotelFormData,
    })
    if (!response.ok) {
        throw new Error('Failed to add hotel')
    }
    return response.json()
}

export const fetchHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`)
    if (!response.ok) {
        throw new Error('Error fetching hotel')
    }
    return response.json()
}

export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error('Error fetching hotels')
    }
    return response.json()
}

export const updateMyHotelById = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelFormData.get('hotelId')}`, {
        method: 'PUT',
        body: hotelFormData,
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error('Failed to update Hotel')
    }
    return response.json()
}

export const searchHotel = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams()
    queryParams.append('destination', searchParams.destination || '')
    queryParams.append('checkIn', searchParams.checkIn || '')
    queryParams.append('checkOut', searchParams.checkOut || '')
    queryParams.append('adultCount', searchParams.adultCount || '')
    queryParams.append('childCount', searchParams.childCount || '')
    queryParams.append('page', searchParams.page || '')
    queryParams.append('maxPrice', searchParams.maxPrice || '')
    queryParams.append('sortOption', searchParams.sortOption || '')
    searchParams.facilities?.forEach((facility) => queryParams.append('facilities', facility))
    searchParams.types?.forEach((type) => queryParams.append('types', type))
    searchParams.stars?.forEach((star) => queryParams.append('stars', star))
    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)

    if (!response.ok) throw new Error('Error fetching hotels')
    return response.json()
}

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)
    if (!response.ok) {
        throw new Error('Error fetching Hotels')
    }
    return response.json()
}

export const createPaymentIntent = async (hotelId: string, numberOfNights: string): Promise<PaymentIntentResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ numberOfNights }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error('Error fetching payment intent')
    }
    return response.json()
}

export const createRoomBooking = async (formData: BookingFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error('Error booking room')
    }
}

export const fetchMyBookings = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        credentials: 'include',
    })
    if (!response.ok) {
        throw new Error('Unable to fetch bookings')
    }
    return response.json()
}
