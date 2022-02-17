import React,{useState} from 'react'

// images
import LeftArrowImage from "../../assets/productSearch/left_arrow_image.png";
import UpArrow from "../../assets/common/up_arrow.svg"
import DownArrow from "../../assets/common/down_arrow.svg"

//components
import NavigationWeb from "../CommonComponent/Navigation/NavigationWeb";
import FooterWeb from "../CommonComponent/Footer/web_footer";
import FooterMobile from "../CommonComponent/Footer/mobile_footer";
import Loading from "../CommonComponent/Loading/main_loading";

const Index = ({isLoading,Information,goBack}) => {

    const htmlDecode = (input) => {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

    const [shownInfos, setShownInfos] = useState({});

    const toggleTitle = id => {
    setShownInfos(prevShownInfos => ({
      ...prevShownInfos,
      [id]: !prevShownInfos[id]
    }));
    };


    if(isLoading) return <Loading/>

    return (
        <>
            <div className="bg-white w-full h-auto min-h-screen md:space-y-5">
               <div className="shadow-sm sticky top-0 z-20"><NavigationWeb/></div>
                <div className=" mx-auto space-y-5">
                    <div className="w-full md:w-10/12 2xl:w-10/12 h-auto mx-auto">
                                <div className="flex justify-between items-center default-margin-layout lg:mx-40 mt-4" onClick={goBack}>
                                        <img className="object-scale-down float-left h-4 w-5 cursor-pointer" src={LeftArrowImage} alt="Display"/>
                                </div>
                                <div className="lg:mx-40 mx-6 mt-4">
                             { Information.map(info => (
                                <div key={info.id} >
                                    <div className="flex justify-between items-center" onClick={() => toggleTitle(info.id)}>
                                                <p className="sub-heading-font color-default font-semibold my-2" >{info.title}</p>
                                                <img className="object-scale-down float-right h-5 w-4 cursor-pointer" src={shownInfos[info.id] ? DownArrow : UpArrow} alt="Display"/>
                                    </div>
                                {!shownInfos[info.id] &&
                                             <div className="mt-2 secondary-font text-color-default text-justify" dangerouslySetInnerHTML={{ __html: htmlDecode(info.description) }} />
                                }
                                </div>
                            ))}
                                </div>
                    </div>
                </div>
            </div> 
            <FooterWeb />
            <FooterMobile />
        </>                 
    )
}

export default Index