import React, { useContext, useEffect, useState } from 'react';
import { get_hero_list, search } from '../../container/helper';
import "./heros.scss"
import { Context } from "../../container/Context"

const Heros = () => {

    const [base, setBase] = useState([])
    const [heros, setHeros] = useState([])
    const [fHeros, setFheros] = useState([])

    const context = useContext(Context)
    const { add_hero, selected } = context


    const select_hero = (hero) => {
        let index = selected.findIndex(each => each.name === null)
        if (index === -1) return
        add_hero(hero)
        document.querySelector("#search").value = ""
    }

    useEffect(() => {
        let selected_names = []
        context.selected.forEach(each => {
            selected_names.push(each.name)
        })
        let new_heros = [...base].filter(each => !selected_names.includes(each.name))
        let new_Fheros = [...new_heros].filter(each => !selected_names.includes(each.name))
        setHeros(new_heros)
        setFheros(new_Fheros)
    }, [context.selected])

    useEffect(() => {
        let get_heros = async () => {
            let _heros = await get_hero_list()
            setBase(_heros)
            setHeros(_heros)
            setFheros(_heros)
        }
        get_heros()
    }, [])

    const search_func = () => {
        let input = document.querySelector("#search").value
        let filterd = search(heros, input)
        setFheros(filterd)
    }

    return (
        <div className="hero-list">
            <div className="search">
                <i className="fas fa-search" />
                <input type="text" id="search" onChange={search_func} />
            </div>
            <div className="list">
                <div className="list-container">
                    {fHeros.map(hero =>
                        <div className="each-hero" onClick={() => { select_hero(hero) }}>
                            <img src={hero.imgs.hero_image} alt="" />
                            <div className="name">{hero.name}</div>

                        </div>)}
                </div>
            </div>
        </div>
    );
}

export default Heros;