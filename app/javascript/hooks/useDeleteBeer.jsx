import { message } from "antd"
import React from "react"

export default function useDeleteBeer() {
    return function(id) {
        const url = `api/v1/beers/${id}`

        return fetch(url, {method: "delete"})
        .then((data) => {
            if (data.ok) {
                return data.json()
            }
            throw new Error("Network Error.")
        })
        .catch(error => message.error("Error: " + error))
    }
}