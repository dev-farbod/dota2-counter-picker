import React, { createContext, useEffect, useState } from 'react'
import { io } from "socket.io-client"
export const Context = createContext();

const ContextProvider = (props) => {

    const [selected, setSelected] = useState([
        { name: null, img: null },
        { name: null, img: null },
        { name: null, img: null },
        { name: null, img: null },
        { name: null, img: null },
    ])

    const [score, setScore] = useState([])
    const [socket_, setSocket] = useState(null)

    useEffect(() => {

        let socket = io("http://localhost:4000")
        socket.on("connection")
        socket.on("res", (data) => {
            setScore(data.scors)
        })
        setSocket(socket)

    }, [])




    const add_hero = (hero) => {
        let new_seleced = [...selected]
        let index = new_seleced.findIndex(each => each.name === null)
        if (index === -1) return
        const { name, imgs } = hero
        new_seleced[index] = {
            name,
            img: imgs.hero_image
        }
        setSelected(new_seleced)
        socket_.emit("new_hero", { hero: hero.name })
    }


    const remove_hero = (hero) => {
        let new_seleced = [...selected]
        let index = new_seleced.findIndex(each => each.name === hero)
        new_seleced[index] = {
            name: null,
            img: null
        }
        setSelected(new_seleced)
        socket_.emit("remove_single", { hero})

    }


    return (
        <Context.Provider value={{
            selected, add_hero, remove_hero,
            score
        }}>
            {props.children}
        </Context.Provider>
    )
}


export default ContextProvider