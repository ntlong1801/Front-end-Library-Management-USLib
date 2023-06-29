import { useContext } from 'react';

import { globalContext } from '@/storage/GlobalStateProvider'

function useGlobalContext () {
    const [state, setState] = useContext(globalContext)
    return [state, setState]
}

export default useGlobalContext;