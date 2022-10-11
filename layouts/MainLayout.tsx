import React from "react";
import Navbar from "./../components/Navbar";
import { Container } from "@mui/material";
import Player from "../components/Player";
import Head from "next/head"; // Necessary for SEO

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout = ( { children, title, description, keywords} ) => {
  return (
    <div>
      <Head>
        <title>{ title || "Nature sounds" }</title>
        <meta name="description" content={`Nature sounds - free tracks. ${description}`} />
        <meta name="robots" content={`index, follow`} />
        <meta name="keywords" content={keywords || `nature, sound`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Container>
        { children }
      </Container>
      <Player />
    </div>
  );
}

export default MainLayout;