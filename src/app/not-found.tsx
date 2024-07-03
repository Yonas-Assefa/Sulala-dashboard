import React from "react";

function NotFoundPage() {
  return (
    <html>
      <body>
        <div
          className="w-screen h-screen flex flex-row"
          style={{
            height: "98vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f6f6f6",
          }}
        >
          <div className="bg-white flex-grow">
            <div className="w-full h-full flex justify-between flex-col items-center">
              <div
                className="flex flex-col justify-center items-center w-full h-full"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <h1
                  className="text-2xl md:text-4xl font-semibold text-primary"
                  style={{ color: "#176635" }}
                >
                  404 - Page Not Found
                </h1>
                <div className="flex flex-row justify-between gap-5">
                  <a
                    href={"/dashboard/settings"}
                    className="text-primary font-semibold hover:underline"
                  >
                    Redirect to dashboard?
                  </a>
                </div>
                <img
                  src="/sulala-logo.svg"
                  className="w-[100px] opacity-15 absolute"
                  style={{
                    width: "100px",
                    opacity: ".15",
                    position: "absolute",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export default NotFoundPage;
