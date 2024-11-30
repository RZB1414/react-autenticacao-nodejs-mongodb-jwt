import './WishList.css'

const Wishlist = ({ setHidden }) => {
    return (
        <div className={setHidden ? 'wishlist' : 'none'}>
            <h1 className='wishlist-title'>Wishlist</h1>
        </div>
    )
}

export default Wishlist