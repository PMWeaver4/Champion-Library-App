export default function OtherTile({other}){
    return (
        <div className="other-tile">
            <img src={other.img}/>
            <h1 className="other-title">{other.itemName}</h1>
        </div>
    );
}