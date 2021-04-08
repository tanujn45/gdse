import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import "../assets/css/Product.css";
import BgText from "../components/BgText";
import heroInfo1 from "../assets/img/cycles/heroInfo1.png";
import logoWhite from "../assets/img/logowhite.png";
import triUp from "../assets/img/designs/triUp.svg";
import triDown from "../assets/img/designs/triDown.svg";
import blackPoly from "../assets/img/designs/productBlackPoly.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay, EffectFade } from "swiper/core";
import "swiper/swiper.scss";
import 'swiper/components/navigation/navigation.scss';
import "swiper/components/pagination/pagination.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import requestUrls from "../constants/requestUrls";
import { useHistory } from "react-router";

SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

function Product(props) {
    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    const [productInfo, setProductInfo] = useState({});
    const [reRender, setReRender] = useState(true);
    const history = useHistory();

    useEffect(() => {
        getProductInfo();
        getProducts();
        getCategories();
    }, []);

    function getProductInfo() {
        axios
            .get(
                `${requestUrls.base_url}product/${props.match.params.product_slug}/info`
            )
            .then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    setProductInfo(res.data.payload);
                    setReRender(!reRender);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function getProducts() {
        axios
            .get(
                `${requestUrls.base_url}category/${props.match.params.category_slug}/product/list`
            )
            .then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    setProducts(res.data.payload.products);
                    setReRender(!reRender);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function getCategories() {
        axios
            .get(`${requestUrls.base_url}${requestUrls.category_list}`)
            .then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    setCategories(res.data.payload.categories);
                    setReRender(!reRender);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    console.log(productInfo);

    return (
        <div>
            <Header theme="black" />
            {productInfo != undefined && productInfo != null && (
                <>
                    <section
                        id="productho-hero"
                        className="pan-background d-flex align-items-center"
                    >
                        <BgText text={productInfo.landing_page_bg_text} color="green" />
                        <div className="container">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-md-6">
                                    <h5 className="green">{productInfo.landing_page_title1}</h5>
                                    <h4>{productInfo.landing_page_title2}</h4>
                                    <div className="d-block mt-5">
                                        <Button
                                            text="Products"
                                            type="solid"
                                            className="mr-3 mb-3"
                                        />
                                        <Button
                                            text="Virtual tour"
                                            type="border"
                                            border="green"
                                            className="mb-3"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <img
                                        src={productInfo.landing_page_image}
                                        alt="Cycle"
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="info-poly">
                        <div className="container">
                            <div className="row justify-content-center text-center">
                                {productInfo.info_page_metrics_2 &&
                                    productInfo.info_page_metrics_2.map((metric, index) => {
                                        let metrics = metric.split("-");
                                        return (
                                            <div className="col-lg-2 col-md-3 col-6 my-4">
                                                <div className="outside-box">
                                                    <img
                                                        src={blackPoly}
                                                        alt="Poly"
                                                        className="img-fluid"
                                                    />
                                                    <div className="inside-text">
                                                        <h2 className="text-uppercase">{metrics[0]}</h2>
                                                    </div>
                                                </div>
                                                <h2 className="mt-3">{metrics[1]}</h2>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </section>

                    <section id="info-text" className="pan-background">
                        <div className="container">
                            <p>{productInfo.info_page_content_1}</p>
                            <Button
                                text="Download Now"
                                type="border"
                                border="red"
                                className="mt-3"
                            />
                        </div>
                    </section>
                </>
            )}

            <section id="product-options">
                <div className="container">
                    <h2>Explore Design and Color Options</h2>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        loop
                        autoplay
                        navigation>
                        <SwiperSlide>
                            <div className="text-center">
                                <img src={heroInfo1} alt="Image" className="img-fluid" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="text-center">
                                <img src={heroInfo1} alt="Image" className="img-fluid" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>

            <section id="products-top">
                <div className="container">
                    <h2 className="mb-5">Similar in this category</h2>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        loop
                        autoplay
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                            992: {
                                slidesPerView: 3,
                            },
                        }}
                        pagination={{ clickable: true }}
                    >
                        {products != undefined &&
                            products != null &&
                            products.map((product, index) => {
                                return (
                                    <SwiperSlide>
                                        <div className="products-top-box py-4 px-4 d-flex flex-column justify-content-between">
                                            <img src={triUp} alt="TriUp" className="triUp" />
                                            <img src={triDown} alt="TriDown" className="triDown" />
                                            <img
                                                src={product.image_url}
                                                alt="Cycle"
                                                className="img-fluid"
                                            />
                                            <div className="d-flex flex-column justify-content-center">
                                                <h5 className="text-center">{product.name}</h5>
                                                <button
                                                    onClick={() =>
                                                        history.push(`${props.match.url}/${product.slug}`)
                                                    }
                                                    className="bg-transparent border-0 mx-auto mt-4"
                                                >
                                                    <Button text="Discover" type="solid" />
                                                </button>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                </div>
            </section>

            <section id="home-types">
                <div className="container">
                    <div className="d-flex align-items-center flex-wrap mb-5">
                        <h1 className="white mr-3 mb-0">More with</h1>
                        <img src={logoWhite} alt="Logo" />
                    </div>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        loop
                        autoplay
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                            992: {
                                slidesPerView: 3,
                            },
                        }}
                        pagination={{ clickable: true }}
                    >
                        {categories != null &&
                            categories != undefined &&
                            categories.map((category, index) => {
                                return (
                                    <SwiperSlide>
                                        <div
                                            className="home-types-box d-flex flex-column justify-content-between"
                                            style={{
                                                backgroundImage: `url(${category.image_url})`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover",
                                            }}
                                        >
                                            <h2 className="white">{category.title}</h2>
                                            <button
                                                onClick={() => history.push(`/${category.slug}`)}
                                                className="bg-transparent border-0 text-left w-100"
                                            >
                                                <Button text="Discover" type="solid" isDark="dark" />
                                            </button>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Product;
