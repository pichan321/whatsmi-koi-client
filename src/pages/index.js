import Image from 'next/image'
import { Inter } from 'next/font/google'
import NavBar from '@/components/navbar/navbar'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL } from '../../variables';
import { Button, ButtonGroup } from '@chakra-ui/react'
import Feed from '@/components/feed/feed';
// const inter = Inter({ subsets: ['latin'] })
import { motion } from "framer-motion"
import Feedback from '@/components/feed/feedback';

export default function Home() {
  const [image, setImage] = useState(null);
  const [feed, setFeed] = useState([])
  const [metadata, setMetadata] = useState(null);

  const uploadImage = async () => {
    try {

      var response = await axios.postForm(API_URL + "/upload", {
        file: image
      })

      
      setMetadata(response.data);
      fetchFeed()
    } catch {
      
    } 
    // var response = await axios.get();
  }

  const fetchFeed = async () => {
    try {
      var response = await axios.get(API_URL + "/feed")
      setFeed(response.data)
    } catch {

    }
  }


  useEffect(() => {
    fetchFeed()
  }, [])

  return (
    // < className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
    // </main>  
    <div className='p-5 background' style={{minHeight: "100vh"}}>
        <NavBar/>
      
        <div className='p-10 space-y-5'>
          <input type="file" id="img" name="img" accept="image/jpg, image/jpeg, image/png" onChange={(e) => setImage(e.target.files[0])}/>
          <Button colorScheme='teal' className=' bg-blue-500 rounded-lg p-5' onClick={() => uploadImage()}>Classify</Button>
        </div>

        <div className='flex flex-row'>
          <div>
          {
            image && <motion.div
                initial={{opacity: "0%"}}
                animate={{opacity: "100%"}}
                transition={{ ease: "easeInOut", duration: 1 }}
        
            >

            <div className='grid grid-cols-12'>
              <div className='col-span-6'><Image src={URL.createObjectURL(image)} alt="my-koi" width={300} height={300} className='rounded-2xl shadow-lg'/></div>
              <div className='col-span-6'>
              {
                metadata &&
                <div>
                 <h3>Upload ID: {metadata.id}</h3>
                 <h3>Handle: {metadata.handle}</h3>
                 <h3>KOI ID: {metadata.koi_id}</h3>
                 <h3>KOI Name: {metadata.koi_name}</h3>
                 <div className='p-5'>
                  <Feedback handle={metadata ? metadata.handle : ""} fetchFeed={fetchFeed}/>
                 </div>
        
                </div>
              }
              </div>
            </div>
             
          
            </motion.div>
          }
    
          </div>
 
        </div>


          <Feed data={feed}/>
        
    </div>


  )
}
