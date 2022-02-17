import React from "react";

//components
import NavigationWeb from "../CommonComponent/Navigation/NavigationWeb";
import FooterWeb from "../CommonComponent/Footer/web_footer";

export default function DefaultContainer({ children }) {
  return (
    <section>
      <NavigationWeb />
      <div className="bg-gray-300 w-full h-auto min-h-screen">
        <div className="container mx-auto md:pt-4">
          {children}
        </div>
        {/* <FooterWeb /> */}
      </div>
    </section>
  );
}
