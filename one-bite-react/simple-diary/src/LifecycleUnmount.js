import React, { useEffect, useState } from 'react';

const UnmountTest = () => {
    
    useEffect(() => {
        console.log("Mount");
        return () => { // 콜백 함수가 함수를 리턴하면 unmount
            // unmount시점에 실행 
            console.log("Unmount");
        }
    },[])
    return <div> Unmount Testing Component </div>
}

const LifecycleUnmount = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => setIsVisible(!isVisible);
    
   
     return (
         <div style={{ padding: 20 }}>
             <button onClick={toggle}>ON/OFF</button>
             {isVisible && <UnmountTest />}
             {/* isVisible이 true면 뒤에 것도 실행하기 때문에.. */}
         </div>
    )   
    
}

export default LifecycleUnmount;
