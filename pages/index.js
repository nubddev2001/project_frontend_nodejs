import Head from 'next/head'
import Link from 'next/link' 
import axios from 'axios'
import {useState,useEffect} from 'react'

const Home = ({setting}) => {

  const [appdescription,setAppdescription] = useState();

  useEffect(() => {
    setting.filter(s => {
      s.text == "appdescription" ? setAppdescription(s.value) : null
    })
  },[])

  return (
    <>
      <Head>
        <title>ตรวจอุณหภูมิ - โปรเจ็กต์ ปวส 1/1 ทด</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div id="header" className="text-center">
          <div id="desctiption" style={{ position: "relative",top: "35%" }} className="container">
            <h1 className="text-center" style={{color: 'white'}}><i className="fa fa-thermometer-half"></i> โปรแกรมตรวจอุณหภูมิ</h1>
            <h5 className="text-center mt-1" style={{color: 'white',lineHeight: '35px'}}>
              {appdescription}
            </h5>
            <Link href="/check">
              <button className="btn btn-outline-info"><i className="fa fa-hand-pointer-o"></i> เริ่มใช้งาน</button>
            </Link>
          </div>
        </div>
      <div className="container mb-5">
        <div className="menu mt-5">
          <h3 className="text-muted mb-4"><i className="fa fa-book"></i> เกร็ดความรู้</h3>
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="card border-0">
                  <img src="https://s3-ap-southeast-1.amazonaws.com/thaipbs-coronavirus/coronavirus/wp-content/uploads/2020/06/22190557/01-1024x512.png" className="card-img-top" alt="..." />
                  <div className="card-body pb-0">
                    <h5 className="card-title">วิธีใช้งานโปรแกรมตรวจอุณหภูมิ</h5>
                  </div>
                  <div className="card-footer p-0">
                    <Link href="/">
                      <button style={{ background: '#FCA631',color: '#fff' }} className="btn rounded-0 btn-block"><i className="fa fa-hand-pointer-o"></i> เพิ่มเพิ่ม</button>
                    </Link>
                  </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0">
                  <img src="https://s3-ap-southeast-1.amazonaws.com/thaipbs-coronavirus/coronavirus/wp-content/uploads/2020/06/10173613/c78-1024x538.png" className="card-img-top" alt="..." />
                  <div className="card-body pb-0">
                    <h5 className="card-title">โปรแกรมตรวจอุณหภูมิ</h5>
                  </div>
                  <div className="card-footer p-0">
                    <Link href="/check">
                      <button style={{ background: '#FCA631',color: '#fff' }} className="btn rounded-0 btn-block"><i className="fa fa-hand-pointer-o"></i> ใช้งาน</button>
                    </Link>
                  </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0">
                  <img src="https://s3-ap-southeast-1.amazonaws.com/thaipbs-coronavirus/coronavirus/wp-content/uploads/2020/06/10173613/c78-1024x538.png" className="card-img-top" alt="..." />
                  <div className="card-body pb-0">
                    <h5 className="card-title">โปรแกรมตรวจอุณหภูมิ</h5>
                  </div>
                  <div className="card-footer p-0">
                    <Link href="/check">
                      <button style={{ background: '#FCA631',color: '#fff' }} className="btn rounded-0 btn-block"><i className="fa fa-hand-pointer-o"></i> ใช้งาน</button>
                    </Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          #header {
            width: 100%;
            height: 500px;
            background-repeat: no-repeat;
            background-size: cover;
            background: url("https://i.pinimg.com/originals/29/3a/62/293a6294ff35f6d8bf14f7b53789406e.jpg")
          }
          `}</style>
      </div>
    </>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch('https://nubdev-backend-nodejs.herokuapp.com/setting')
  const data = await res.json();

  return { setting: data }
}

export default Home