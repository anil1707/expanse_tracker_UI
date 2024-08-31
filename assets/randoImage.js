const images = 
    {
        1:require("../assets/img1.jpeg"),
        2:require("../assets/img2.jpeg"),
        3:require("../assets/img3.png"),
        4:require("../assets/img4.jpeg"),
        5:require("../assets/img5.jpeg"),
        6:require("../assets/img6.jpeg"),
        7:require("../assets/img7.jpeg"),
    }


const img = require("../assets/img1.jpeg")

const randomImage = () =>{
    let min = 1;
    let max = 7;
    let random = Math.floor(Math.random()*(max-min + 1)+min)
    return images[random]
}

export default randomImage