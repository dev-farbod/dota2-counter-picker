import React, { useContext, useEffect, useState } from 'react';
import "./selector.scss"
import { Context } from "../../container/Context"
const Selector = () => {

    const context = useContext(Context)
    const { selected,score } = context


    const [sort, setSort] = useState({
        green: [],
        red: []
    })


    


    const sort_score = () => {

        let sorted = {
            green: [],
            red: []
        }

        let green = [...score].filter(each => each.score > 0),
            red = [...score].filter(each => each.score < 0),
            max_green = 0,
            max_red = 0

        if (green.length > 0) {
            max_green = green[0].score
        }

        if (red.length > 0) {
            max_red = Math.abs(red[red.length - 1].score)
        }


        green.forEach(each => {
            const { name, score } = each
            sorted.green.push({
                name, score,
                persent: Math.round(score * 100 / max_green)
            })
        })

        red.forEach(each => {
            const { name, score } = each
            sorted.red.push({
                name, score,
                persent:Math.abs( Math.round(score * 100 / max_red))
            })
        })

        setSort({
            green:sorted.green,
            red:sorted.red.reverse()
        })


    }

    useEffect(() => {
        sort_score()
    }, [score])

    return (
        <div className="selector">

            <div className="title">
                Dota2 counter picker
            </div>

            <div className="selected">
                <div className="selected-container">
                    {selected.map(each => <div className="each-selected">
                        {each.img ? <img src={each.img} onClick={() => { context.remove_hero(each.name) }} /> : null}
                    </div>)}
                </div>
            </div>
            <div className="sugestion">
                <div className="bg"></div>
                <div className="scors">
                    <div className="green">
                        <div className="s-title g">
                            pick
                        </div>

                        <div className="score-show">
                            {sort.green.map(each =>
                                <div className="each-score-green">
                                    <div className="name">
                                        {each.name.toUpperCase()}
                                    </div>
                                    <div className="bar">
                                        <div className="bar-fill" style={{ width: `${each.persent}%` }}>hi</div>
                                    </div>
                                    <div className="persent">
                                        {each.score}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="red">
                        <div className="s-title r">
                            avoid
                        </div>
                        <div className="score-show">
                            {sort.red.map(each =>
                                <div className="each-score-green red">
                                    <div className="name">
                                        {each.name.toUpperCase()}
                                    </div>
                                    <div className="bar">
                                        <div className="bar-fill" style={{ width: `${each.persent}%` }}>hi</div>
                                    </div>
                                    <div className="persent">
                                        {each.score}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Selector;