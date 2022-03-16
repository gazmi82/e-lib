import { useEffect } from 'react'

const useOutsideClickChecker = (ref:any, setState:any) => {
    useEffect(() => {
        function handleClickOutside(e:any) {
            if (ref.current && !ref.current.contains(e.target)) {
               setState(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default useOutsideClickChecker;