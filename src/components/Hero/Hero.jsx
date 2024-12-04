import React, { useState, useEffect } from "react";
import "./Hero.css";

function Hero(props) {
    let [page, setPage] = useState(1);
    let [data, setData] = useState([]);
    let [search, setSearch] = useState("");

    async function fetchApi() {
        props.changeLoad(30);
        let api;

        if (search.length > 0) {
            api = await fetch(
                `https://api.unsplash.com/search/photos/?page=${page}&per_page=9&query=${search}&client_id=Yhlw08S-888AGB3w6fEnlEe2hp6sYZF6CwG2SzqLDcA`
            );

            const data = await api.json();
            props.changeLoad(60);
            setData(data.results);
            props.changeLoad(100);
            setTimeout(() => {
                props.changeLoad(0);
            }, 100);

            return;
        }

        api = await fetch(
            `https://api.unsplash.com/photos/?page=${page}&per_page=9&client_id=Yhlw08S-888AGB3w6fEnlEe2hp6sYZF6CwG2SzqLDcA`
        );

        const data = await api.json();
        props.changeLoad(60);
        setData(data);
        props.changeLoad(100);

        setTimeout(() => {
            props.changeLoad(0);
        }, 100);
    }

    useEffect(() => {
        fetchApi();
    }, [page, search]);

    return (
        <>
            <main id="hero">
                <div className="row">
                    <div className="col-md-7">
                        <h2>Image Gallery</h2>
                    </div>
                    <div className="col-md-5 search">
                        <input type="text" onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                setPage(1);
                                setSearch(e.target.value);
                            }
                        }} className="form-control" placeholder="Search Here..." />
                    </div>
                </div>
                <hr />
                <div className="imgs row">
                    <div className="col-md-4">
                        {data.map((e, i) => {
                            return (
                                i < 3 && <div className="card m-3">
                                    <img src={e.urls.regular} alt={e.alt_description && e.alt_description} />
                                    <a className="btn btn-light download" href={e.links.download}><i className="fa-solid fa-arrow-down"></i></a>

                                    <div className="likes">
                                        <i className="fa-solid fa-heart"></i>
                                        <span>{e.likes}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-md-4">
                        {data.map((e, i) => {
                            return (
                                i > 2 && i < 6 && <div className="card m-3">
                                    <img src={e.urls.regular !== null ? e.urls.regular : ""} alt={e.alt_description && e.alt_description} />
                                    <a className="btn btn-light download" href={e.links.download}><i className="fa-solid fa-arrow-down"></i></a>

                                    <div className="likes">
                                        <i className="fa-solid fa-heart"></i>
                                        <span>{e.likes}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-md-4">
                        {data.map((e, i) => {
                            return (
                                i > 5 && i < 9 && <div className="card m-3">
                                    <img src={e.urls.regular} alt={e.alt_description && e.alt_description} />
                                    <a className="btn btn-light download" href={e.links.download}><i className="fa-solid fa-arrow-down"></i></a>

                                    <div className="likes">
                                        <i className="fa-solid fa-heart"></i>
                                        <span>{e.likes}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
            <div className="pagination">
                <a href="#hero" onClick={() => { setPage(page > 1 ? page - 1 : page); }}><i className="fa-solid fa-arrow-left"></i>&ensp;Prev</a>

                {page > 1 ? <a href="#hero" className={parseInt(page) === page - 1 ? "active" : ""} onClick={(e) => { setPage(page - 1); }}>{page - 1}</a> : ""}
                <a href="#hero" className={parseInt(page) === page ? "active" : ""} onClick={(e) => { setPage(page); }}>{page}</a>
                <a href="#hero" className={parseInt(page) === page + 1 ? "active" : ""} onClick={(e) => { setPage(page + 1); }}>{page + 1}</a>
                <a href="#hero" className={parseInt(page) === page + 2 ? "active" : ""} onClick={(e) => { setPage(page + 2); }}>{page + 2}</a>
                <span>. . . . . . . . . .</span>
                <a href="#hero" onClick={() => { setPage(page < page + 3 ? page + 1 : page); }}><i className="fa-solid fa-arrow-right"></i>&ensp;Next</a>
            </div>
        </>
    );
}

export default Hero;