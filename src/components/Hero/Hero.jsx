import React, { useState, useEffect } from "react";
import "./Hero.css";

function Hero(props) {
    let [page, setPage] = useState(1);
    let [data, setData] = useState([]);
    let [search, setSearch] = useState("");
    let [downOptions, setDownOptions] = useState("");

    async function fetchApi() {
        props.changeLoad(30);
        let api;

        if (search.length > 0) {
            api = await fetch(
                `https://api.unsplash.com/search/photos/?page=${page}&per_page=12&query=${search}&client_id=Yhlw08S-888AGB3w6fEnlEe2hp6sYZF6CwG2SzqLDcA`
            );

            const data = await api.json();
            props.changeLoad(60);
            setData(data.results);
            setTimeout(() => {
                props.changeLoad(100);
            }, 100);
            setTimeout(() => {
                props.changeLoad(0);
            }, 300);

            return;
        }

        api = await fetch(
            `https://api.unsplash.com/photos/?page=${page}&per_page=12&client_id=Yhlw08S-888AGB3w6fEnlEe2hp6sYZF6CwG2SzqLDcA`
        );

        const data = await api.json();
        props.changeLoad(60);
        setData(data);

        setTimeout(() => {
            props.changeLoad(100);
        }, 100);
        setTimeout(() => {
            props.changeLoad(0);
        }, 300);
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
                <div className="imgs row m-0">
                    {data.map((e, i) => {
                        return (
                            <div className="card">

                                <div className="profile">
                                    {e.user?.profile_image?.large ? <img className="profile-img" src={e.user.profile_image.large} /> : ""}
                                    {e.user?.name ? <span>{e.user.name}</span> : ""}
                                </div>

                                <img className="original-img" src={e.urls.regular} alt={e.alt_description && e.alt_description} onClick={()=> {
                                    setDownOptions("");
                                }} />

                                <button className="btn btn-light download" onClick={()=> {
                                    setDownOptions(e.links.download);
                                }}><i className="fa-solid fa-arrow-down"></i></button>

                                <div className="likes">
                                    <i className="fa-solid fa-heart"></i>
                                    <span>{e.likes}</span>
                                </div>
                                <div className="download-options" style={{display: downOptions===e.links.download?"block":"none"}}>
                                    <a href={`${e.links.download}&amp;force=true&amp;w=640&amp;h=480`} download="">Small <span>(640 x 480)</span></a>
                                    <a href={`${e.links.download}&amp;force=true&amp;w=1920&amp;h=1400`} download="">Medium <span>(1920 x 1440)</span></a>
                                    <a href={`${e.links.download}&amp;force=true&amp;w=2400&amp;h=1800`} download="">Large <span>(2400 x 1800)</span></a>
                                    <a href={`${e.links.download}&amp;force=true&amp;w${e.width}&amp;h=${e.height}`} download="">Original <span>({e.width} x {e.height})</span></a>
                                </div>
                            </div>
                        )
                    })}
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