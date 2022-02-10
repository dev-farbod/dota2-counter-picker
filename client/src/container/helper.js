import axios from "axios"

const api_1 = "http://185.44.114.247:5050"

export const get_hero_list = async () => {
    let { data } = await axios.get(`${api_1}/hero/imgs`)
    return data
}

export const search = (all, search) => {
    if (search.length < 2) return all
    let filter = all.filter(hero => hero.name.toLowerCase().indexOf(search) > -1)
    return filter
}