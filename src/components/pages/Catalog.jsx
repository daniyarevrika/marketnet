import styles from './Catalog.module.scss'
import Cart from '../Slider/Cart'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allCatigory, SizeFilter, sortRangePrice, sortUp } from '../../redux/slice/sortslice'
import MultiRangeSlider from '../multiRangeSlider/multiRangeSlider'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const Catalog = ({ CartInfo, sizeItems }) => {

   // const [pricerange, setPriceRange] = React.useState([])
   const dispath = useDispatch();
   const sorted = useSelector((state) => state.sortslice.filterarray)
   const catigory = ['Все', 'Популярности', 'Рейтингу', 'Цене', 'Скидке', 'Обновлению']
   console.log(sorted.length)
   const [activeSize, setactiveSize] = React.useState(false)
   const [cheked, setUnchecked] = React.useState(false)
   React.useEffect(() => {
      window.scroll(0, 0)
      setactivecatigory(0)
   }, [])



   const clickSortArray = () => {
      dispath(sortRangePrice(sorted))
      dispath(SizeFilter(sizearray))
      setUnchecked(false)

   }
   const [activecatigory, setactivecatigory] = React.useState()
   const onclickActive = (i) => {
      setactivecatigory(i)
      if (i === 3) {
         dispath(sortUp(sorted))
      }
      if (i === 0) {
         dispath(allCatigory(sorted))
         console.log(sorted)
      }
      console.log(activecatigory)
   }
   const sizearray = [false,false]
   const tempChecked = []
   const checked = (e, i) => {
      if (e.target.checked) {
         sizearray.push(i)

      } else {
         sizearray.splice(sizearray.indexOf(i), 1)

      }

      setUnchecked(true)
   }


   let priceArray = CartInfo.map(i => i.newprice)

   return (
      <div className={styles.container}>
         <div className={styles.href}></div>
         <div className={styles.titleName}>Блузки и рубашки для женщин </div>
         <div className={styles.filters}>
            <div className={styles.sort}>Сортировка по:</div>
            <div className={styles.filterTitle}>
               {catigory.map((item, i) => (
                  <button disabled={activecatigory === i} id={i} onClick={() => onclickActive(i)} className={activecatigory === i ? styles.active : styles.button}>{item}</button>
               ))}
            </div>
         </div>
         <div className={styles.main}>
            <div className={styles.flexelem}>
               <div className={styles.params}>
                  <div className={styles.price}>
                     <span>Цена, б.р</span>
                     <MultiRangeSlider
                        min={0}
                        max={Math.max.apply(null, priceArray)}
                        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                        activecatigory={activecatigory}
                     />
                  </div>
                  <div>
                     <div onClick={() => setactiveSize(!activeSize)} className={styles.size}>
                        <span>Размер</span>
                        <KeyboardArrowDownIcon />
                     </div>
                     <div className={activeSize ? styles.activesize : styles.none}>
                        {sizeItems.map((i) => {
                           return <div>
                              <input type="checkbox" checked={cheked} id={i.item} onChange={(e) => checked(e, i.item)} />
                              <label htmlFor="">{i.size}</label>
                           </div>
                        })}
                     </div>
                  </div>
                  <div className={styles.color}>Цвета</div>
                  <button className={styles.search} onClick={() => clickSortArray()} >Поиск</button>
                  <button className={styles.up}></button>
               </div>
            </div>
            <div className={styles.titles}>
               {sorted.length === 0 ? CartInfo.map((obj) => (

                  <Cart
                     count={obj.count}
                     // product={product}
                     newprice={obj.newprice}
                     oldprice={obj.oldprice}
                     name={obj.name}
                     button={obj.button}
                     id={obj.id}
                     // setProduct={setProduct}
                     CartInfo={CartInfo}
                     url={obj.url}
                  />


               )) : sorted.map((obj) => (

                  <Cart
                     count={obj.count}
                     // product={product}
                     newprice={obj.newprice}
                     oldprice={obj.oldprice}
                     name={obj.name}
                     button={obj.button}
                     id={obj.id}
                     // setProduct={setProduct}

                     url={obj.url}
                  />


               ))}
            </div>
         </div>
      </div>
   )
}
export default Catalog
// sorted.map((obj) => (

//    <Cart
//       count={obj.count}
//       // product={product}
//       newprice={obj.newprice}
//       oldprice={obj.oldprice}
//       name={obj.name}
//       button={obj.button}
//       id={obj.id}
//       // setProduct={setProduct}
//       CartInfo={CartInfo}
//       url={obj.url}
//    />


// ))