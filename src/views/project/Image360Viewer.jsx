// // import React from 'react'

// // function SphereViewer() {
// //     return (
// //         <>
// //             <a-scene>
// //                 <a-assets>
// //                     <img id="sky" src="https://media.istockphoto.com/id/2161928480/photo/lahaina-pioneer-mill-lahainaluna-rd-burn-zone-360-degree-june-2024.jpg?s=2048x2048&w=is&k=20&c=D5c5AA-5pqtK3HwbDibJ-pxomWhXGcmhE8t3oSY3d8Y=" />
// //                 </a-assets>
// //                 <a-sky src="#sky"></a-sky>
// //             </a-scene>
// //         </>
// //     )
// // }

// // export default SphereViewer

// import { Button } from '@mui/material';
// import React, { useState } from 'react';

// function SphereViewer() {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
//     // List of image URLs
//     const images = [
//         "https://media.istockphoto.com/id/2161928480/photo/lahaina-pioneer-mill-lahainaluna-rd-burn-zone-360-degree-june-2024.jpg?s=2048x2048&w=is&k=20&c=D5c5AA-5pqtK3HwbDibJ-pxomWhXGcmhE8t3oSY3d8Y=",
//         "https://plus.unsplash.com/premium_photo-1670992114006-7f981b6a5fe6?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "https://images.unsplash.com/photo-1562635325-fb52b4fff54f?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//     ];
    
//     // Handle image change
//     const handleNextImage = () => {
//         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     };

//     return (
//         <>
//             <a-scene>
//                 <a-assets>
//                     {images.map((url, index) => (
//                         <img key={index} id={`sky-${index}`} src={url} />
//                     ))}
//                 </a-assets>
//                 <a-sky src={`#sky-${currentImageIndex}`} />
//                 <Button onClick={()=>handleNextImage()}>NEXT</Button>
//                 <a-entity 
//                     geometry="primitive: plane; height: 1; width: 1"
//                     material="color: white"
//                     position="0 1.5 -3"
//                     text={`value: Next Image; align: center; width: 4`}
//                     events={{ click: handleNextImage }}
//                 />
//             </a-scene>
//         </>
//     );
// }

// export default SphereViewer;


import React, { useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './style.css'

// const images = [
//     "https://media.istockphoto.com/id/2161928480/photo/lahaina-pioneer-mill-lahainaluna-rd-burn-zone-360-degree-june-2024.jpg?s=2048x2048&w=is&k=20&c=D5c5AA-5pqtK3HwbDibJ-pxomWhXGcmhE8t3oSY3d8Y=",
//     "https://images.unsplash.com/photo-1645895581819-224a62ee03c3?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     "https://images.unsplash.com/photo-1594445924873-df62e22c48ba?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// ];

function SphereViewer({images}) {
  console.log('images', images)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    console.log('currentImageIndex', currentImageIndex)

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <>
        <div className="main-box">
        <div className="view-img-box">
            <a-scene className="a-box">
                <a-assets>
                    {images.map((src, index) => (
                        <img key={`sky-${index}`} id={`sky-${index}`} src={`http://localhost:7005/${src}`} />
                    ))}
                </a-assets>
                <a-sky src={`#sky-${currentImageIndex}`} rotation="0 0 0"></a-sky>
            </a-scene>
            <div className="buttonContainer">
                <button className="btn" onClick={handlePrev}><KeyboardArrowLeftIcon/></button>
                <button className="btn" onClick={handleNext}><KeyboardArrowRightIcon/></button>
            </div>

        </div>

        </div>
        </>
    );
}

// const styles = {
//     buttonContainer: {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         display: 'flex',
//         justifyContent: 'space-between',
//         width: '100%',
//         zIndex: 1,
//     },
//     button: {
//             fontSize: '16px',
//             cursor: 'pointer',
//             backgroundColor: 'rgb(225 225 225 / 50%)',
//             color: 'rgb(255, 255, 255)',
//             border: 'none',
//             borderRadius: '100%',
//             margin:' 0px 10px',
//             width: '45px',
//             height: '45px',

//     }
// };

export default SphereViewer;
