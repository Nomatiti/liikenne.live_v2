import { useState, useEffect } from 'react';

export default function MakeAPICall(props) {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch(props.url)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    props.function(result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true)
                    console.log(error)
                }
            )
    }, [])

    return null
}
