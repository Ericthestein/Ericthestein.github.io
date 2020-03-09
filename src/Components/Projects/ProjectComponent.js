import React, {Component} from "react";
//import ImageGallery from "react-image-gallery/src/ImageGallery.jsx";
import "./Projects.css"
// import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import YouTube from 'react-youtube';

let monthWords = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
}

class MediaComponent extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        let {data} = this.props
        switch(data.type) {
            case "video":
                let imageUrl = `http://img.youtube.com/vi/${data.youtubeVideoID}/0.jpg`
                let videoUrl = `https://www.youtube.com/watch?v=${data.youtubeVideoID}`
                const opts = {

                    playerVars: { // https://developers.google.com/youtube/player_parameters
                        autoplay: 1
                    }
                };
                return(
                    <div className="Media-Frame">
                        <YouTube
                            videoId={data.youtubeVideoID}
                            className="Youtube-Frame"
                            opts={opts}
                            onReady={null}
                        />
                    </div>
                )
            case "image":
                return(
                    <div className="Media-Frame">
                        <img
                            className="Project-Image"
                            src={data.src}
                        />
                    </div>
                )
        }
    }
}

export default class ProjectComponent extends Component {
    constructor(props) {
        super(props)
    }

    getCategoriesString = (categories) => {
        let catString = ""//"Categories: "
        for (var i = 0; i < categories.length; i++) {
            catString += categories[i]
            if (i < categories.length - 1) { // not the last one
                catString += ", "
            }
        }
        return catString
    }

    getDateString = (date) => {
        let dateComponents = date.split("/")
        let month = dateComponents[0]
        let year = dateComponents[1]
        return monthWords[month] + " " + year
    }

    render() {
        let data = this.props.data
        let categoriesString = this.getCategoriesString(data.categories)
        let dateString = this.getDateString(data.date)

        return(
            <div className={this.props.className || "Project-Component"}>
                <h2>{data.name}</h2>
                <div className="Date-And-Categories-Row">
                    <h4 className="Date">{dateString}</h4>
                    <h4 className="Categories">{categoriesString}</h4>
                </div>
                <h4>{data.description}</h4>
                <Carousel
                    className="Media-Carousel"
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    responsive={{
                        desktop: {
                            breakpoint: { max: 3000, min: 1024 },
                            items: 1,
                            slidesToSlide: 1, // optional, default to 1.
                        },
                        tablet: {
                            breakpoint: { max: 1024, min: 464 },
                            items: 1,
                            slidesToSlide: 1, // optional, default to 1.
                        },
                        mobile: {
                            breakpoint: { max: 464, min: 0 },
                            items: 1,
                            slidesToSlide: 1, // optional, default to 1.
                        },
                    }}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={false}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {data.media.map((mediaData, index) => {
                        return(
                            <MediaComponent key={index} data={mediaData} />
                        )
                    })}
                </Carousel>
            </div>
        )
    }
}