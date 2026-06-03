import { NavigationDots, SocialMedia } from "../components";

const AppWrap = (Component, sectionName, ClassNames) =>
  function HOC() {
    return (
      <div id={sectionName} className={`app__container ${ClassNames}`}>
        <SocialMedia />

        <div className="app__wrapper app__flex">
          <Component />
          <div className="copyright">
            <p className="p-text">@2026 OLEKSIY</p>
            <p className="p-text">All rights reserved</p>
          </div>
        </div>
        <NavigationDots active={sectionName} />
      </div>
    );
  };

export default AppWrap;
