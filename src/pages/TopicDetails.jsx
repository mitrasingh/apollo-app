import { useParams } from "react-router-dom"

export const TopicDetails = () => {

    const { id } = useParams()

    return (
        <div>Topic: {id}</div>
    )
}

// NEED TO ADD LOADER FUNCTION

