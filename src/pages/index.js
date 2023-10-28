import Image from 'next/image'
import { Inter } from 'next/font/google'
import NavBar from '@/components/navbar/navbar'
import { useState } from 'react'
import axios from 'axios';
import { API_URL } from '../../variables';
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [image, setImage] = useState(null);
  
  const uploadImage = async () => {
    try {

      var response = await axios.postForm(API_URL + "/upload", {
        file: image
      })

      console.log(response)
    } catch {
      
    } 
    // var response = await axios.get();
  }

  return (
    // < className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
    // </main>  
    <div className='p-5'>
        <NavBar/>

        <div className='p-10'>
          <input type="file" id="img" name="img" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>

          {
            image && <Image src={URL.createObjectURL(image)} alt="my-koi" width={300} height={300} className='rounded-lg'/>
          }

          <button className='bg-blue-500 rounded-lg p-5' onClick={() => uploadImage()}>Identify</button>
        </div>
        
    </div>
  )
}
