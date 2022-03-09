import { message } from "antd"
import { useState, useEffect, useCallback } from "react"

export default function useFetchBeers() {
    const [beers, setBeers] = useState([])
    const [refetch, setRefetch] = useState(false)

    const fetchBeers = useCallback(
        function fetchBeers() {
            const url = "api/v1/beers/index"
            return fetch(url)
            .then((data) => {
                if (data.ok) {
                    return data.json()
                }
                throw new Error("Network Error")
            })
            .then((json) => {
                return json.map(
                        ({id, brand, style, country, quantity}) => ({
                            key: id,
                            id,
                            brand,
                            style,
                            country,
                            quantity
                        })
                    )
            }).catch(error => message.error("Error: " + error))
            .finally(function() {
                setRefetch(false)
            })
        }, []
    )

    useEffect(() => {
        fetchBeers()
            .then(beers => setBeers(beers))
    }, [])

    useEffect(() => {
        if (refetch) {
            fetchBeers()
            .then(beers => setBeers(beers))
            .finally(function() {
                setRefetch(false)
            })
        }
    }, [refetch])

    return { 
        beers, 
        refetch() {
            setRefetch(true) 
        } 
    }
}