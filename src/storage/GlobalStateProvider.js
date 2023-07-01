import { createContext, useState } from 'react'


export const globalContext = createContext()

function GlobalStyleProvider ({ children }) {
    const [state, setState] = useState({
        isLogin: false,
        id: '',
        type: 'student'
    })

    return (<globalContext.Provider value={[state, setState]}>
        {children}
    </globalContext.Provider>);
}

export default GlobalStyleProvider;
