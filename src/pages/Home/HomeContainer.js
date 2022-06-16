import React from "react";
import HomeView from "./HomeView";
import { NavLinks } from "./components/NavLinks";

export function HomeContainer() {
  return (
    <div>
      <NavLinks />
      <HomeView title="Home" />
    </div>
  );
}
