import { default as axios } from 'axios';


const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
	withCredentials: true,
	headers: { 'API-KEY': '7eb291b4-dad0-4e4f-9b01-2c556d91e838' },
});

export const usersAPI = {
	GET_USERS: (currentPage, pageSize) => {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
	}, FOLLOW: (id) => {
		return instance.post(`follow/${id}`).then(response => response.data);
	}, UNFOLLOW: (id) => {
		return instance.delete(`follow/${id}`).then(response => response.data);
	},
};

export const authAPI = {
	IS_REGISTERED: () => {
		return instance.get('auth/me').then(response => response.data);
	},
};

export const profileAPI = {
	GET_PROFILE_USER: (userId) => {
		return instance.get(`profile/${userId}`).then(response => response);
	}, GET_PROFILE_STATUS: (userId) => {
		return instance.get(`profile/status/${userId}`).then(response => response);
	}, UPDATE_PROFILE_STATUS: (status) => {
		return instance.put(`profile/status`, { status }).then(response => response.data);
	}, UPDATE_PROFILE_PHOTO: (photo) => {
		let formData = new FormData();
		formData.append('image', photo);
		return instance.put(`profile/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => response.data);
	}, UPDATE_PROFILE: (data) => {
		return instance.put('profile', data).then(response => response.data);
	}
};

export const loginAPI = {
	LOGIN: (email, password, captcha) => {
		return instance.post(`auth/login`, { email, password, captcha }, {}).then(response => response.data);
	}, LOGOUT: (email, password) => {
		return instance.delete(`auth/login`,).then(response => response.data);
	}, CAPTCHA: () => {
		return instance.get(`security/get-captcha-url`).then(response => response.data);
	}
};