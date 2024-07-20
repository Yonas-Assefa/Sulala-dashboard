"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

function WebsiteUsageAgreement() {
  const [showConcentForm, setShowConcentForm] = React.useState(false);
  const [userClicked, setUserClicked] = React.useState(false);

  React.useEffect(() => {
    setShowConcentForm(localStorage.getItem("SULALA_Cns") !== "RECIEVED");
  }, []);

  const handleClick = () => {
    setUserClicked(true);
    setTimeout(() => {
      localStorage.setItem("SULALA_Cns", "RECIEVED");
      setShowConcentForm(false);
    }, 500);
  };

  if (!showConcentForm) return null;

  return (
    <div className="fixed bottom-0 w-full h-full flex flex-col z-50">
      <div className="flex-grow backdrop-blur-md"></div>
      <AnimatePresence>
        {!userClicked && (
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200 }}
            className="bg-tertiary p-6 shadow-2xl shadow-gray-700 flex flex-col gap-3"
          >
            <h3 className="text-black font-semibold">Cookie and Location</h3>
            <div>
              <p className="text-secondary text-sm">
                This website uses cookies and your location to offer you a
                better browsing experience.
              </p>
              <p className="text-secondary text-sm">
                Please confirm you agreement on this by clicking on confirm
                button
              </p>
            </div>
            <div>
              <button
                onClick={handleClick}
                className="border-2 border-primary text-black px-5 py-1 hover:text-white hover:bg-primary transition-all"
              >
                Accept and Continue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WebsiteUsageAgreement;
