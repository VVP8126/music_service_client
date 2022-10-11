import React from "react";
import MainLayout from "./../layouts/MainLayout";

const Index = () => {
  return (
    <>
      <style jsx>
        {`
            .center {
                margin-top:5px;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
            }
        `}
      </style>
      <MainLayout description={""} title={""} keywords={""} >
        <div className="center">       
          <h1>NATURE SOUNDS</h1>
          <h3>Welcome to our simplest free service !</h3>
        </div>
      </MainLayout>
    </>
  );
}

export default Index;
