import './WishList.css'

const Wishlist = ({ setHidden }) => {
    return (
        <div className={setHidden ? 'wishlist' : 'none'}>
            <p>Wishlist</p>
        </div>
    )
}

export default Wishlist