import Image from "next/image";
import { Inter } from "next/font/google";
import NavBar from "@/components/navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../variables";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Feed from "@/components/feed/feed";
import { motion } from "framer-motion";
import Feedback from "@/components/feed/feedback";
import useFetch from "@/hooks/useFetch";
import ClassifyLoading from "@/components/ClassifyLoading.js";

export default function Home() {
  const [image, setImage] = useState(null);
  const [feed, setFeed] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const { loading, fetcher } = useFetch();

  const uploadImage = async () => {
    try {
      var response = await fetcher.POSTFORM(API_URL + "/upload", {
        file: image,
      });
      if (!response) {
        return;
      }

      setMetadata(response);
      fetchFeed();
    } catch {}
    // var response = await axios.get();
  };

  const fetchFeed = async () => {
    try {
      var response = await fetcher.GET(API_URL + "/feed");
      if (!response) {return;}

      setFeed(response);
    } catch {}
  };

  useEffect(() => {
    fetchFeed();
  }, []);

   // < className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
    // </main>
  return (<>
  
    <h2 className="bg-red-400 p-2 text-center qs">Whatsmi KOI has not been trained to detect any other images than KOI fish yet. Please refrain from using other images.</h2>
    <div className="p-10 background" style={{ minHeight: "100vh" }}>
      <NavBar />

      <div className="p-5 flex items-center justify-center ">
        <input
          type="file"
          id="img"
          name="img"
          accept="image/jpg, image/jpeg, image/png"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <Button
          colorScheme="teal"
          className=" bg-blue-500 rounded-lg p-5"
          onClick={() => uploadImage()}
          isLoading={loading}
        >
          Classify
        </Button>
      </div>

      {image && (
        <motion.div
          className="grid grid-cols-12 pt-10 pb-10"
          initial={{ opacity: "0%" }}
          animate={{ opacity: "100%" }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          <div className="col-span-6 lg:col-span-2">
            <Image
              src={URL.createObjectURL(image)}
              alt="my-koi"
              width={0}
              height={0}
              className="rounded-2xl shadow-lg w-full h-fit"
              style={{objectFit: "cover"}}
            />
          </div>
          <div className="col-span-6 lg:col-span-10 text-center">
              <div className="flex justify-center items-center">
              {loading && <ClassifyLoading />}
                    {!loading && metadata && (
                      <div>
                        <h3>Upload ID: {metadata.id}</h3>
                        <h3>Handle: {metadata.handle}</h3>
                        <h3>KOI ID: {metadata.koi_id}</h3>
                        <h3>KOI Name: {metadata.koi_name}</h3>
                        <div className="p-5">
                          <Feedback
                            handle={metadata ? metadata.handle : ""}
                            fetchFeed={fetchFeed}
                          />
                        </div>
                      </div>
                    )}
              </div>
            

          </div>
        </motion.div>
      )}



      <Feed data={feed} />
    </div>
    </>
  );
}
