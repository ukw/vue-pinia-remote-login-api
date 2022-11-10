// @ts-check
import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'

/**
 * Simulate a login
 * @param {string} a
 * @param {string} p
 */
let credentials = {
    "email": "helloukw@ukw.com",
    "password": "helloukw@ukw.com",
}
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost'

// const token = axios.get('/sanctum/csrf-cookie').then(response => (
//     console.log("response= ", response)
// ))
// function apiLogin(u, p) {
//     await axios.get('/sanctum/csrf-cookie')
//     await axios.post('/login', credentials)

//     return dispatch('me')
// }
function apiLogin(a, p) {
    // console.log("apiLogin a=", a, " p= ", p)
    // const token = axios.get('/sanctum/csrf-cookie');
    // console.log("token= ", token)
    // if (a === 'ed' && p === 'ed') return Promise.resolve({ isAdmin: true })
    // if (p === 'ed') return Promise.resolve({ isAdmin: false })
    // return Promise.reject(new Error('invalid credentials'))

    if (a.length > 0 && p.length > 0) {
        axios.get("/sanctum/csrf-cookie").then(() => {
            axios
                .post("api/login", {
                    email: a,
                    password: p,
                })
                .then((response) => {
                    //set response in local storage
                    // localStorage.setItem('user', JSON.stringify(response.data))
                    console.log("response ", response)
                })
                .catch(function (error) {
                    console.error(error);
                });
        });
    }
    return Promise.reject(new Error('invalid credentials'))
}

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        name: 'helloukw@ukw.com',
        isAdmin: true,
        token: ''
    }),

    actions: {
        logout() {
            this.$patch({
                name: '',
                isAdmin: false,
            })

            // we could do other stuff like redirecting the user
        },

        /**
         * Attempt to login a user
         * @param {string} user
         * @param {string} password
         */
        async login(user, password) {
            const userData = await apiLogin(user, password)

            this.$patch({
                name: user,
                ...userData,
            })
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
