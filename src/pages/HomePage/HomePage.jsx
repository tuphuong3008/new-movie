import React, { useContext } from 'react'
import Header from '../../layout/Header/Header'
import Banner from '../../layout/Banner/Banner'
import ListMovie from '../../layout/ListMovie/ListMovie'
import LichChieuCumRap from '../../layout/LichChieuCumRap/LichChieuCumRap'
import { NotifyContext } from '../../template/UserTemplate/UserTemPlate'
import Footer from '../../layout/Footer'

const HomePage = () => {
    // const notify = useContext(NotifyContext)
    return (
        <div>
            {/* header  */}
            <Header />
            {/* <button onClick={() => { notify("tui test thôi") }}>Bấm thử nè</button> */}
            {/* banner  */}
            <Banner />
            {/* list movie  */}
            <div className="container w-3/4 py-10">
                <ListMovie />
                {/* Lich chieu cum rap */}
                <LichChieuCumRap />
            </div>

            {/* footer  */}
            <Footer/>
        </div>
    )
}

export default HomePage