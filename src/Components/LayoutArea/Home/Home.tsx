import "./Home.css";
import dreamVac from "../../../Assets/Images/dreamVac2.jpg"

function Home(): JSX.Element {
    return (
        <div className="Home">
			<span className="DescHeadline">Awesome &nbsp;&nbsp;&nbsp; vacations!</span>
            <div className="DescriptionSite">
            <div>Pack your bags{<br />} We’re going on vacation!</div>
            <div>Join millions of happy customers that have attended their favorite events, thanks to vacations.com!</div>
            </div>
        </div>
    );
}

export default Home;
