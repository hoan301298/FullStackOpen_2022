import {useEffect, useState} from 'react'
import axios from 'axios'
export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    useEffect(() => {
        axios.get(baseUrl).then(response => {
            setResources(response.data)
        })
    }, [baseUrl])

    const create = async (request) => {
      const response = await axios.post(baseUrl, request)
      setResources(resources.concat(response.data))
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
}