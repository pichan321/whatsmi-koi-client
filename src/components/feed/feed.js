import { API_URL } from "../../../variables";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Feed({ data }) {
  return (
    <div className="p-12">
      <div className="grid grid-cols-12 gap-7">
        {data && Array.isArray(data) &&
          data?.map((each) => {
            const src = `${API_URL}\\${each.image}`;
            return (
              <motion.div 
                initial={{opacity: "0%"}}
                animate={{opacity: "100%"}}
                transition={{ ease: "easeInOut", duration: 1.50 }}
              className="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2 rounded-2xl h-full max-h-48">
                <Image
                  loader={() => src}
                  src={src}
                  width={500}
                  height={500}
                  className="w-full h-full object-fill rounded-md shadow-lg"
                  style={{ objectFit: "fill" }}
                />
                
              <h3>ID: {each.id}</h3>
              <h3>Caption: {each.caption}</h3>
              <h3>Koi Variant: {each.koi_variant}</h3>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}
