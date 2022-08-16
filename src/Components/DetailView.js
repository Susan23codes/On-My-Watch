import SingleCard from "./SingleCard";


export default function DetailView(props) {
    const {isLoggedIn, token, navigate, SingleCard, cardObject, key, id} = props


    return (
        <SingleCard/>
    )
}