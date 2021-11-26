import { useState, useEffect } from "react";

const useLocalStorage = (key, val = null) => {
    const initialVal = localStorage.getItem(key) || val;
    
    const [item, setItem] = useState(initialVal);

    useEffect(() => {
        item == null 
            ? localStorage.removeItem(key) 
            : localStorage.setItem(key, item); 
    }, [key, item]);

    return [item, setItem]
}

export default useLocalStorage;