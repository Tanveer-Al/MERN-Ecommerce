import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCartProduct from '../components/HorizontalCartProduct'
import VertitalCartProduct from '../components/VertitalCartProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCartProduct category={"airpodes"} heading={"Top's-Airpodes"}/>
      <HorizontalCartProduct category={"watches"} heading={"Popular's Watches"}/>
      <VertitalCartProduct category={"mobiles"} heading={"Mobiles"}/>
      <VertitalCartProduct category={"mouse"} heading={"Mouse"}/>
      <VertitalCartProduct category={"televisions"} heading={"Televisions"}/>
      <VertitalCartProduct category={"camera"} heading={"Camera"}/>
      <VertitalCartProduct category={"earphones"} heading={"Earephones"}/>
      <VertitalCartProduct category={"speakers"} heading={"Blotooth Speakers"}/>
      <VertitalCartProduct category={"processor"} heading={"Processor"}/>
      <VertitalCartProduct category={"trimmers"} heading={"Trimmers"}/>
      <VertitalCartProduct category={"printers"} heading={"Printers"}/>
      <VertitalCartProduct category={"refrigerator"} heading={"Refrigerators"}/>
    </div>
  )
}

export default Home