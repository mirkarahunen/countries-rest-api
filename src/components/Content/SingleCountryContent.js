/*import React, { useState } from 'react'

import './_single-country-content.scss'
import InfiniteScroll from 'react-infinite-scroll-component';

const SingleCountryContent = (props) => {
    const [hasMore, setHasMore] = useState(true)
    //const [items, setItems] = useState([])
    

    useEffect(() => {
        setItems(props.items.slice(0,8))
    }, [props.items])
   

    const fetchMoreData = () => {
        if (props.items.length > 250) setHasMore(false)

        //console.log(items.length, ...items + props.items.slice(0,8));
        //setItems(...items, props.items.slice(0,8))
        
        //setItems(items.concat(props.items))
        
    }



    return (
        
            <InfiniteScroll
                dataLength={props.items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                
            </InfiniteScroll>
        
    )

}

export default SingleCountryContent;
*/