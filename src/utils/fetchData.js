import axios from "axios";

// export const fetchData = (url) => {

//     const user = JSON.parse(window.localStorage.getItem("user"))

//     return fetch(url, {
//         headers: {'Authorization': `bearer ${user.token}`},
    
//     }).then((res) => res.json());

// }


export const fetchData = (url) => {

    const user = JSON.parse(window.localStorage.getItem("user"))

    return axios.get(url, {
        headers: {'Authorization': `bearer ${user.token}`},
    
    })
}
