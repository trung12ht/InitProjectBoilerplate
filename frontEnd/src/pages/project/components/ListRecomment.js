import React, { Component } from "react";
import Slider from "react-slick";
import '../stylesheets/list.recomment.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecommendCards from "./RecommendCards";

export default class ListRecomment extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3
        };
        return (
            <div className="container">
                <Slider {...settings}>
                    <div>
                        <RecommendCards labeltxt="3 Users" name="name" content="Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-  " laguage="langue" technologi="tech" user="user" update="update" index="1" id="2"></RecommendCards>
                    </div>
                    <div>
                        <RecommendCards labeltxt="1 Users" name="name" content="Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-  " laguage="langue" technologi="tech" user="user" update="update" index="1" id="2"></RecommendCards>
                    </div>
                    <div>
                        <RecommendCards labeltxt="1 Users" name="name" content="Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-  " laguage="langue" technologi="tech" user="user" update="update" index="1" id="2"></RecommendCards>
                    </div>
                    <div>
                        <RecommendCards name="name" content="Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-  " laguage="langue" technologi="tech" user="user" update="update" index="1" id="2"></RecommendCards>
                    </div>
                    <div>
                        <RecommendCards name="name" content="Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-  " laguage="langue" technologi="tech" user="user" update="update" index="1" id="2"></RecommendCards>
                    </div>
                    <div>
                        <RecommendCards name="name" content="Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-  " laguage="langue" technologi="tech" user="user" update="update" index="1" id="2"></RecommendCards>
                    </div>
                    <div>
                        <RecommendCards name="name" content="Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-  " laguage="langue" technologi="tech" user="user" update="update" index="1" id="2"></RecommendCards>
                    </div>
                    <div>
                        <RecommendCards name="name" content="Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-  " laguage="langue" technologi="tech" user="user" update="update" index="1" id="2"></RecommendCards>
                    </div>
                    <div>
                        <RecommendCards name="name" content="Assign arrow function to a variable before exporting as module default  import/no-anonymous-default-  " laguage="langue" technologi="tech" user="user" update="update" index="1" id="2"></RecommendCards>
                    </div>
                </Slider>
            </div>
        );
    }
}