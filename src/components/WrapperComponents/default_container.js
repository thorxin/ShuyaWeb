import React from "react";

//components
import NavigationMobile from "../CommonComponent/Navigation/NavigationMobile";
import NavigationWeb from "../CommonComponent/Navigation/NavigationWeb";
import FooterWeb from "../CommonComponent/Footer/web_footer";
import FooterMobile from "../CommonComponent/Footer/mobile_footer";

export default function DefaultContainer({ children }) {
  return (
    <section>
      <NavigationMobile />
      <NavigationWeb />
      <div className="bg-gray-200 w-full h-auto min-h-screen">
        <div className="container mx-auto md:pt-4 md:pb-4">{children}</div>
      </div>
      <FooterWeb />
      <FooterMobile />
    </section>
  );
}
