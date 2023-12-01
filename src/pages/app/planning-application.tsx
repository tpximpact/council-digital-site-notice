import Image from "next/image";
import { LocalIcon } from "../../../public/assets/icons";
import { urlFor } from "../../../util/client";
import { ContextApplication } from "@/context";
import { useContext } from "react";
import { useRouter } from "next/router";


const PlanningApplications = ({ data }: any) => {
  const router = useRouter();
  const { setDataApplication} = useContext(ContextApplication);

  function sendData({data}: any){
    const {_id} = data
      router.push(`/${_id}`)
      setDataApplication(data)
  }

  return (
    <section className="wrap-planning-application">
      {data && data.map((data: any) => {
        const {_id, image, name, address} = data
        return (
          <div
          onClick={() => sendData({data}
          )}
            key={_id}
            className="planning-application-link"
          >
            {image && (
              <Image width={330} height={223} alt="" src={urlFor(image).url()} />
            )}
            <div>
              <h3>{name}</h3>
              <span className="planning-application-text">
                <p>
                  <LocalIcon />
                  1 mile {address}
                </p>
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default PlanningApplications;
