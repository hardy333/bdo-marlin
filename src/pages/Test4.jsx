import React, { useRef } from 'react'
import { useAutoScroll } from 'react-tiny-autoscroll';

const Test4 = () => {
    const containerRef = useRef();

    useAutoScroll({
    containerRef,
    });

    
    
  return (
    <div>
        <div  ref={containerRef} className="test-container ">
            <h1>Loremsssssssssssssssssdksjdksdlkjlkjdsdksjlkdjlipsumsssssssssssssssssdksjdksdlkjlkjdsdksjlkdjldolorsssssssssssssssssdksjdksdlkjlkjdsdksjlkdjlsitsssssssssssssssssdksjdksdlkjlkjdsdksjlkdjlametjsjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <h1>Lorem ipsum dolor sit amet.</h1>
        </div>
    </div>
  )
}

export default Test4